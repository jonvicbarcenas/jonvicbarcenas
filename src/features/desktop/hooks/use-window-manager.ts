"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { APP_META, WINDOW_SEED } from "../desktop.data";
import type { DesktopWindow, WindowId } from "../desktop.types";

export function useWindowManager() {
  const [windows, setWindows] = useState(() => WINDOW_SEED.map((item) => ({ ...item })));
  const zIndexRef = useRef(20);
  const dragRef = useRef<{
    id: WindowId;
    startX: number;
    startY: number;
    x: number;
    y: number;
  } | null>(null);

  const raiseWindow = useCallback((id: WindowId, restore = true) => {
    const nextZ = ++zIndexRef.current;
    setWindows((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              zIndex: nextZ,
              isOpen: true,
              isMinimized: restore ? false : item.isMinimized,
            }
          : item,
      ),
    );
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      raiseWindow(id);
      window.history.replaceState(null, "", `#${id}`);
    },
    [raiseWindow],
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as WindowId;
    if (APP_META.some((app) => app.id === hash)) raiseWindow(hash);
  }, [raiseWindow]);

  const focusedId = useMemo(() => {
    return windows
      .filter((item) => item.isOpen && !item.isMinimized)
      .toSorted((a, b) => b.zIndex - a.zIndex)[0]?.id;
  }, [windows]);

  const toggleDockApp = (id: WindowId) => {
    const target = windows.find((item) => item.id === id);
    if (!target?.isOpen || target.isMinimized || focusedId !== id) {
      openWindow(id);
      return;
    }
    setWindows((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isMinimized: true } : item,
      ),
    );
  };

  const startDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    item: DesktopWindow,
  ) => {
    if (event.button !== 0 || item.isMaximized || window.innerWidth < 760) return;
    raiseWindow(item.id, false);
    dragRef.current = {
      id: item.id,
      startX: event.clientX,
      startY: event.clientY,
      x: item.x,
      y: item.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const nextX = Math.max(
      -280,
      Math.min(window.innerWidth - 110, drag.x + event.clientX - drag.startX),
    );
    const nextY = Math.max(
      8,
      Math.min(window.innerHeight - 100, drag.y + event.clientY - drag.startY),
    );
    setWindows((current) =>
      current.map((item) =>
        item.id === drag.id ? { ...item, x: nextX, y: nextY } : item,
      ),
    );
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  return {
    windows,
    setWindows,
    focusedId,
    raiseWindow,
    openWindow,
    toggleDockApp,
    startDrag,
    moveDrag,
    stopDrag,
  };
}
