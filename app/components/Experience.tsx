import content from "@/data/portfolio-content.json";

const { experiences } = content;

export default function Experience() {
  return (
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
  );
}
