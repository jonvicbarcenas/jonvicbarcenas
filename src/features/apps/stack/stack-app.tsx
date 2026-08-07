import { Code2, Search, X } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { StackSection } from "./stack.types";

type StackAppProps = {
  query: string;
  setQuery: (value: string) => void;
  sections: StackSection[];
};

export function StackApp({ query, setQuery, sections }: StackAppProps) {
  return (
    <div className="stack-app">
      <div className="app-toolbar stack-toolbar">
        <div><strong>Development</strong><span>Installed tools &amp; capabilities</span></div>
        <label className="toolbar-search">
          <Search aria-hidden="true" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search technologies" aria-label="Search technologies" />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear technology search"><X /></button> : null}
        </label>
      </div>

      <div className="stack-scroll app-scroll">
        <section className="stack-banner">
          <div>
            <span className="eyebrow">DEVELOPER WORKSTATION</span>
            <h1>Tools I build with</h1>
            <p>A practical toolkit spanning interfaces, APIs, mobile, data, testing, deployment, and AI-assisted workflows.</p>
          </div>
          <div className="stack-orbit" aria-hidden="true"><Code2 /><span /><span /><span /></div>
        </section>

        {sections.length ? sections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <section className="stack-section" key={section.title}>
              <h2><SectionIcon />{section.title}<span>{section.items.length}</span></h2>
              <div className="stack-grid">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.name} className="stack-card">
                      <div className={`stack-icon ${item.tone}`}><Icon /></div>
                      <div className="stack-card-title"><h3>{item.name}</h3><span>{item.level}</span></div>
                      <p>{item.description}</p>
                      <div className="skill-meter"><span className={item.tone} /></div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        }) : <EmptyState title="No technologies found" body="Try React, Java, Kotlin, Python, API, database, or AI." onReset={() => setQuery("")} />}
      </div>
    </div>
  );
}
