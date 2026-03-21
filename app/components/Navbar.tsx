'use client';

import { useRef } from 'react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const gliderRef = useRef<HTMLSpanElement>(null);
  const hasShown = useRef(false);

  function moveGlider(anchor: HTMLAnchorElement) {
    const nav = navRef.current;
    const glider = gliderRef.current;
    if (!nav || !glider) return;

    const navRect = nav.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();

    const left = anchorRect.left - navRect.left;
    const top = anchorRect.top - navRect.top;
    const width = anchorRect.width;
    const height = anchorRect.height;

    if (!hasShown.current) {
      glider.style.transition = 'opacity 150ms ease';
      glider.style.left = `${left}px`;
      glider.style.top = `${top}px`;
      glider.style.width = `${width}px`;
      glider.style.height = `${height}px`;
      requestAnimationFrame(() => {
        glider.style.transition = '';
        glider.style.opacity = '1';
      });
      hasShown.current = true;
    } else {
      glider.style.left = `${left}px`;
      glider.style.top = `${top}px`;
      glider.style.width = `${width}px`;
      glider.style.height = `${height}px`;
      glider.style.opacity = '1';
    }
  }

  function hideGlider() {
    if (gliderRef.current) {
      gliderRef.current.style.opacity = '0';
    }
    hasShown.current = false;
  }

  return (
    <header id="top" className="site-header">
      <nav
        ref={navRef}
        className="site-nav"
        aria-label="Main navigation"
        onMouseLeave={hideGlider}
      >
        <span ref={gliderRef} className="nav-glider" aria-hidden="true" />
        <a href="#home" onMouseEnter={(e) => moveGlider(e.currentTarget)}>Home</a>
        <a href="#about" onMouseEnter={(e) => moveGlider(e.currentTarget)}>About Me</a>
        <a href="#projects" onMouseEnter={(e) => moveGlider(e.currentTarget)}>Projects</a>
        <a href="#contact" onMouseEnter={(e) => moveGlider(e.currentTarget)}>Contact</a>
        <span className="nav-divider" aria-hidden="true" />
        <a href="/other" onMouseEnter={(e) => moveGlider(e.currentTarget)}>Other</a>
      </nav>
    </header>
  );
}
