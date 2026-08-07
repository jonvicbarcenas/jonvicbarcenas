import { Files, Monitor, Settings, Terminal } from "lucide-react";

type DesktopContextMenuProps = {
  x: number;
  y: number;
  openTerminal: () => void;
  close: () => void;
  showQuickSettings: () => void;
  notify: (message: string) => void;
};

export function DesktopContextMenu({ x, y, openTerminal, close, showQuickSettings, notify }: DesktopContextMenuProps) {
  return (
    <div className="desktop-context-menu" role="menu" style={{ left: Math.min(x, window.innerWidth - 240), top: Math.min(y - 32, window.innerHeight - 250) }}>
      <button role="menuitem" type="button" onClick={openTerminal}><Terminal /> Open in Terminal</button>
      <button role="menuitem" type="button" onClick={() => { close(); notify("Desktop is already organized"); }}><Files /> New Folder</button>
      <span />
      <button role="menuitem" type="button" onClick={() => { close(); notify("Wallpaper: Aurora Blue"); }}><Monitor /> Change Background…</button>
      <button role="menuitem" type="button" onClick={() => { close(); showQuickSettings(); }}><Settings /> Display Settings</button>
    </div>
  );
}
