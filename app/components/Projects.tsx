import content from "@/data/portfolio-content.json";

const { projects } = content;

export default function Projects() {
  return (
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
  );
}
