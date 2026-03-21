import Image from "next/image";

import content from "@/data/portfolio-content.json";

type Project = {
  name: string;
  description: string;
  github: string;
  image: string;
  technologies?: string[];
  demo?: string;
};

const { projects } = content as { projects: Project[] };

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.75a10.25 10.25 0 0 0-3.24 19.98c.52.1.7-.22.7-.5v-1.88c-2.84.62-3.44-1.2-3.44-1.2-.46-1.16-1.12-1.46-1.12-1.46-.9-.6.06-.59.06-.59 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.34-2.27-.26-4.65-1.13-4.65-5.05 0-1.12.4-2.03 1.04-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.27 2.78 1.05a9.6 9.6 0 0 1 5.06 0c1.93-1.32 2.77-1.05 2.77-1.05.56 1.4.21 2.44.11 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.38 4.78-4.65 5.03.36.32.68.93.68 1.87v2.77c0 .28.18.61.71.5A10.25 10.25 0 0 0 12 1.75Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M13 5h6v6" />
      <path d="M11 13 19 5" />
      <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <h2 className="projects-heading">Projects</h2>
        <p>
          Below are some of my projects, visit my{" "}
          <a href="https://github.com/brian-fu" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          for more!
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-image-shell">
                <Image
                  className="project-image"
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                  unoptimized
                />
              </div>

              <div className="project-card-body">
                <div className="project-title-row">
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-links">
                    <a
                      className="project-icon-link"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} GitHub`}
                    >
                      <GitHubIcon />
                    </a>
                    {project.demo ? (
                      <a
                        className="project-icon-link project-icon-link-demo"
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.name} Demo`}
                      >
                        <ExternalLinkIcon />
                      </a>
                    ) : null}
                  </div>
                </div>

                <p className="project-tech-values">
                  {project.technologies?.length ? project.technologies.join(" | ") : "Not specified"}
                </p>

                <p className="project-description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
