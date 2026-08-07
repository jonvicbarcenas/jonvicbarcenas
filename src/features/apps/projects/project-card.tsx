import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "./projects.types";

export function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <article className="project-card">
      <div className="project-media">
        {project.image ? (
          <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 800px) 90vw, 360px" />
        ) : (
          <span><Icon /></span>
        )}
        <span className={`project-status ${project.statusTone}`}><span />{project.status}</span>
      </div>

      <div className="project-card-body">
        <div className="project-heading">
          <span className={`mini-app-icon ${project.statusTone === "production" ? "app-files" : "app-stack"}`}><Icon /></span>
          <div><h2>{project.title}</h2><p>{project.meta}</p></div>
        </div>
        <p>{project.description}</p>
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          {project.liveHref ? <a className="suggested-action small" href={project.liveHref} target="_blank" rel="noreferrer">Live app <ArrowUpRight /></a> : null}
          <a className="standard-action small" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel}<ArrowUpRight /></a>
        </div>
      </div>
    </article>
  );
}
