"use client";

import { useSyncExternalStore } from "react";

// Theme toggle: flips html.dark, remembers the choice, keeps the button's label in sync.
// The initial class is set before paint by the inline script in layout.tsx.

function readSaved() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  // Follow OS changes only if the visitor hasn't picked a theme themselves.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onOsChange = (e: MediaQueryListEvent) => {
    if (readSaved()) return;
    document.documentElement.classList.toggle("dark", e.matches);
    onChange();
  };
  mq.addEventListener("change", onOsChange);
  window.addEventListener("themechange", onChange);
  return () => {
    mq.removeEventListener("change", onOsChange);
    window.removeEventListener("themechange", onChange);
  };
}

const isDark = () => document.documentElement.classList.contains("dark");

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <button
      className="theme"
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      onClick={toggle}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
