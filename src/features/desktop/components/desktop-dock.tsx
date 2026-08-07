import { Grid3X3 } from "lucide-react";
import { APP_META } from "../desktop.data";
import type { DesktopWindow, WindowId } from "../desktop.types";

type DesktopDockProps = {
  windows: DesktopWindow[];
  focusedId?: WindowId;
  overviewOpen: boolean;
  onToggleApp: (id: WindowId) => void;
  onShowApplications: () => void;
};

export function DesktopDock({ windows, focusedId, overviewOpen, onToggleApp, onShowApplications }: DesktopDockProps) {
  return (
    <nav className="desktop-dash" aria-label="Favorite applications">
      {APP_META.map((app) => {
        const Icon = app.icon;
        const target = windows.find((item) => item.id === app.id);
        return (
          <button key={app.id} type="button" className={focusedId === app.id ? "is-focused" : ""} onClick={() => onToggleApp(app.id)} aria-label={`${target?.isOpen ? "Switch to" : "Open"} ${app.title}`}>
            <span className={`app-icon ${app.className}`}><Icon aria-hidden="true" /></span>
            {target?.isOpen ? <span className="running-dot" /> : null}
            <span className="dock-tooltip">{app.title}</span>
          </button>
        );
      })}
      <span className="dash-separator" />
      <button type="button" className={overviewOpen ? "is-focused" : ""} onClick={onShowApplications} aria-label="Show applications">
        <span className="app-icon app-grid"><Grid3X3 aria-hidden="true" /></span>
        <span className="dock-tooltip">Show Applications</span>
      </button>
    </nav>
  );
}
