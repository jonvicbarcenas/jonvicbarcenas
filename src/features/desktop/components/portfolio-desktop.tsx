"use client";

import { Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AboutApp } from "@/features/apps/about/about-app";
import { ContactApp } from "@/features/apps/contact/contact-app";
import { ExperienceApp } from "@/features/apps/experience/experience-app";
import { PROJECTS, projectSearchText } from "@/features/apps/projects/projects.data";
import { ProjectsApp } from "@/features/apps/projects/projects-app";
import { STACK_SECTIONS, stackSearchText } from "@/features/apps/stack/stack.data";
import { StackApp } from "@/features/apps/stack/stack-app";
import { TerminalApp } from "@/features/apps/terminal/terminal-app";
import { APP_META } from "../desktop.data";
import type { AppSearchResult, WindowId } from "../desktop.types";
import { useWindowManager } from "../hooks/use-window-manager";
import { ActivitiesOverview } from "./activities-overview";
import { CalendarPanel } from "./calendar-panel";
import { DesktopContextMenu } from "./desktop-context-menu";
import { DesktopDock } from "./desktop-dock";
import { DesktopWindow } from "./desktop-window";
import { QuickSettingsPanel } from "./quick-settings-panel";
import { TopPanel } from "./top-panel";

type SystemPanel = "calendar" | "quick" | null;

