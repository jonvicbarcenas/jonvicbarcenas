import {
  ChevronRight,
  Coffee,
  ExternalLink,
  FileDown,
  FolderCode,
  GitBranch,
  Home,
  ListFilter,
  Menu,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PROJECTS } from "./projects.data";
import { ProjectCard } from "./project-card";
import type { Project } from "./projects.types";

type ProjectsAppProps = {
  query: string;
  setQuery: (value: string) => void;
  items: Project[];
};

export function ProjectsApp({ query, setQuery, items }: ProjectsAppProps) {
  return (
    <div className="files-layout">
      <aside className="app-sidebar files-sidebar">
        <nav aria-label="Project locations">
          <p>Places</p>
          <button className="is-selected" type="button" onClick={() => setQuery("")}><FolderCode />Projects <span>{PROJECTS.length}</span></button>
          <a href="https://github.com/jonvicbarcenas" target="_blank" rel="noreferrer"><GitBranch />GitHub <ExternalLink /></a>
          <a href="/Jon_Vic_Barcenas_CV.pdf" download><FileDown />Curriculum vitae</a>
          <p>Technology</p>
          <button type="button" onClick={() => setQuery("React")}><FolderCode />React</button>
          <button type="button" onClick={() => setQuery("Java")}><Coffee />Java</button>
          <button type="button" onClick={() => setQuery("Django")}><Terminal />Python</button>
        </nav>
      </aside>

      <div className="files-main">
        <div className="app-toolbar">
          <div className="breadcrumb">
            <button type="button" onClick={() => setQuery("")} aria-label="All projects"><Home /></button>
            <ChevronRight /><strong>Projects</strong>
          </div>
          <label className="toolbar-search">
            <Search />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" />
            {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear project search"><X /></button> : null}
          </label>
          <button className="icon-button" type="button" title="Filter projects" aria-label="Filter projects"><ListFilter /></button>
          <button className="icon-button" type="button" title="View options" aria-label="View options"><Menu /></button>
        </div>

        <div className="projects-scroll app-scroll">
          <div className="folder-summary">
            <div>
              <span className="eyebrow">PORTFOLIO / PROJECTS</span>
              <h1>{query ? `Results for “${query}”` : "Selected work"}</h1>
              <p>{items.length} {items.length === 1 ? "project" : "projects"} · sorted by relevance</p>
            </div>
            <span className="folder-art"><FolderCode /></span>
          </div>
          {items.length ? (
            <div className="project-cards">{items.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
          ) : (
            <EmptyState title="No projects found" body="Try a technology such as React, Java, Kotlin, or Django." onReset={() => setQuery("")} />
          )}
        </div>
      </div>
    </div>
  );
}
