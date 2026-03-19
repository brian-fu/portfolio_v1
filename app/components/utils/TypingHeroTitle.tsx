"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Software Engineer",
  "Computer Science @ Waterloo",
  "Sports Enthusiast",
];

const TYPE_SPEED_MS = 50;
const DELETE_SPEED_MS = 70;
const HOLD_AT_FULL_MS = 1400;
const HOLD_BEFORE_NEXT_MS = 300;

export default function TypingHeroTitle() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    const atFullPhrase = typedText === currentPhrase;
    const atEmpty = typedText.length === 0;

    const delay = !isDeleting && atFullPhrase
      ? HOLD_AT_FULL_MS
      : isDeleting && atEmpty
      ? HOLD_BEFORE_NEXT_MS
      : isDeleting
      ? DELETE_SPEED_MS
      : TYPE_SPEED_MS;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (atFullPhrase) {
          setIsDeleting(true);
          return;
        }
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
        return;
      }

      if (atEmpty) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        return;
      }

      setTypedText(currentPhrase.slice(0, typedText.length - 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phraseIndex, typedText, isDeleting]);

  return (
    <p className="hero-title" aria-live="polite">
      <span className="typing-text">{typedText}</span>
      <span className="typing-cursor" aria-hidden="true">
        |
      </span>
    </p>
  );
}
