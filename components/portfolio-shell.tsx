"use client";

import {
  Activity,
  ArrowRight,
  Bot,
  Box,
  Braces,
  Briefcase,
  BriefcaseBusiness,
  Circle,
  Code2,
  Coffee,
  Component,
  Contact,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileDown,
  FolderCode,
  FolderHeart,
  GitBranch,
  GitFork,
  GitPullRequest,
  Home,
  Layers3,
  Library,
  ListFilter,
  Mail,
  MapPin,
  Minus,
  Paintbrush,
  Palette,
  Phone,
  RadioTower,
  ReceiptText,
  Rocket,
  Search,
  Send,
  Server,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Swords,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState, useRef } from "react";
import experienceData from "@/data/experience.json";

type RouteId = "home" | "projects" | "stack" | "contact";

type Project = {
  title: string;
  status: string;
  statusTone: "production" | "active" | "stable" | "archive";
  meta: string;
  description: string;
  tags: string[];
  href: string;
  linkLabel: string;
  icon: LucideIcon;
  search: string;
  liveHref?: string;
  image?: string;
};

type StackItem = {
  name: string;
  level: string;
  tone: "expert" | "proficient" | "advanced";
  description: string;
  icon: LucideIcon;
  search: string;
};

const routes: Array<{ id: RouteId; label: string; icon: LucideIcon }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: SquareTerminal },
  { id: "stack", label: "Stack", icon: Layers3 },
  { id: "contact", label: "Contact", icon: Mail },
];

const projects: Project[] = [
  {
    title: "Streanime / MyroniX",
    status: "Production UI",
    statusTone: "production",
    meta: "React 19 + TypeScript + Tailwind v4 | Firebase | Vidstack Player",
    description:
      "A premium anime streaming and manga reading portal featuring dynamic custom episode video playback (Vidstack React), Firebase auth, real-time user watchlist & watch history logs, chapter-by-chapter manga reader, and a secure administrator dashboard.",
    tags: ["React 19", "TypeScript", "Firebase", "Tailwind v4"],
    href: "https://aniwatchtv.tech",
    linkLabel: "View Site",
    icon: Sparkles,
    search:
      "streanime myronix anistream anime streaming video player vidstack firebase manga reader admin dashboard tailwind tsc",
    image: "/myronix.png",
  },
  {
    title: "EndoBridge",
    status: "Deployed",
    statusTone: "production",
    meta: "React 18 + Vite + TypeScript | Node API | Gemini proxy | MongoDB fallback",
    description:
      "AI-assisted PCOS monitoring companion that turns submitted session and lab data into structured insight reports with validation, safety disclaimers, PDF support, rate limiting, and Vitest coverage for core behavior.",
    tags: ["React", "TypeScript", "Gemini API", "Vitest"],
    href: "https://github.com/jonvicbarcenas/endobridge",
    liveHref: "https://endobridge.vercel.app",
    linkLabel: "Source",
    icon: Activity,
    search:
      "endobridge react vite typescript node mongodb gemini vitest ai pcos health insight report",
  },
  {
    title: "QueueMS",
    status: "Active",
    statusTone: "active",
    meta: "Spring Boot, React, Android, Firestore",
    description:
      "Smart campus queue management system with role-based users, teller handling, attachments, Google OAuth, email notifications, FCM, and real-time WebSocket updates.",
    tags: ["Java", "TypeScript", "Kotlin"],
    href: "https://github.com/jonvicbarcenas/IT342_QueueMS_G4_Barcenas",
    linkLabel: "View Details",
    icon: RadioTower,
    search:
      "queuems spring boot react android kotlin firestore websocket stomp firebase queue campus",
  },
  {
    title: "ShelfSmart",
    status: "Stable",
    statusTone: "stable",
    meta: "Django, PostgreSQL, SQLite, Bootstrap",
    description:
      "Library management system for catalog, members, borrowing, returns, due-date reminders, search history, role-based dashboards, and admin workflows.",
    tags: ["Django", "Python", "PostgreSQL"],
    href: "https://github.com/jonvicbarcenas/ShelfSmart",
    linkLabel: "View Details",
    icon: Library,
    search:
      "shelfsmart django library management postgresql sqlite bootstrap catalog borrow return",
  },
  {
    title: "Myrnhelm",
    status: "Game Lab",
    statusTone: "archive",
    meta: "Java OOP + libGDX",
    description:
      "Java OOP game project exploring desktop game structure, platform modules, NPC systems, quests, JSON parsing, collision logic, and team coordination.",
    tags: ["Java", "OOP", "libGDX"],
    href: "https://github.com/jonvicbarcenas/Myrnhelm",
    linkLabel: "View Details",
    icon: Swords,
    search: "myrnhelm java oop libgdx litiengine game npc quest collision json",
  },
  {
    title: "Auth Mini-App",
    status: "Lab",
    statusTone: "active",
    meta: "Spring Security, React, Android",
    description:
      "Full-stack authentication exercise with Spring Boot backend, React web client, Android/Kotlin mobile app, MySQL, Retrofit, and unified login flow practice.",
    tags: ["Spring Boot", "React", "Kotlin"],
    href: "https://github.com/jonvicbarcenas/IT342_G4_Barcenas_Lab1",
    linkLabel: "View Details",
    icon: ShieldCheck,
    search:
      "authentication spring boot react kotlin android mysql retrofit security mini app",
  },
  {
    title: "Django POS",
    status: "Practice",
    statusTone: "stable",
    meta: "Django, SQLite, HTML/CSS/JS",
    description:
      "Point-of-sale system with admin, manager, and teller roles, product management, transaction processing, sales reporting, and responsive web screens.",
    tags: ["Python", "Django", "RBAC"],
    href: "https://github.com/jonvicbarcenas/django-pos-system",
    linkLabel: "View Details",
    icon: ReceiptText,
    search: "django point of sale pos admin manager teller role based reports transaction",
  },
];

