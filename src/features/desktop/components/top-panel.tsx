import { BatteryMedium, ChevronRight, Volume2, Wifi } from "lucide-react";

type TopPanelProps = {
  timeLabel: string;
  overviewOpen: boolean;
  activePanel: "calendar" | "quick" | null;
  onToggleOverview: () => void;
  onToggleCalendar: () => void;
  onToggleQuickSettings: () => void;
};

export function TopPanel({
  timeLabel,
  overviewOpen,
  activePanel,
  onToggleOverview,
  onToggleCalendar,
  onToggleQuickSettings,
}: TopPanelProps) {
  return (
    <header className="shell-panel" aria-label="System panel">
      <button
        className={`activities-button ${overviewOpen ? "is-active" : ""}`}
        type="button"
        onClick={onToggleOverview}
        aria-expanded={overviewOpen}
      >
        Activities
      </button>
      <button
        className="clock-button"
        type="button"
        onClick={onToggleCalendar}
        aria-expanded={activePanel === "calendar"}
      >
        {timeLabel}
      </button>
      <button
        className="system-cluster"
        type="button"
        onClick={onToggleQuickSettings}
        aria-label="Open quick settings"
        aria-expanded={activePanel === "quick"}
      >
        <Wifi aria-hidden="true" />
        <Volume2 aria-hidden="true" />
        <BatteryMedium aria-hidden="true" />
        <ChevronRight className="cluster-chevron" aria-hidden="true" />
      </button>
    </header>
  );
}
