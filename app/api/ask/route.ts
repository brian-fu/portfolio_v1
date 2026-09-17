import fs from "node:fs";
import path from "node:path";
import { ApiError, GoogleGenAI, ThinkingLevel } from "@google/genai";

const MODEL = "gemini-3.5-flash-lite";
const MAX_MESSAGE_CHARS = 500;
const MAX_TURNS = 10;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const REQUEST_TIMEOUT_MS = 12_000;

type ChatMessage = { from: "you" | "bot"; text: string };

// The prompt lives in data/prompt.md so it can be edited without touching code.
const PROMPT_PATH = path.join(process.cwd(), "data", "prompt.md");
let cachedPrompt: string | null = null;

// Re-read every request in dev so prompt edits land without a restart; in
// production the file can't change under a running server, so read it once.
function systemPrompt(): string {
  if (process.env.NODE_ENV === "development") return fs.readFileSync(PROMPT_PATH, "utf8");
  cachedPrompt ??= fs.readFileSync(PROMPT_PATH, "utf8");
  return cachedPrompt;
}

// Best-effort limiter: each serverless instance keeps its own counts.
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const valid = messages.every(
    (m) =>
      m &&
      (m.from === "you" || m.from === "bot") &&
      typeof m.text === "string" &&
      m.text.trim().length > 0 &&
      m.text.length <= MAX_MESSAGE_CHARS,
  );
  if (!valid || messages[messages.length - 1].from !== "you") return null;
  const recent = messages.slice(-MAX_TURNS);
  // Conversations must start with a visitor turn.
  while (recent[0].from === "bot") recent.shift();
  return recent;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate limited" }, { status: 429 });
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) {
    return Response.json({ error: "invalid request" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return Response.json({ error: "server error" }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const ask = async () => {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: messages.map((m) => ({
          role: m.from === "you" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
        config: {
          systemInstruction: systemPrompt(),
          // LOW is the floor this model allows; it still thinks sometimes.
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          // Room for thinking tokens, which count toward this cap; reply length is set by the prompt.
          maxOutputTokens: 1200,
          temperature: 0.4,
          httpOptions: { timeout: REQUEST_TIMEOUT_MS },
        },
      });
      const reply = response.text?.trim();
      if (!reply) {
        throw new Error(`empty response (finishReason: ${response.candidates?.[0]?.finishReason})`);
      }
      return reply;
    };

    let reply: string;
    try {
      reply = await ask();
    } catch (err) {
      // Transient failures (5xx, timeouts, MALFORMED_RESPONSE) usually clear on one retry.
      if (err instanceof ApiError && err.status < 500) throw err;
      console.warn("gemini request failed, retrying", err);
      reply = await ask();
    }
    return Response.json({ reply });
  } catch (err) {
    console.error("gemini request failed", err);
    if (err instanceof ApiError && err.status === 429) {
      return Response.json({ error: "rate limited" }, { status: 429 });
    }
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