export function PortfolioDesktop() {
  const {
    windows,
    setWindows,
    focusedId,
    raiseWindow,
    openWindow,
    toggleDockApp,
    startDrag,
    moveDrag,
    stopDrag,
  } = useWindowManager();
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [panel, setPanel] = useState<SystemPanel>(null);
  const [overviewQuery, setOverviewQuery] = useState("");
  const [projectQuery, setProjectQuery] = useState("");
  const [stackQuery, setStackQuery] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [toast, setToast] = useState("Welcome to Jonvic Linux");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [nightLight, setNightLight] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(78);
  const [volume, setVolume] = useState(62);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    const initialTimer = window.setTimeout(updateClock, 0);
    const timer = window.setInterval(updateClock, 1000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverviewOpen(false);
        setPanel(null);
        setContextMenu(null);
      }
      if (event.key === "F2" && event.altKey) {
        event.preventDefault();
        setOverviewOpen(true);
        setPanel(null);
        window.setTimeout(() => searchRef.current?.focus(), 50);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openApp = (id: WindowId) => {
    openWindow(id);
    setOverviewOpen(false);
    setPanel(null);
    setContextMenu(null);
  };

  const showOverview = () => {
    setOverviewOpen(true);
    setPanel(null);
    setContextMenu(null);
    window.setTimeout(() => searchRef.current?.focus(), 80);
  };

  const visibleProjects = useMemo(() => {
    const query = projectQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => !query || projectSearchText(project).includes(query));
  }, [projectQuery]);

  const visibleStack = useMemo(() => {
    const query = stackQuery.trim().toLowerCase();
    return STACK_SECTIONS
      .map((section) => ({ ...section, items: section.items.filter((item) => !query || stackSearchText(item).includes(query)) }))
      .filter((section) => section.items.length);
  }, [stackQuery]);

  const overviewResults = useMemo<AppSearchResult[]>(() => {
    const query = overviewQuery.trim().toLowerCase();
    if (!query) {
      return APP_META.map((app) => ({ id: app.id, label: app.title, detail: app.subtitle, icon: app.icon, className: app.className }));
    }
    const apps = APP_META
      .filter((app) => `${app.title} ${app.subtitle}`.toLowerCase().includes(query))
      .map((app) => ({ id: app.id, label: app.title, detail: app.subtitle, icon: app.icon, className: app.className }));
    const projectMatches = PROJECTS
      .filter((project) => projectSearchText(project).includes(query))
      .slice(0, 4)
      .map((project) => ({ id: "projects" as const, label: project.title, detail: "Project", icon: project.icon, className: "app-files" }));
    const stackMatches = STACK_SECTIONS.flatMap((section) => section.items)
      .filter((item) => stackSearchText(item).includes(query))
      .slice(0, 4)
      .map((item) => ({ id: "stack" as const, label: item.name, detail: "Technology", icon: item.icon, className: "app-stack" }));
    return [...apps, ...projectMatches, ...stackMatches];
  }, [overviewQuery]);

  const launchResult = (result: AppSearchResult) => {
    if (result.detail === "Project") setProjectQuery(result.label);
    if (result.detail === "Technology") setStackQuery(result.label);
    openApp(result.id);
    setOverviewQuery("");
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "Portfolio inquiry");
    const body = `${String(data.get("message") || "")}\n\nFrom: ${String(data.get("name") || "")}\nEmail: ${String(data.get("email") || "")}`;
    window.location.href = `mailto:jonvicbarcenas1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus("Opening your mail application…");
  };

  const copyFingerprint = async () => {
    const fingerprint = "JVB-REACT-TS-JAVA-KOTLIN-AI";
    try {
      await navigator.clipboard.writeText(fingerprint);
      setToast("Portfolio fingerprint copied");
    } catch {
      setToast(fingerprint);
    }
  };

  const renderApp = (id: WindowId) => {
    switch (id) {
      case "about":
        return <AboutApp openWindow={openApp} formStatus={formStatus} onContactSubmit={handleContactSubmit} onCopyFingerprint={copyFingerprint} />;
      case "projects":
        return <ProjectsApp query={projectQuery} setQuery={setProjectQuery} items={visibleProjects} />;
      case "stack":
        return <StackApp query={stackQuery} setQuery={setStackQuery} sections={visibleStack} />;
      case "contact":
        return <ContactApp status={formStatus} onSubmit={handleContactSubmit} onCopy={copyFingerprint} />;
      case "terminal":
        return <TerminalApp openWindow={openApp} />;
      case "experience":
        return <ExperienceApp />;
    }
  };

  const timeLabel = now
    ? new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(now)
    : "—";

  return (
    <main className={`linux-shell ${darkMode ? "theme-dark" : "theme-light"} ${nightLight ? "night-light" : ""}`}>
      <a className="skip-link" href="#desktop-workspace">Skip to desktop</a>
      <TopPanel
        timeLabel={timeLabel}
        overviewOpen={overviewOpen}
        activePanel={panel}
        onToggleOverview={() => { setOverviewOpen((value) => !value); setPanel(null); setContextMenu(null); window.setTimeout(() => searchRef.current?.focus(), 80); }}
        onToggleCalendar={() => { setPanel(panel === "calendar" ? null : "calendar"); setOverviewOpen(false); }}
        onToggleQuickSettings={() => { setPanel(panel === "quick" ? null : "quick"); setOverviewOpen(false); }}
      />

      <section
        id="desktop-workspace"
        className="desktop-workspace"
        aria-label="Desktop workspace"
        onContextMenu={(event) => { event.preventDefault(); setContextMenu({ x: event.clientX, y: event.clientY }); setPanel(null); }}
        onPointerDown={(event) => { if (event.target === event.currentTarget) { setContextMenu(null); setPanel(null); } }}
      >
        <div className="wallpaper-noise" aria-hidden="true" />
        <div className="wallpaper-mark" aria-hidden="true"><span>J</span></div>
        <div className="desktop-shortcuts" aria-label="Desktop shortcuts">
          {APP_META.filter((app) => ["about", "projects", "stack", "contact"].includes(app.id)).map((app) => {
            const Icon = app.icon;
            return (
              <button key={app.id} className="desktop-shortcut" type="button" onClick={() => openApp(app.id)}>
                <span className={`app-icon ${app.className}`}><Icon aria-hidden="true" /></span>
                <span>{app.title}</span>
              </button>
            );
          })}
        </div>

        {windows.map((item) => !item.isOpen || item.isMinimized ? null : (
          <DesktopWindow key={item.id} item={item} focused={focusedId === item.id} setWindows={setWindows} raiseWindow={raiseWindow} startDrag={startDrag} moveDrag={moveDrag} stopDrag={stopDrag}>
            {renderApp(item.id)}
          </DesktopWindow>
        ))}

        <DesktopDock windows={windows} focusedId={focusedId} overviewOpen={overviewOpen} onToggleApp={(id) => { toggleDockApp(id); setOverviewOpen(false); setPanel(null); setContextMenu(null); }} onShowApplications={showOverview} />

        {contextMenu ? <DesktopContextMenu x={contextMenu.x} y={contextMenu.y} openTerminal={() => openApp("terminal")} close={() => setContextMenu(null)} showQuickSettings={() => setPanel("quick")} notify={setToast} /> : null}
      </section>

      {overviewOpen ? <ActivitiesOverview query={overviewQuery} setQuery={setOverviewQuery} results={overviewResults} windows={windows} searchRef={searchRef} openWindow={openApp} launchResult={launchResult} notify={setToast} /> : null}
      {panel === "calendar" && now ? <CalendarPanel now={now} onClose={() => setPanel(null)} /> : null}
      {panel === "quick" ? <QuickSettingsPanel wifiOn={wifiOn} setWifiOn={setWifiOn} bluetoothOn={bluetoothOn} setBluetoothOn={setBluetoothOn} nightLight={nightLight} setNightLight={setNightLight} darkMode={darkMode} setDarkMode={setDarkMode} brightness={brightness} setBrightness={setBrightness} volume={volume} setVolume={setVolume} notify={setToast} /> : null}
      {toast ? <div className="system-toast" role="status"><Check />{toast}</div> : null}
    </main>
  );
}
