import { Search, X } from "lucide-react";
import type { RefObject } from "react";
import type { AppSearchResult, DesktopWindow, WindowId } from "../desktop.types";

type ActivitiesOverviewProps = {
  query: string;
  setQuery: (value: string) => void;
  results: AppSearchResult[];
  windows: DesktopWindow[];
  searchRef: RefObject<HTMLInputElement | null>;
  openWindow: (id: WindowId) => void;
  launchResult: (result: AppSearchResult) => void;
  notify: (message: string) => void;
};

export function ActivitiesOverview({
  query,
  setQuery,
  results,
  windows,
  searchRef,
  openWindow,
  launchResult,
  notify,
}: ActivitiesOverviewProps) {
  return (
    <section className="activities-overview" aria-label="Activities overview">
      <div className="overview-inner">
        <label className="overview-search">
          <Search aria-hidden="true" />
          <input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type to search apps, projects, and skills" aria-label="Search applications and portfolio" />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X /></button> : <kbd>Alt F2</kbd>}
        </label>

        {!query ? (
          <div className="overview-workspaces">
            <div className="workspace-preview is-current">
              <div className="preview-wallpaper">
                {windows.filter((item) => item.isOpen && !item.isMinimized).slice(0, 3).map((item, index) => (
                  <button key={item.id} type="button" className={`window-preview preview-${index + 1}`} onClick={() => openWindow(item.id)}>
                    <span><item.icon /> {item.title}</span>
                  </button>
                ))}
              </div>
              <span>Workspace 1</span>
            </div>
            <button className="workspace-add" type="button" onClick={() => notify("A clean workspace is ready")} aria-label="Add workspace"><span>+</span></button>
          </div>
        ) : null}

        <div className="application-results" aria-live="polite">
          {results.length ? results.map((result, index) => {
            const Icon = result.icon;
            return (
              <button key={`${result.label}-${index}`} type="button" onClick={() => launchResult(result)}>
                <span className={`app-icon app-icon-large ${result.className}`}><Icon aria-hidden="true" /></span>
                <strong>{result.label}</strong>
                <span>{result.detail}</span>
              </button>
            );
          }) : (
            <div className="no-results"><Search /><h2>No results</h2><p>Try another app, project, or technology.</p></div>
          )}
        </div>
      </div>
    </section>
  );
}
