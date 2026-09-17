import NameToggle from "@/app/components/NameToggle";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "@/app/components/Icons";
import { experience, projects, school, social } from "@/data/site";

function Hang() {
  return (
    <span className="hang" aria-hidden="true">
      &gt;
    </span>
  );
}

export default function HomePage() {
  const glyphs = (
    <div className="glyphs fade f5">
      <a className="glyph" href={social.email} aria-label="Email">
        <MailIcon />
      </a>
      <a
        className="glyph"
        href={social.linkedin}
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </a>
      <a
        className="glyph"
        href={social.github}
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </a>
      <a
        className="glyph"
        href={social.x}
        aria-label="X"
        target="_blank"
        rel="noopener noreferrer"
      >
        <XIcon />
      </a>
    </div>
  );

  return (
    <main className="col col-home">
      <NameToggle footer={glyphs}>
        <div className="grp fade f2">
          <div className="ln lbl">currently</div>
          <div className="ln line">
            <Hang />
            cs at <img className="mk logo" src={school.logo} alt="" />
            <a href={school.href} target="_blank" rel="noopener noreferrer">
              {school.label}
            </a>
          </div>
        </div>
        <div className="grp fade f3">
          <div className="ln lbl">previously</div>
          {experience.map((job) => (
            <div key={job.org.label} className="ln line">
              <Hang />
              {job.role} {job.joiner}&nbsp;
              <img className="mk logo" src={job.logo} alt="" />
              <a href={job.org.href} target="_blank" rel="noopener noreferrer">
                {job.org.label}
              </a>
            </div>
          ))}
        </div>
        <div className="grp fade f4">
          <div className="ln lbl">built</div>
          {projects.map((p) => (
            <div key={p.name} className="ln line">
              <Hang />
              <span className="mk" aria-hidden="true">
                {p.mark}
              </span>
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>{" "}
              — {p.summary}
            </div>
          ))}
        </div>
      </NameToggle>
    </main>
  );
}
