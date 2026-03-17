import content from "@/data/portfolio-content.json";

const { skillCategories, experiences, projects } = content;

export default function HomePage() {
  return (
    <>
      <header id="top" style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>{" "}
          <a href="#skills">Skills</a>{" "}
          <a href="#experience">Experience</a>{" "}
          <a href="#projects">Projects</a>{" "}
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" style={{ minHeight: "100vh" }}>
          <h1>Brian Fu</h1>
          <p>Software Engineer</p>
          <ul>
            <li>
              <a href="https://github.com/brian-fu" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/brianfu-/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:b6fu@uwaterloo.ca">b6fu@uwaterloo.ca</a>
            </li>
            <li>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          {skillCategories.map((group) => (
            <article key={group.category}>
              <h3>{group.category}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="experience">
          <h2>Experience</h2>
          {experiences.map((job) => (
            <article key={`${job.company}-${job.role}`}>
              <h3>{job.role}</h3>
              <p>
                <strong>{job.company}</strong> | {job.dates}
              </p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="projects">
          <h2>Projects</h2>
          {projects.map((project) => (
            <article key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>{" "}
                |{" "}
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Demo
                </a>
              </p>
            </article>
          ))}
        </section>
      </main>

      <footer id="contact">
        <h2>Contact</h2>
        <p>
          <a href="mailto:b6fu@uwaterloo.ca">b6fu@uwaterloo.ca</a> |{" "}
          <a href="https://github.com/brian-fu" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/brianfu-/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>

        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} />
          </div>
          <button type="submit">Send</button>
        </form>
      </footer>
    </>
  );
}
