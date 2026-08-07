"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Contact,
  Download,
  Files,
  FolderCode,
  Home,
  Laptop,
  MapPin,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { WindowId } from "@/features/desktop/desktop.types";
import { ContactApp } from "@/features/apps/contact/contact-app";
import { ExperienceApp } from "@/features/apps/experience/experience-app";

type AboutView = "overview" | "experience" | "contact";

type AboutAppProps = {
  openWindow: (id: WindowId) => void;
  formStatus: string;
  onContactSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCopyFingerprint: () => void;
};

const VIEW_TABS = [
  { id: "overview" as const, label: "Overview", icon: Home },
  { id: "experience" as const, label: "Experience", icon: BriefcaseBusiness },
  { id: "contact" as const, label: "Contact", icon: Contact },
];

export function AboutApp({
  openWindow,
  formStatus,
  onContactSubmit,
  onCopyFingerprint,
}: AboutAppProps) {
  const [activeView, setActiveView] = useState<AboutView>("overview");

  return (
    <div className="about-layout">
      <aside className="app-sidebar">
        <div className="sidebar-profile">
          <Image src="/image.jpg" alt="Jon Vic Barcenas" width={72} height={72} priority />
          <strong>Jon Vic</strong>
          <span>jonvic@portfolio</span>
        </div>
        <nav aria-label="About sections">
          {VIEW_TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = activeView === tab.id;
            return (
              <button key={tab.id} className={selected ? "is-selected" : ""} type="button" onClick={() => setActiveView(tab.id)} aria-current={selected ? "page" : undefined}>
                <Icon />{tab.label}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-device">
          <Laptop />
          <div><strong>Portfolio</strong><span>Next.js workstation</span></div>
          <span className="online-dot" />
        </div>
      </aside>

      <div className="about-main">
        <nav className="about-mobile-tabs" aria-label="About sections" role="tablist">
          {VIEW_TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = activeView === tab.id;
            return (
              <button key={tab.id} type="button" role="tab" aria-selected={selected} className={selected ? "is-selected" : ""} onClick={() => setActiveView(tab.id)}>
                <Icon /><span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {activeView === "overview" ? <Overview openWindow={openWindow} /> : null}
        {activeView === "experience" ? <ExperienceApp /> : null}
        {activeView === "contact" ? <ContactApp status={formStatus} onSubmit={onContactSubmit} onCopy={onCopyFingerprint} /> : null}
      </div>
    </div>
  );
}

function Overview({ openWindow }: { openWindow: (id: WindowId) => void }) {
  return (
    <div className="about-overview app-scroll">
      <section className="profile-hero">
        <div className="profile-copy">
          <span className="availability"><span />Available for junior roles</span>
          <p className="eyebrow">HELLO, I&apos;M</p>
          <h1>Jon Vic<br /><span>Barcenas</span></h1>
          <p className="profile-intro">BSIT student and junior developer building thoughtful web, mobile, systems, and AI-assisted products from Cebu, Philippines.</p>
          <div className="profile-actions">
            <button className="suggested-action" type="button" onClick={() => openWindow("projects")}><FolderCode />Explore projects</button>
            <a className="standard-action" href="/Jon_Vic_Barcenas_CV.pdf" download><Download />Download CV</a>
          </div>
        </div>
        <div className="profile-portrait">
          <div className="portrait-ring"><Image src="/image.jpg" alt="Portrait of Jon Vic Barcenas" width={240} height={240} priority /></div>
          <span className="portrait-chip"><MapPin />Cebu, PH</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title">
          <div><span className="eyebrow">CURRENTLY</span><h2>Building useful software</h2></div>
          <button type="button" onClick={() => openWindow("projects")}>View all <ArrowRight /></button>
        </div>
        <div className="feature-rows">
          <button type="button" onClick={() => openWindow("projects")}><span className="feature-icon blue"><Files /></span><div><strong>Product projects</strong><p>Deployed web apps, mobile systems, and real-time workflows.</p></div><ChevronRight /></button>
          <button type="button" onClick={() => openWindow("stack")}><span className="feature-icon purple"><Code2 /></span><div><strong>Full-stack learning</strong><p>React, TypeScript, Spring Boot, Kotlin, Python, and databases.</p></div><ChevronRight /></button>
          <button type="button" onClick={() => openWindow("terminal")}><span className="feature-icon green"><Terminal /></span><div><strong>Terminal portfolio</strong><p>Run help, neofetch, ls, whoami, or open an application.</p></div><ChevronRight /></button>
        </div>
      </section>
    </div>
  );
}
