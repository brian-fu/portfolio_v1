import TypingHeroTitle from "@/app/components/utils/TypingHeroTitle";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.8c-2.95.64-3.58-1.25-3.58-1.25-.48-1.22-1.18-1.54-1.18-1.54-.97-.66.07-.65.07-.65 1.07.08 1.63 1.1 1.63 1.1.96 1.63 2.51 1.17 3.12.89.1-.7.38-1.17.68-1.44-2.36-.27-4.85-1.18-4.85-5.23 0-1.15.41-2.1 1.1-2.84-.11-.27-.48-1.36.1-2.83 0 0 .9-.29 2.95 1.09A10.22 10.22 0 0 1 12 6.67c.91 0 1.82.12 2.67.35 2.05-1.38 2.95-1.1 2.95-1.1.58 1.48.21 2.56.1 2.84.68.75 1.1 1.69 1.1 2.84 0 4.06-2.5 4.95-4.88 5.22.39.34.73 1.01.73 2.05v3.03c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.94 8.5a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM5.37 9.76h3.14V19.5H5.37V9.76Zm5.17 0h3v1.33h.04c.42-.79 1.44-1.62 2.96-1.62 3.17 0 3.76 2.08 3.76 4.8v5.23h-3.14v-4.63c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.77 1.2-1.77 2.45v4.71h-3.3V9.76Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.75 6.75h16.5v10.5H3.75V6.75Zm0 0L12 13.5l8.25-6.75"
        fill="none"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.75h7.5L18 8.25v11H7v-14.5Zm7.5 0v3.5H18M9 12h6M9 15h6"
        fill="none"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-name">Brian Fu</h1>
        <TypingHeroTitle />
        <ul className="hero-links" aria-label="Social and contact links">
          <li>
            <a
              className="hero-icon-link"
              href="https://github.com/brian-fu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a
              className="hero-icon-link"
              href="https://www.linkedin.com/in/brianfu-/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a className="hero-icon-link" href="mailto:b6fu@uwaterloo.ca" aria-label="Email">
              <EmailIcon />
            </a>
          </li>
          <li>
            <a
              className="hero-icon-link"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Resume"
            >
              <ResumeIcon />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
