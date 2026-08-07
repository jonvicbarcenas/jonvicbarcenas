import { Bluetooth, ChevronRight, Lock, Monitor, Moon, Palette, Power, Settings, Volume2, Wifi } from "lucide-react";

type QuickSettingsPanelProps = {
  wifiOn: boolean; setWifiOn: (value: boolean) => void;
  bluetoothOn: boolean; setBluetoothOn: (value: boolean) => void;
  nightLight: boolean; setNightLight: (value: boolean) => void;
  darkMode: boolean; setDarkMode: (value: boolean) => void;
  brightness: number; setBrightness: (value: number) => void;
  volume: number; setVolume: (value: number) => void;
  notify: (message: string) => void;
};

export function QuickSettingsPanel(props: QuickSettingsPanelProps) {
  return (
    <aside className="panel-popover quick-popover" aria-label="Quick settings">
      <div className="quick-sliders">
        <label><Monitor /><input type="range" min="0" max="100" value={props.brightness} onChange={(event) => props.setBrightness(Number(event.target.value))} aria-label="Screen brightness" /><span>{props.brightness}%</span></label>
        <label><Volume2 /><input type="range" min="0" max="100" value={props.volume} onChange={(event) => props.setVolume(Number(event.target.value))} aria-label="Volume" /><span>{props.volume}%</span></label>
      </div>
      <div className="quick-grid">
        <button className={props.wifiOn ? "is-on" : ""} type="button" onClick={() => props.setWifiOn(!props.wifiOn)}><span><Wifi /></span><div><strong>Wi-Fi</strong><small>{props.wifiOn ? "Portfolio Network" : "Off"}</small></div><ChevronRight /></button>
        <button className={props.bluetoothOn ? "is-on" : ""} type="button" onClick={() => props.setBluetoothOn(!props.bluetoothOn)}><span><Bluetooth /></span><div><strong>Bluetooth</strong><small>{props.bluetoothOn ? "On" : "Off"}</small></div></button>
        <button className={props.nightLight ? "is-on" : ""} type="button" onClick={() => props.setNightLight(!props.nightLight)}><span><Moon /></span><div><strong>Night Light</strong><small>{props.nightLight ? "On" : "Off"}</small></div></button>
        <button className={props.darkMode ? "is-on" : ""} type="button" onClick={() => props.setDarkMode(!props.darkMode)}><span><Palette /></span><div><strong>Dark Style</strong><small>{props.darkMode ? "On" : "Off"}</small></div></button>
      </div>
      <div className="power-row"><button type="button" onClick={() => props.notify("Settings are available from the desktop")} aria-label="Settings"><Settings /></button><button type="button" onClick={() => props.notify("Session locked for 1 second")} aria-label="Lock"><Lock /></button><button type="button" onClick={() => props.notify("Power controls are disabled in this portfolio")} aria-label="Power"><Power /></button></div>
    </aside>
  );
}
