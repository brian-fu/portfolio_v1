"use client";

import { useEffect, useRef, useState } from "react";
import { chatExamples } from "@/data/site";

type Message = { id: number; from: "you" | "bot"; text: string };

async function getReply(history: Message[]): Promise<string> {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: history.map(({ from, text }) => ({ from, text })),
    }),
  });
  if (res.status === 429) return "you're asking fast — give me a minute and try again.";
  if (!res.ok) throw new Error(`ask failed: ${res.status}`);
  const data: { reply: string } = await res.json();
  return data.reply;
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  function close() {
    setOpen(false);
    launchRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy]);

  async function submit(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    setBusy(true);
    setInput("");
    const history: Message[] = [
      ...messages,
      { id: nextId.current++, from: "you", text: t },
    ];
    setMessages(history);
    let reply: string;
    try {
      reply = await getReply(history);
    } catch {
      reply = "something went wrong on my end — try email instead.";
    }
    setMessages((m) => [
      ...m,
      { id: nextId.current++, from: "bot", text: reply },
    ]);
    setBusy(false);
  }

  return (
    <>
      <div
        className={open ? "chat open" : "chat"}
        role="dialog"
        aria-label="ask brian"
        aria-hidden={!open}
      >
        <svg className="chat-grain" aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="chat-head">
          <span>~/brian - ask me anything</span>
          <button
            className="chat-x"
            type="button"
            aria-label="Close chat"
            onClick={close}
            tabIndex={open ? 0 : -1}
          >
            esc
          </button>
        </div>
        <div className="chat-log" aria-live="polite" ref={logRef}>
          {messages.length === 0 && (
            <div className="chat-examples">
              <span className="muted">try one:</span>
              {chatExamples.map((ex) => (
                <button
                  key={ex}
                  className="ex"
                  type="button"
                  onClick={() => submit(ex)}
                  tabIndex={open ? 0 : -1}
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
          {messages.map((m) =>
            m.from === "you" ? (
              <div key={m.id} className="msg">
                <span className="pfx">&gt;</span>
                {m.text}
              </div>
            ) : (
              <div key={m.id} className="msg bot">
                <span className="who">brian:</span>
                {m.text}
              </div>
            ),
          )}
          {busy && (
            <div className="msg bot">
              <span className="who">brian:</span>
              <span className="thinking" aria-label="thinking">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
        </div>
        <div className="chat-in">
          <span className="muted" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            aria-label="Ask a question"
            placeholder="type a question"
            autoComplete="off"
            value={input}
            tabIndex={open ? 0 : -1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit(input);
              }
            }}
          />
          <button
            className={input.trim() ? "send on" : "send"}
            type="button"
            aria-label="Send"
            tabIndex={open ? 0 : -1}
            onClick={() => submit(input)}
          >
            ↵
          </button>
        </div>
      </div>
      <svg
        className={open ? "pointer is-open" : "pointer"}
        aria-hidden="true"
        viewBox="0 0 64 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 9 C 22 2, 42 8, 55 27" />
        <path d="M47 25 L55 27.5 L55.5 19" />
      </svg>
      <button
        ref={launchRef}
        className={open ? "launch is-open" : "launch"}
        type="button"
        aria-expanded={open}
        aria-label="Ask Brian a question"
        onClick={() => (open ? close() : setOpen(true))}
      >
        &gt;<span className="caret">_</span>
      </button>
    </>
  );
}
