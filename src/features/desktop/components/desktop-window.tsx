import { Maximize2, Minus, Square, X } from "lucide-react";
import type { Dispatch, PointerEvent as ReactPointerEvent, ReactNode, SetStateAction } from "react";
import type { DesktopWindow as DesktopWindowModel, WindowId } from "../desktop.types";

type DesktopWindowProps = {
  item: DesktopWindowModel;
  focused: boolean;
  children: ReactNode;
  setWindows: Dispatch<SetStateAction<DesktopWindowModel[]>>;
  raiseWindow: (id: WindowId, restore?: boolean) => void;
  startDrag: (event: ReactPointerEvent<HTMLDivElement>, item: DesktopWindowModel) => void;
  moveDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  stopDrag: () => void;
};

export function DesktopWindow({
  item,
  focused,
  children,
  setWindows,
  raiseWindow,
  startDrag,
  moveDrag,
  stopDrag,
}: DesktopWindowProps) {
  const Icon = item.icon;
  const updateWindow = (changes: Partial<DesktopWindowModel>) => {
    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.id === item.id ? { ...windowItem, ...changes } : windowItem,
      ),
    );
  };

  return (
    <article
      className={`desktop-window ${focused ? "is-focused" : ""} ${item.isMaximized ? "is-maximized" : ""}`}
      style={
        item.isMaximized
          ? { zIndex: item.zIndex }
          : {
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
              zIndex: item.zIndex,
            }
      }
      onPointerDown={() => raiseWindow(item.id, false)}
      aria-label={`${item.title} application window`}
    >
      <div
        className="window-header"
        onPointerDown={(event) => startDrag(event, item)}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onDoubleClick={() => updateWindow({ isMaximized: !item.isMaximized })}
      >
        <div className="window-header-start">
          <span className={`mini-app-icon ${item.className}`}><Icon aria-hidden="true" /></span>
        </div>
        <div className="window-heading">
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </div>
        <div className="window-controls" onPointerDown={(event) => event.stopPropagation()}>
          <button type="button" onClick={() => updateWindow({ isMinimized: true })} aria-label={`Minimize ${item.title}`} title="Minimize"><Minus /></button>
          <button type="button" onClick={() => updateWindow({ isMaximized: !item.isMaximized })} aria-label={`${item.isMaximized ? "Restore" : "Maximize"} ${item.title}`} title={item.isMaximized ? "Restore" : "Maximize"}>{item.isMaximized ? <Square /> : <Maximize2 />}</button>
          <button className="close-window" type="button" onClick={() => updateWindow({ isOpen: false })} aria-label={`Close ${item.title}`} title="Close"><X /></button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </article>
  );
}
