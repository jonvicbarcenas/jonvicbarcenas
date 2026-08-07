"use client";

import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { WindowId } from "@/features/desktop/desktop.types";
import { runTerminalCommand } from "./terminal-commands";

type TerminalLine = { type: "input" | "output"; text: string };

const INITIAL_HISTORY: TerminalLine[] = [
  { type: "output", text: "Jonvic Linux 6.11.8-portfolio (tty1)" },
  { type: "output", text: "Type 'help' to explore this portfolio." },
  { type: "output", text: "" },
];

export function TerminalApp({ openWindow }: { openWindow: (id: WindowId) => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const screen = screenRef.current;
    if (screen) screen.scrollTo({ top: screen.scrollHeight, behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const execute = () => {
    const command = input.trim();
    if (!command) return;

    const result = runTerminalCommand(command);
    if (result.clear) {
      setHistory([]);
      setInput("");
      return;
    }
    if (result.openWindow) openWindow(result.openWindow);
    setHistory((current) => [
      ...current,
      { type: "input", text: `jonvic@portfolio:~$ ${command}` },
      { type: "output", text: result.output || "" },
    ]);
    setInput("");
  };

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-tabs">
        <button className="is-active" type="button"><Terminal />jonvic@portfolio: ~</button>
        <button type="button" aria-label="New terminal tab">+</button>
      </div>
      <div ref={screenRef} className="terminal-screen">
        {history.map((line, index) => <pre key={`${line.type}-${index}`} className={line.type}>{line.text}</pre>)}
        <form onSubmit={(event) => { event.preventDefault(); execute(); }}>
          <span><b>jonvic</b>@portfolio:<i>~</i>$</span>
          <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command" />
        </form>
      </div>
    </div>
  );
}
