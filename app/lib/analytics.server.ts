import { PostHog } from "posthog-node";

// Server-side counterpart to app/lib/analytics.ts. Worth having for the chat
// route specifically: content blockers hide a slice of the browser events, and
// model latency and failures aren't visible from the browser at all.
const key = process.env.POSTHOG_KEY;

const client = key
  ? new PostHog(key, {
      host: "https://us.i.posthog.com",
      // Serverless instances are frozen between requests, so batching would
      // sit on events indefinitely. captureImmediate sends inline instead.
      flushAt: 1,
      flushInterval: 0,
    })
  : null;

export async function captureServer(event: string, properties?: Record<string, unknown>) {
  if (!client) return;
  try {
    await client.captureImmediate({
      // These events are counted, not attributed: there's no person to join
      // them to without shipping the visitor's id through the API.
      distinctId: crypto.randomUUID(),
      event,
      properties: { ...properties, $process_person_profile: false },
    });
  } catch (err) {
    // Analytics must never be the reason a chat reply fails.
    console.warn("posthog capture failed", err);
  }
}
