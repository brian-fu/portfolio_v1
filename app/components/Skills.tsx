import content from "@/data/portfolio-content.json";

const { skillCategories } = content;

export default function Skills() {
  return (
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
  );
}