const stackSections: Array<{ title: string; icon: LucideIcon; items: StackItem[] }> = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      {
        name: "TypeScript",
        level: "Primary",
        tone: "expert",
        description:
          "Primary language for React, Vite, Node services, validation, and typed UI logic.",
        icon: Braces,
        search: "typescript javascript react vite node frontend",
      },
      {
        name: "Java",
        level: "Proficient",
        tone: "proficient",
        description:
          "Used for Spring Boot systems, authentication labs, and Java OOP game development.",
        icon: Coffee,
        search: "java spring boot oop libgdx backend game",
      },
      {
        name: "Kotlin",
        level: "Proficient",
        tone: "proficient",
        description:
          "Android activities, fragments, adapters, notifications, security settings, and mobile state.",
        icon: Smartphone,
        search: "kotlin android mobile retrofit recyclerview gradle",
      },
      {
        name: "Python",
        level: "Growing",
        tone: "advanced",
        description:
          "Django apps, POS practice, backend fundamentals, scripting, and automation learning.",
        icon: Terminal,
        search: "python django automation scripting basics",
      },
    ],
  },
  {
    title: "Frontend",
    icon: Component,
    items: [
      {
        name: "React + Vite",
        level: "Core",
        tone: "expert",
        description:
          "Client apps, dashboard shells, forms, validation, report UIs, and deployable Vercel builds.",
        icon: Component,
        search: "react vite tailwind css mui bootstrap frontend ui",
      },
      {
        name: "HTML/CSS/JS",
        level: "Daily",
        tone: "proficient",
        description:
          "Responsive interfaces, static deployment, UI polish, and practical browser behavior.",
        icon: Palette,
        search: "html css javascript responsive figma design",
      },
      {
        name: "UI Systems",
        level: "Tooling",
        tone: "advanced",
        description:
          "Tailwind CSS, Bootstrap, MUI, and Figma for structured screens and iteration.",
        icon: Paintbrush,
        search: "tailwind bootstrap material ui figma",
      },
    ],
  },
  {
    title: "Backend, Data, and Workflow",
    icon: ServerCog,
    items: [
      {
        name: "APIs",
        level: "Backend",
        tone: "proficient",
        description:
          "Spring Boot, Django, Node/Express concepts, REST flows, WebSocket/STOMP, and validation.",
        icon: Server,
        search: "spring boot django node express rest api websocket stomp",
      },
      {
        name: "Databases",
        level: "Data",
        tone: "proficient",
        description:
          "Data modeling and SQL/NoSQL exposure with PostgreSQL, SQLite, MySQL, and MongoDB.",
        icon: Database,
        search: "postgresql sqlite mysql mongodb database data modeling",
      },
      {
        name: "Dev Workflow",
        level: "Workflow",
        tone: "expert",
        description:
          "GitHub, Vercel deployment, Docker basics, Vitest, manual QA, and systematic debugging.",
        icon: GitPullRequest,
        search: "git github docker vercel vitest qa testing deployment",
      },
      {
        name: "AI-Assisted Work",
        level: "AI Tools",
        tone: "advanced",
        description:
          "Uses ChatGPT, Codex, and Gemini APIs for planning, debugging, code review, and learning.",
        icon: Bot,
        search: "chatgpt codex gemini ai api debugging planning review",
      },
    ],
  },
];

const featuredCards = [
  {
    title: "Projects",
    description:
      "AI insight reports, queue systems, library management, Android, and Java game work.",
    tags: ["React", "Java", "Django"],
    icon: FolderHeart,
    route: "projects" as RouteId,
  },
  {
    title: "Experience",
    description:
      "Comfortable with small scoped tasks, documentation, testing, GitHub, and remote collaboration.",
    tags: ["BSIT", "Remote-ready"],
    icon: BriefcaseBusiness,
  },
  {
    title: "Skills",
    description:
      "Frontend, backend, mobile, databases, AI APIs, QA mindset, and deployment workflows.",
    tags: ["TypeScript", "Kotlin", "Docker"],
    icon: Cpu,
    route: "stack" as RouteId,
  },
];

function normalizeRoute(hash: string): RouteId {
  const value = hash.replace("#", "");
  return routes.some((route) => route.id === value) ? (value as RouteId) : "home";
}

function searchableProject(project: Project) {
  return `${project.title} ${project.meta} ${project.description} ${project.tags.join(
    " ",
  )} ${project.search}`.toLowerCase();
}

function searchableStack(item: StackItem) {
  return `${item.name} ${item.level} ${item.description} ${item.search}`.toLowerCase();
}

type OSWindow = {
  id: "about" | "projects" | "stack" | "contact" | "terminal" | "experience";
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  icon: LucideIcon;
};

