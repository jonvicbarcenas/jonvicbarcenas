import { Bell, CalendarDays, X } from "lucide-react";

export function CalendarPanel({ now, onClose }: { now: Date; onClose: () => void }) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];

  return (
    <aside className="panel-popover calendar-popover" aria-label="Calendar and notifications">
      <div className="notification-column">
        <div className="popover-heading"><div><strong>Notifications</strong><span>Today</span></div><button type="button" onClick={onClose} aria-label="Close notifications"><X /></button></div>
        <div className="notification-card"><span className="mini-app-icon app-contact"><Bell /></span><div><strong>Portfolio ready</strong><p>Explore projects, skills, experience, or start a terminal session.</p><small>Just now</small></div></div>
        <button className="clear-notifications" type="button">Clear</button>
      </div>
      <div className="calendar-column">
        <p className="full-date">{new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(now)}</p>
        <div className="month-heading"><strong>{new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(now)}</strong><div><button type="button" aria-label="Previous month">‹</button><button type="button" aria-label="Next month">›</button></div></div>
        <div className="calendar-grid">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <b key={`${day}-${index}`}>{day}</b>)}{cells.map((day, index) => <span key={index} className={day === now.getDate() ? "is-today" : ""}>{day}</span>)}</div>
        <div className="calendar-footer"><CalendarDays /><span>No events today</span></div>
      </div>
    </aside>
  );
}
