import type { Metadata } from "next";
import { projects, social } from "@/data/site";

export const metadata: Metadata = { title: "projects" };

const delays = ["f2", "f3", "f4"];

export default function ProjectsPage() {
  return (
    <main className="col col-projects">
      <div className="grp fade f1">
        <div className="ln line">
          <span className="hang" aria-hidden="true">
            &gt;
          </span>
          ls ~/projects
        </div>
      </div>
      <div className="grp plist">
        {projects.map((p, i) => (
          <div key={p.name} className={`proj grp fade ${delays[i] ?? "f5"}`}>
            <div className="ln">
              <span className="hang" aria-hidden="true">
                ↳
              </span>
              <span className="mk" aria-hidden="true">
                {p.mark}
              </span>
              <a className="ttl" href={p.href} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
              <span className="go" aria-hidden="true">
                →
              </span>
            </div>
            <div className="ln">{p.description}</div>
            <div className="ln tech">{p.tech}</div>
          </div>
        ))}
      </div>
      <div className="grp fade f5">
        <div className="ln line">
          <span className="hang" aria-hidden="true">
            &gt;
          </span>
          see more on my&nbsp;<a href={social.github} target="_blank" rel="noopener noreferrer">github</a>.
        </div>
      </div>
    </main>
  );
}
