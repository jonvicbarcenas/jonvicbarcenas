import { BriefcaseBusiness, ExternalLink } from "lucide-react";
import { EXPERIENCE } from "./experience.data";

export function ExperienceApp() {
  return (
    <div className="experience-app app-scroll">
      <header>
        <span className="feature-icon purple">
          <BriefcaseBusiness aria-hidden="true" />
        </span>
        <div>
          <span className="eyebrow">JOURNEY</span>
          <h1>Experience &amp; learning</h1>
          <p>Milestones from foundational study to complete product work.</p>
        </div>
      </header>

      <div className="timeline">
        {EXPERIENCE.map((item, index) => (
          <article key={`${item.year}-${item.title}`}>
            <div className="timeline-year">
              <span>{item.year}</span>
              <i />
            </div>
            <div className="timeline-card">
              <small>Milestone {String(index + 1).padStart(2, "0")}</small>
              <h2>{item.title}</h2>
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              {"certificate" in item ? (
                <a href={item.certificate} target="_blank" rel="noreferrer">
                  View certificate <ExternalLink aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
