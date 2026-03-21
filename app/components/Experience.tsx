import content from "@/data/portfolio-content.json";

const { aboutMe, experiences } = content;

function getCompanyInitials(company: string) {
  return company
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export default function Experience() {
  return (
    <section id="about" className="experience-section">
      <div className="experience-inner">
        <h2 className="experience-heading">About Me</h2>
        <p className="experience-about">{aboutMe}</p>

        <div className="experience-timeline">
          {experiences.map((job) => (
            <article className="experience-item" key={`${job.company}-${job.role}`}>
              <div className="experience-marker" aria-hidden="true">
                {job.logo ? (
                  <img className="experience-logo" src={job.logo} alt="" />
                ) : (
                  <span>{getCompanyInitials(job.company)}</span>
                )}
              </div>

              <div className="experience-content">
                <p className="experience-dates">{job.dates}</p>
                <h3 className="experience-company">{job.company}</h3>
                <p className="experience-role">{job.role}</p>
                <ul className="experience-bullets">
                  {job.bullets.map((bullet, index) => (
                    <li key={`${job.company}-${job.role}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
