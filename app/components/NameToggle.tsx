"use client";

import { useState } from "react";

// Home page easter egg: clicking the name reveals a hidden line under the closing group.
export default function NameToggle({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const [shown, setShown] = useState(false);

  return (
    <>
      <div className="name-row fade f1">
        <button
          type="button"
          className="name-btn"
          aria-controls="secret"
          aria-expanded={shown}
          data-ph-capture-attribute-name="name-easter-egg"
          onClick={() => setShown((s) => !s)}
        >
          brian fu
        </button>
      </div>
      {children}
      <div className="grp fade f5">
        <div className="ln line">
          <span className="hang" aria-hidden="true">
            &gt;
          </span>
          otherwise: i&apos;m either on the hockey rink or at the golf course.
        </div>
        <div className="ln line secret" id="secret" hidden={!shown}>
          <span className="hang" aria-hidden="true">
            &gt;
          </span>
          (͡ ͡° ͜ つ ͡͡°)
        </div>
      </div>
      {footer}
    </>
  );
}