export function PortfolioShell() {
  const [windows, setWindows] = useState<OSWindow[]>([
    {
      id: "about",
      title: "About Me",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 60,
      y: 40,
      w: 800,
      h: 580,
      zIndex: 10,
      icon: Home,
    },
    {
      id: "projects",
      title: "Projects",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 120,
      y: 70,
      w: 840,
      h: 620,
      zIndex: 5,
      icon: SquareTerminal,
    },
    {
      id: "stack",
      title: "Tech Stack",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 180,
      y: 100,
      w: 820,
      h: 560,
      zIndex: 5,
      icon: Layers3,
    },
    {
      id: "contact",
      title: "Contact",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 240,
      y: 130,
      w: 840,
      h: 600,
      zIndex: 5,
      icon: Mail,
    },
    {
      id: "terminal",
      title: "Terminal",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 320,
      y: 160,
      w: 740,
      h: 480,
      zIndex: 11,
      icon: Terminal,
    },
    {
      id: "experience",
      title: "Experience",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 380,
      y: 190,
      w: 680,
      h: 520,
      zIndex: 5,
      icon: BriefcaseBusiness,
    },
  ]);

  const [maxZIndex, setMaxZIndex] = useState(15);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [time, setTime] = useState("");
  const [cpuLoad, setCpuLoad] = useState(6);
  const [ramUsage, setRamUsage] = useState(4.2);

  const [globalQuery, setGlobalQuery] = useState("");
  const [projectQuery, setProjectQuery] = useState("");
  const [stackQuery, setStackQuery] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: "cmd" | "output"; text: string }>>([
    { type: "output", text: "DainsleifOS v2.0 (kernel 6.8.2-arch-cyber)" },
    { type: "output", text: "System initialized. Welcome back, operator." },
    { type: "output", text: "Type 'help' for a list of command sequences." },
    { type: "output", text: "" },
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  // Dragging state
  const [dragState, setDragState] = useState<{
    windowId: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  // Clock Update Effect
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minStr = minutes < 10 ? "0" + minutes : minutes;
      
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dateStr = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
      
      setTime(`${dateStr} ${hours}:${minStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // System Stats Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 12) + 4);
      setRamUsage(parseFloat((4.0 + Math.random() * 0.4).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Terminal Auto Scroll
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Window Focus Sync with Route Hash (Fallback navigation)
  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash.replace("#", "");
      if (["about", "projects", "stack", "contact", "terminal", "experience"].includes(hash)) {
        openWindow(hash as any);
      }
    };
    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  const focusWindow = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
    );
  };

  const openWindow = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const toggleMaximize = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const startDrag = (e: React.PointerEvent, id: string) => {
    if (e.button !== 0) return; // Only left click
    focusWindow(id);
    
    const targetWin = windows.find((w) => w.id === id);
    if (!targetWin || targetWin.isMaximized) return;

    setDragState({
      windowId: id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: targetWin.x,
      initialY: targetWin.y,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 768;

    let nextX = dragState.initialX + deltaX;
    let nextY = dragState.initialY + deltaY;

    // Clamp coordinates to keep titlebar accessible
    nextX = Math.max(-200, Math.min(screenWidth - 100, nextX));
    nextY = Math.max(0, Math.min(screenHeight - 80, nextY));

    setWindows((prev) =>
      prev.map((w) => (w.id === dragState.windowId ? { ...w, x: nextX, y: nextY } : w))
    );
  };

  const handlePointerUp = () => {
    setDragState(null);
  };

  const handleStageClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedFolder(null);
    }
  };

  const isWindowFocused = (id: string) => {
    const openNonMin = windows.filter((w) => w.isOpen && !w.isMinimized);
    if (openNonMin.length === 0) return false;
    const sorted = [...openNonMin].sort((a, b) => b.zIndex - a.zIndex);
    return sorted[0].id === id;
  };

  const handleDockItemClick = (id: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w))
      );
    } else if (isWindowFocused(id)) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [
      ...terminalHistory,
      { type: "cmd" as const, text: `user@dainsleif:~$ ${trimmed}` },
    ];

    let output = "";

    switch (command) {
      case "help":
        output = `Available commands:
  help      - Display this help information
  ls        - List directory contents
  cat       - View file contents (e.g. cat about_me.md)
  neofetch  - Print system configuration information
  matrix    - Run the matrix digital rain visualizer
  open      - Open an application window (e.g. open projects)
  clear     - Clear the terminal screen`;
        break;
      case "ls":
        output = `about_me.md    projects.bin    stack.cfg    contact.sh`;
        break;
      case "cat":
        if (args.length === 0) {
          output = "Usage: cat <filename>";
        } else {
          const filename = args[0].toLowerCase();
          if (filename === "about_me.md") {
            output = `ABOUT ME
================
I am a motivated BSIT student and junior developer building practical web, mobile, systems, and AI-assisted tools.
Education: Cebu Institute of Technology - University
Degree: Bachelor of Science in Information Technology (2023 - Present)
Core Competencies: React, Next.js, TypeScript, Java, Kotlin, Python, Django, PostgreSQL, MongoDB, Docker, Git.`;
          } else if (filename === "projects.bin") {
            output = `PROJECTS LISTING
================
1. Streanime / MyroniX - Anime website and mobile product study [TypeScript, Android]
2. EndoBridge - AI PCOS monitoring companion [React, Vite, Gemini API]
3. QueueMS - Smart campus queue system [Spring Boot, React, Android, Firestore]
4. ShelfSmart - Library borrowing and return system [Django, PostgreSQL]
5. Myrnhelm - Java OOP + libGDX desktop RPG game
Use 'open projects' to launch the graphical explorer.`;
          } else if (filename === "stack.cfg") {
            output = `TECHNOLOGY STACK
================
Languages: TypeScript, JavaScript, Java, Kotlin, Python
Frontend : React, Next.js, Vite, HTML/CSS/JS, Tailwind, MUI, Figma
Backend  : Spring Boot, Django, REST APIs, Node, Express, WebSocket
Databases: PostgreSQL, SQLite, MySQL, MongoDB
Workflows: Git, GitHub, Vercel, Docker, Vitest, Gemini API`;
          } else if (filename === "contact.sh") {
            output = `CONTACT INFORMATION
===================
Email: jonvicbarcenas1@gmail.com
Phone: +63 994 482 4476
Loc  : Cebu, Philippines
Use 'open contact' to open the contact form window.`;
          } else {
            output = `cat: ${args[0]}: No such file or directory`;
          }
        }
        break;
      case "neofetch":
        output = `
      /\\        user@dainsleif
     /  \\       OS: DainsleifOS v2.0 (Next.js desktop shell)
    /\\   \\      Kernel: WebKit/ReactEngine-Turbopack
   /  \\   \\     Uptime: ${Math.floor(performance.now() / 60000)} mins
  /    \\   \\    Shell: DainsleifShell-sh
 /______\\___\\   Resolution: ${
   typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1920x1080"
 }
 \\      /   /   DE: Custom Cyber-IDE Desktop
  \\    /   /    WM: React State window manager
   \\  /   /     CPU: Intel Core i7-13700H @ 5.0GHz
    \\/___/      RAM: 4120MiB / 16384MiB (25%)
`;
        break;
      case "open":
        if (args.length === 0) {
          output = "Usage: open <app_name> (about, projects, stack, contact, experience)";
        } else {
          const appName = args[0].toLowerCase();
          const targetMap: Record<string, string> = {
            about: "about",
            projects: "projects",
            stack: "stack",
            contact: "contact",
            experience: "experience",
          };
          if (targetMap[appName]) {
            openWindow(targetMap[appName] as any);
            output = `Opening window: ${appName}...`;
          } else {
            output = `open: ${args[0]}: Application not found.`;
          }
        }
        break;
      case "matrix":
        setIsMatrixActive(true);
        output = "Matrix digital rain visualizer launched. Click screen or press ESC to exit.";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        output = `bash: ${command}: command not found. Type 'help' for command list.`;
    }

    setTerminalHistory([...newHistory, { type: "output" as const, text: output }]);
    setTerminalInput("");
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  const activeQuery = globalQuery.trim().toLowerCase();
  const projectFilter = (projectQuery || activeQuery).trim().toLowerCase();
  const stackFilter = (stackQuery || activeQuery).trim().toLowerCase();

  const visibleProjects = useMemo(
    () =>
      projects.filter((project) =>
        projectFilter ? searchableProject(project).includes(projectFilter) : true,
      ),
    [projectFilter],
  );

  const visibleStackSections = useMemo(
    () =>
      stackSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            stackFilter ? searchableStack(item).includes(stackFilter) : true,
          ),
        }))
        .filter((section) => section.items.length > 0),
    [stackFilter],
  );

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Portfolio Inquiry");
    const message = String(formData.get("message") || "");
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:jonvicbarcenas1@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;
    setFormStatus("Opening your email client...");
  };

  const copyFingerprint = async () => {
    const fingerprint = "JVB-REACT-TS-JAVA-KOTLIN-AI";
    try {
      await navigator.clipboard.writeText(fingerprint);
      setFormStatus("Fingerprint copied.");
    } catch {
      setFormStatus(fingerprint);
    }
  };

  const handleNavigateFromHome = (target: string) => {
    const t = target === "home" ? "about" : target;
    openWindow(t as any);
  };

  const handleExperienceClick = () => {
    openWindow("experience");
  };

  const desktopFolders = [
    { id: "about", name: "About Me", icon: Home },
    { id: "projects", name: "Projects", icon: SquareTerminal },
    { id: "stack", name: "Tech Stack", icon: Layers3 },
    { id: "contact", name: "Contact", icon: Mail },
    { id: "experience", name: "Experience", icon: BriefcaseBusiness },
  ];

  return (
    <>
      <div className="os-topbar">
        <div className="os-topbar-left">
          <strong>
            <Cpu size={14} /> DainsleifOS v2.0
          </strong>
          <span className="sys-status">
            <span /> Available for Work
          </span>
        </div>
        <div className="os-topbar-center">{time}</div>
        <div className="os-topbar-right">
          <div className="os-topbar-metric">
            CPU: <span>{cpuLoad}%</span>
          </div>
          <div className="os-topbar-metric">
            RAM: <span>{ramUsage}GB</span>
          </div>
          
          {/* Desktop Search Panel */}
          <div className="search-container desktop-search" style={{ width: "200px" }}>
            <label className="search-box" style={{ height: "26px", padding: "0 8px" }}>
              <Search size={12} aria-hidden="true" />
              <input
                type="search"
                placeholder="grep..."
                value={globalQuery}
                onChange={(event) => setGlobalQuery(event.target.value)}
                style={{ fontSize: "0.75rem" }}
              />
            </label>
            {activeQuery && (
              <SearchDropdown
                query={activeQuery}
                onSelectProject={(title) => {
                  openWindow("projects");
                  setProjectQuery(title);
                  setGlobalQuery("");
                }}
                onSelectStack={(name) => {
                  openWindow("stack");
                  setStackQuery(name);
                  setGlobalQuery("");
                }}
                onSelectRoute={(id) => {
                  const target = id === "home" ? "about" : id;
                  openWindow(target as any);
                  setGlobalQuery("");
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div
        className="desktop-stage"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleStageClick}
      >
        {/* Desktop Shortcuts */}
        <div className="desktop-icons">
          {desktopFolders.map((folder) => {
            const Icon = folder.icon;
            return (
              <div
                key={folder.id}
                className={`desktop-folder ${selectedFolder === folder.id ? "is-selected" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFolder(folder.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  openWindow(folder.id as any);
                }}
              >
                <div className="desktop-folder-icon-wrapper">
                  <Icon />
                </div>
                <span>{folder.name}</span>
              </div>
            );
          })}
        </div>

        {/* Windows Rendering */}
        {windows.map((win) => {
          if (!win.isOpen || win.isMinimized) return null;

          const isFocused = isWindowFocused(win.id);
          const Icon = win.icon;

          return (
            <div
              key={win.id}
              className={`os-window ${isFocused ? "is-focused" : ""} ${
                win.isMaximized ? "is-maximized" : ""
              }`}
              style={
                win.isMaximized
                  ? { zIndex: win.zIndex }
                  : {
                      left: `${win.x}px`,
                      top: `${win.y}px`,
                      width: `${win.w}px`,
                      height: `${win.h}px`,
                      zIndex: win.zIndex,
                    }
              }
              onPointerDown={() => focusWindow(win.id)}
            >
              <div className="window-titlebar" onPointerDown={(e) => startDrag(e, win.id)}>
                <span>
                  <Icon size={14} /> {win.title}
                </span>
                <div className="window-controls" onPointerDown={(e) => e.stopPropagation()}>
                  <button
                    className="window-dot close"
                    onClick={() => closeWindow(win.id)}
                    title="Close"
                    aria-label="Close window"
                  />
                  <button
                    className="window-dot minimize"
                    onClick={() => minimizeWindow(win.id)}
                    title="Minimize"
                    aria-label="Minimize window"
                  />
                  <button
                    className="window-dot maximize"
                    onClick={() => toggleMaximize(win.id)}
                    title="Maximize"
                    aria-label="Maximize window"
                  />
                </div>
              </div>

              <div className="window-body">
                {/* Specific Terminal Shell UI */}
                {win.id === "terminal" && (
                  <div
                    className="window-content terminal-window-body"
                    style={{ width: "100%", height: "100%", overflowY: "auto" }}
                    onClick={() => terminalInputRef.current?.focus()}
                  >
                    {isMatrixActive && (
                      <MatrixRain onExit={() => setIsMatrixActive(false)} />
                    )}

                    <div className="terminal-history">
                      {terminalHistory.map((line, index) => (
                        <div key={index} className={`terminal-line ${line.type}`}>
                          {line.text}
                        </div>
                      ))}
                      <div ref={terminalBottomRef} />
                    </div>

                    <form onSubmit={handleTerminalSubmit} className="terminal-prompt-row">
                      <span>user@dainsleif:~$</span>
                      <input
                        ref={terminalInputRef}
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        autoFocus={isFocused}
                        disabled={isMatrixActive}
                        aria-label="Terminal prompt"
                      />
                    </form>
                  </div>
                )}

                {/* About Me Window content */}
                {win.id === "about" && (
                  <div className="window-content" style={{ overflowY: "auto", height: "100%" }}>
                    <HomePage
                      navigate={handleNavigateFromHome}
                      onExperienceClick={handleExperienceClick}
                    />
                  </div>
                )}

                {/* Projects Window content */}
                {win.id === "projects" && (
                  <div className="window-content" style={{ overflowY: "auto", height: "100%" }}>
                    <ProjectsPage
                      projectQuery={projectQuery}
                      setProjectQuery={setProjectQuery}
                      visibleProjects={visibleProjects}
                    />
                  </div>
                )}

                {/* Stack Window content */}
                {win.id === "stack" && (
                  <div className="window-content" style={{ overflowY: "auto", height: "100%" }}>
                    <StackPage
                      stackQuery={stackQuery}
                      setStackQuery={setStackQuery}
                      visibleStackSections={visibleStackSections}
                    />
                  </div>
                )}

                {/* Contact Window content */}
                {win.id === "contact" && (
                  <div className="window-content" style={{ overflowY: "auto", height: "100%" }}>
                    <ContactPage
                      formStatus={formStatus}
                      handleContactSubmit={handleContactSubmit}
                      copyFingerprint={copyFingerprint}
                    />
                  </div>
                )}

                {/* Experience Timeline content inside floating window */}
                {win.id === "experience" && (
                  <div
                    className="window-content"
                    style={{ overflowY: "auto", height: "100%", padding: "28px" }}
                  >
                    <div className="modal-body" style={{ padding: 0, overflow: "visible" }}>
                      <h2>My Journey & Experience</h2>
                      <div className="timeline">
                        {experienceData.map((item, index) => (
                          <div className="timeline-item" key={index}>
                            <div className="timeline-badge">{item.year}</div>
                            <div className="timeline-panel">
                              <h3>{item.title}</h3>
                              <h4>{item.subtitle}</h4>
                              <p>{item.description}</p>
                              {((item as any).certificate) && (
                                <div className="timeline-certificate" style={{ marginTop: "12px" }}>
                                  <a href={(item as any).certificate} target="_blank" rel="noreferrer" style={{ display: "inline-block" }}>
                                    <img
                                      src={(item as any).certificate}
                                      alt="Certificate"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "180px",
                                        borderRadius: "6px",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        display: "block",
                                        transition: "transform 0.2s ease"
                                      }}
                                      className="certificate-preview"
                                    />
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--blue-2)", marginTop: "6px" }}>
                                      View Certificate <ExternalLink size={12} />
                                    </span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Bottom OS Dock */}
        <div className="os-dock-wrapper">
          <div className="os-dock">
            {windows.map((w) => {
              const Icon = w.icon;
              const isRunning = w.isOpen;
              const isFocused = isWindowFocused(w.id);
              
              return (
                <button
                  key={w.id}
                  className={`os-dock-item ${isRunning ? "is-running" : ""} ${
                    w.isMinimized ? "is-minimized" : ""
                  } ${isFocused ? "is-focused" : ""}`}
                  type="button"
                  onClick={() => handleDockItemClick(w.id)}
                >
                  <Icon />
                  <span className="os-dock-tooltip">
                    {w.isMinimized ? `Restore ${w.title}` : w.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function HomePage({
  navigate,
  onExperienceClick,
}: {
  navigate: (route: RouteId) => void;
  onExperienceClick: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"system" | "about">("system");

  return (
    <>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "system" ? "is-active" : ""}`}
          onClick={() => setActiveTab("system")}
          type="button"
        >
          <SquareTerminal aria-hidden="true" /> system_init.sh
        </button>
        <button
          className={`tab ${activeTab === "about" ? "is-active" : ""}`}
          onClick={() => setActiveTab("about")}
          type="button"
        >
          <Box aria-hidden="true" /> about_me.md
        </button>
      </div>

      {activeTab === "system" ? (
        <>
          <div className="hero-panel">
            <div className="hero-copy">
              <span className="status-pill">
                <span />
                Available for Work
              </span>
              <h1>
                Hello, I&apos;m <mark>Jon Vic.</mark>
              </h1>
              <p>
                Motivated junior developer building practical web, mobile,
                systems, and AI-assisted tools with React, TypeScript, Java, Kotlin,
                Python/Django, and careful debugging habits.
              </p>
              <div className="hero-actions">
                <button className="button primary" type="button" onClick={() => navigate("projects")}>
                  <FolderCode aria-hidden="true" />
                  View Projects
                </button>
                <a className="button secondary" href="/Jon_Vic_Barcenas_CV.pdf" download>
                  <Download aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </div>
            <div className="hero-visual" aria-label="GitHub profile visual">
              <Image
                src="/image.jpg"
                alt="Jon Vic Barcenas"
                width={178}
                height={178}
                priority
                unoptimized
              />
            </div>
          </div>

          <p className="terminal-prompt">
            <span>user@portfolio:~$</span> ls -la ./featured
          </p>

          <div className="feature-grid">
            {featuredCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <span className="file-mode">drwxr-xr-x</span>
                  <Icon aria-hidden="true" />
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <div className="chips">
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </>
              );

              if (card.title === "Experience") {
                return (
                  <button
                    className="feature-card"
                    key={card.title}
                    type="button"
                    onClick={onExperienceClick}
                  >
                    {content}
                  </button>
                );
              }

              return card.route ? (
                <button
                  className="feature-card"
                  key={card.title}
                  type="button"
                  onClick={() => navigate(card.route)}
                >
                  {content}
                </button>
              ) : (
                <article className="feature-card" key={card.title}>
                  {content}
                </article>
              );
            })}
          </div>

          <div className="terminal-card">
            <div className="terminal-title">
              <span className="dot red" />
              <span className="dot amber" />
              <span className="dot blue" />
              <span>bash - 80x24</span>
            </div>
            <div className="terminal-body">
              <p>
                <span>user@host:~$</span> ./fetch_status.sh
              </p>
              <p>Education: Cebu Institute of Technology - University, BSIT, 2023-present</p>
              <p>Focus: Web development, systems, AI-assisted workflows, automation</p>
              <p>Availability: Part-time remote work, open to mentorship and feedback</p>
              <p>GitHub: github.com/jonvicbarcenas | Public repos: 18 | Hireable: true</p>
            </div>
          </div>
        </>
      ) : (
        <div className="markdown-viewer">
          <div className="markdown-header">
            <span className="doc-icon">📝</span>
            <h3>about_me.md</h3>
          </div>
          <div className="markdown-body">
            <h1>About Me</h1>
            <p className="lead">
              I am a motivated BSIT student and junior developer building practical web, mobile, systems, and AI-assisted tools.
            </p>
            
            <h2>Education</h2>
            <div className="md-item">
              <strong>Cebu Institute of Technology - University</strong>
              <span>Bachelor of Science in Information Technology (2023 - Present)</span>
            </div>

            <h2>Core Competencies</h2>
            <ul>
              <li><strong>Frontend:</strong> React, Next.js, Vite, TypeScript, Vanilla CSS</li>
              <li><strong>Backend:</strong> Spring Boot, Django, Node API, PostgreSQL, MongoDB</li>
              <li><strong>Mobile:</strong> Android SDK, Kotlin, SQLite, Firebase Firestore</li>
              <li><strong>Workflows:</strong> Docker, Git/GitHub, Vercel, LLM APIs (Gemini)</li>
            </ul>

            <h2>Coding Philosophy</h2>
            <blockquote>
              "I believe in building clean, maintainable systems that serve real-world needs, supported by careful debugging habits and structured research."
            </blockquote>
          </div>
        </div>
      )}
    </>
  );
}

function ProjectsPage({
  projectQuery,
  setProjectQuery,
  visibleProjects,
}: {
  projectQuery: string;
  setProjectQuery: (value: string) => void;
  visibleProjects: Project[];
}) {
  const featured = visibleProjects[0];
  const rest = visibleProjects.slice(1);

  return (
    <>
      <div className="section-head">
        <div>
          <h1>Projects Directory</h1>
          <p>total {visibleProjects.length} items | sorting: GitHub activity + CV relevance</p>
        </div>
        <div className="section-actions">
          <label className="filter-input">
            <Search aria-hidden="true" />
            <input
              type="search"
              placeholder="grep 'project'..."
              value={projectQuery}
              onChange={(event) => setProjectQuery(event.target.value)}
            />
          </label>
          <button className="button dark" type="button" onClick={() => setProjectQuery("")}>
            <ListFilter aria-hidden="true" />
            Filter
          </button>
        </div>
      </div>

      {featured ? (
        <>
          <ProjectFeature project={featured} />
          <div className="project-grid">
            {rest.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">No project matched that search.</div>
      )}
    </>
  );
}

function ProjectFeature({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <article className="project-feature project-card">
      <div className="project-emblem">
        {project.image ? (
          <div className="project-image-wrap">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="project-image-cover"
              unoptimized
            />
          </div>
        ) : (
          <Icon aria-hidden="true" />
        )}
      </div>
      <div className="project-content">
        <div className="project-title-row">
          <h2>{project.title}</h2>
          <span className={`badge ${project.statusTone}`}>{project.status}</span>
        </div>
        <p className="project-meta">
          <GitBranch aria-hidden="true" />
          {project.meta}
        </p>
        <p>{project.description}</p>
        <div className="chips">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.liveHref ? (
            <a href={project.liveHref} target="_blank" rel="noreferrer">
              Live App <ExternalLink aria-hidden="true" />
            </a>
          ) : null}
          <a href={project.href} target="_blank" rel="noreferrer">
            {project.linkLabel} <GitFork aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <article className="project-card">
      <div className="card-icon">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={38}
            height={38}
            className="project-card-image-logo"
            unoptimized
          />
        ) : (
          <Icon aria-hidden="true" />
        )}
      </div>
      <div className="project-title-row">
        <h2>{project.title}</h2>
        <span className={`badge ${project.statusTone}`}>{project.status}</span>
      </div>
      <p className="project-meta">
        <GitBranch aria-hidden="true" />
        {project.meta}
      </p>
      <p>{project.description}</p>
      <div className="chips">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <a className="details-link" href={project.href} target="_blank" rel="noreferrer">
        {project.linkLabel} <ArrowRight aria-hidden="true" />
      </a>
    </article>
  );
}

function StackPage({
  stackQuery,
  setStackQuery,
  visibleStackSections,
}: {
  stackQuery: string;
  setStackQuery: (value: string) => void;
  visibleStackSections: typeof stackSections;
}) {
  return (
    <>
      <div className="stack-head">
        <div>
          <h1>Technology Stack</h1>
          <p>
            A curated overview of the tools, languages, frameworks, and workflows used
            across school projects, deployed apps, mobile labs, and AI-assisted development.
          </p>
        </div>
        <label className="search-box stack-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Search stack..."
            value={stackQuery}
            onChange={(event) => setStackQuery(event.target.value)}
          />
        </label>
      </div>

      {visibleStackSections.length ? (
        visibleStackSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <div className="stack-section" key={section.title}>
              <h2>
                <SectionIcon aria-hidden="true" />
                {section.title}
              </h2>
              <div className="stack-grid">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className="stack-card" key={item.name}>
                      <span className={`level ${item.tone}`}>{item.level}</span>
                      <Icon aria-hidden="true" />
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="empty-state empty-dark">No stack item matched that search.</div>
      )}
    </>
  );
}

function ContactPage({
  formStatus,
  handleContactSubmit,
  copyFingerprint,
}: {
  formStatus: string;
  handleContactSubmit: (event: FormEvent<HTMLFormElement>) => void;
  copyFingerprint: () => void;
}) {
  return (
    <>
      <div className="section-head">
        <div>
          <h1>Establish Connection</h1>
          <p>&gt; Ping me for collaborations, junior developer work, or project questions.</p>
        </div>
      </div>

      <div className="contact-layout">
        <form className="contact-terminal" onSubmit={handleContactSubmit}>
          <div className="terminal-title">
            <span className="dot red" />
            <span className="dot amber" />
            <span className="dot blue" />
            <span>bash - contact.sh</span>
          </div>
          <div className="contact-fields">
            <label>
              <span>
                <span className="token-keyword">var</span> <span className="token-var">user_name</span> <span className="token-operator">=</span>
              </span>
              <input name="name" type="text" placeholder="John Doe" required />
            </label>
            <label>
              <span>
                <span className="token-keyword">var</span> <span className="token-var">user_email</span> <span className="token-operator">=</span>
              </span>
              <input name="email" type="email" placeholder="john@example.com" required />
            </label>
            <label className="wide">
              <span>
                <span className="token-keyword">var</span> <span className="token-var">subject</span> <span className="token-operator">=</span>
              </span>
              <input name="subject" type="text" placeholder="Project Inquiry" required />
            </label>
            <label className="wide">
              <span>
                <span className="token-keyword">function</span> <span className="token-fn">getMessage</span>() {"{"}
              </span>
              <textarea name="message" placeholder="return 'Write your message here...';" required />
              <span>{"}"}</span>
            </label>
          </div>
          <div className="form-footer">
            <p aria-live="polite">{formStatus}</p>
            <button className="button primary" type="submit">
              <Send aria-hidden="true" />
              Execute Send
            </button>
          </div>
        </form>

        <aside className="contact-side">
          <div className="direct-card">
            <h2>
              <Contact aria-hidden="true" /> Direct Comms
            </h2>
            <a href="mailto:jonvicbarcenas1@gmail.com">
              <Mail aria-hidden="true" />
              <span>jonvicbarcenas1@gmail.com</span>
            </a>
            <a href="tel:+639944824476">
              <Phone aria-hidden="true" />
              <span>+63 994 482 4476</span>
            </a>
            <p>
              <MapPin aria-hidden="true" /> Cebu, Philippines
            </p>
          </div>

          <div className="social-grid">
            <a href="https://github.com/jonvicbarcenas" target="_blank" rel="noreferrer">
              <GitFork aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/jonvicbarcenas" target="_blank" rel="noreferrer">
              <Briefcase aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a href="/Jon_Vic_Barcenas_CV.pdf" download>
              <FileDown aria-hidden="true" />
              <span>Resume</span>
            </a>
            <a href="https://endobridge.vercel.app" target="_blank" rel="noreferrer">
              <Rocket aria-hidden="true" />
              <span>Deployed App</span>
            </a>
          </div>

          <div className="key-card">
            <div>
              <span>Portfolio Fingerprint</span>
              <button type="button" onClick={copyFingerprint} aria-label="Copy fingerprint">
                <Copy aria-hidden="true" />
              </button>
            </div>
            <code>JVB-REACT-TS-JAVA-KOTLIN-AI</code>
          </div>
        </aside>
      </div>
    </>
  );
}

function SearchDropdown({
  query,
  onSelectProject,
  onSelectStack,
  onSelectRoute,
}: {
  query: string;
  onSelectProject: (title: string) => void;
  onSelectStack: (name: string) => void;
  onSelectRoute: (id: RouteId) => void;
}) {
  const filteredRoutes = useMemo(() => {
    return routes.filter((r) =>
      r.label.toLowerCase().includes(query)
    );
  }, [query]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }, [query]);

  const filteredStack = useMemo(() => {
    const allItems: StackItem[] = [];
    stackSections.forEach((s) => {
      s.items.forEach((item) => {
        if (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        ) {
          allItems.push(item);
        }
      });
    });
    return allItems;
  }, [query]);

  const hasResults =
    filteredRoutes.length > 0 ||
    filteredProjects.length > 0 ||
    filteredStack.length > 0;

  return (
    <div className="search-dropdown">
      {filteredRoutes.length > 0 && (
        <div className="search-dropdown-group">
          <div className="search-dropdown-title">Navigation</div>
          {filteredRoutes.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                className="search-dropdown-item"
                onClick={() => onSelectRoute(r.id)}
                type="button"
              >
                <Icon aria-hidden="true" />
                <span>Go to {r.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {filteredProjects.length > 0 && (
        <div className="search-dropdown-group">
          <div className="search-dropdown-title">Projects</div>
          {filteredProjects.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.title}
                className="search-dropdown-item"
                onClick={() => onSelectProject(p.title)}
                type="button"
              >
                <Icon aria-hidden="true" />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {filteredStack.length > 0 && (
        <div className="search-dropdown-group">
          <div className="search-dropdown-title">Skills / Tech</div>
          {filteredStack.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.name}
                className="search-dropdown-item"
                onClick={() => onSelectStack(s.name)}
                type="button"
              >
                <Icon aria-hidden="true" />
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {!hasResults && (
        <div className="search-dropdown-empty">
          No matches found for "{query}"
        </div>
      )}
    </div>
  );
}

function MatrixRain({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 700;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*()_+-=[]{}|;':,./<>?";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald green matrix code
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onExit]);

  return (
    <div
      className="matrix-overlay"
      onClick={(e) => {
        e.stopPropagation();
        onExit();
      }}
      title="Click anywhere or press ESC to exit Matrix mode"
    >
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="matrix-exit-hint">ESC / CLICK TO EXIT MATRIX</div>
    </div>
  );
}

