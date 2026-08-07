import {
  ArrowUpRight,
  BriefcaseBusiness,
  Copy,
  Download,
  FileDown,
  GitBranch,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import type { FormEvent } from "react";

type ContactAppProps = {
  status: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCopy: () => void;
};

export function ContactApp({ status, onSubmit, onCopy }: ContactAppProps) {
  return (
    <div className="contact-app app-scroll">
      <div className="contact-intro">
        <span className="feature-icon blue"><Mail aria-hidden="true" /></span>
        <div>
          <span className="eyebrow">NEW MESSAGE</span>
          <h1>Let&apos;s build something useful.</h1>
          <p>I&apos;m open to junior developer work, thoughtful collaborations, project conversations, and mentorship.</p>
        </div>
      </div>

      <div className="contact-grid">
        <form className="message-card" onSubmit={onSubmit}>
          <div className="field-grid">
            <label>
              <span>Your name</span>
              <input name="name" type="text" autoComplete="name" placeholder="Jane Doe" required />
            </label>
            <label>
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
            </label>
          </div>
          <label>
            <span>Subject</span>
            <input name="subject" type="text" placeholder="Project collaboration" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Tell me a little about what you are working on…" required />
          </label>
          <div className="message-footer">
            <p aria-live="polite">{status || "This opens your default mail application."}</p>
            <button className="suggested-action" type="submit"><Send aria-hidden="true" />Send message</button>
          </div>
        </form>

        <aside className="contact-details">
          <section>
            <h2>Contact details</h2>
            <a href="mailto:jonvicbarcenas1@gmail.com">
              <span><Mail aria-hidden="true" /></span>
              <div><small>Email</small><strong>jonvicbarcenas1@gmail.com</strong></div>
            </a>
            <a href="tel:+639944824476">
              <span><Phone aria-hidden="true" /></span>
              <div><small>Phone</small><strong>+63 994 482 4476</strong></div>
            </a>
            <div className="contact-row">
              <span><MapPin aria-hidden="true" /></span>
              <div><small>Location</small><strong>Cebu, Philippines</strong></div>
            </div>
          </section>

          <section>
            <h2>Find me online</h2>
            <div className="social-buttons">
              <a href="https://github.com/jonvicbarcenas" target="_blank" rel="noreferrer"><GitBranch />GitHub<ArrowUpRight /></a>
              <a href="https://linkedin.com/in/jonvicbarcenas" target="_blank" rel="noreferrer"><BriefcaseBusiness />LinkedIn<ArrowUpRight /></a>
              <a href="/Jon_Vic_Barcenas_CV.pdf" download><FileDown />Resume<Download /></a>
            </div>
          </section>

          <section className="fingerprint">
            <div><small>Portfolio fingerprint</small><code>JVB-REACT-TS-JAVA-KOTLIN-AI</code></div>
            <button type="button" onClick={onCopy} aria-label="Copy portfolio fingerprint"><Copy /></button>
          </section>
        </aside>
      </div>
    </div>
  );
}
