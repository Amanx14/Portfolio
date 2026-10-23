import Seo from "@/components/Seo";
import { education, experience, profile, projects, skills, type Project } from "@/data/portfolio";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "@/styles/portfolio.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const kindLabel: Record<Project["kind"], string> = {
  notes: "HealthTech · Voice AI",
  tryon: "Fashion · GenAI",
  dashboard: "Enterprise · Analytics",
};

/* Plus shape with rounded ends and deep concave inner curves, drawn in a -LEN..LEN box.
   Rotated 45° it reads as an X. Proportions traced from the reference mark: long slim arms
   (length ≈ 10× half-width) and inner curves ≈ 2.5× half-width, which pinch the centre into
   a compact rounded body. Its solid core has a radius of ~CORE units. */
const ARM = 24; // half arm width
const LEN = 240; // arm length from centre
const END = 11; // end-cap corner radius
const FIL = 60; // inner concave curve radius
const CORE = (ARM + FIL) * Math.SQRT2 - FIL;
const X_FILL = "#6F61B2";
const X_PATH = (() => {
  const [w, l, e, r] = [ARM, LEN, END, FIL];
  const cap = (x: number, y: number) => `A ${e} ${e} 0 0 1 ${x} ${y}`;
  const fil = (x: number, y: number) => `A ${r} ${r} 0 0 0 ${x} ${y}`;
  return [
    `M ${-w} ${-l + e}`, cap(-w + e, -l), `L ${w - e} ${-l}`, cap(w, -l + e),
    `L ${w} ${-w - r}`, fil(w + r, -w),
    `L ${l - e} ${-w}`, cap(l, -w + e), `L ${l} ${w - e}`, cap(l - e, w),
    `L ${w + r} ${w}`, fil(w, w + r),
    `L ${w} ${l - e}`, cap(w - e, l), `L ${-w + e} ${l}`, cap(-w, l - e),
    `L ${-w} ${w + r}`, fil(-w - r, w),
    `L ${-l + e} ${w}`, cap(-l, w - e), `L ${-l} ${-w + e}`, cap(-l + e, -w),
    `L ${-w - r} ${-w}`, fil(-w, -w - r), "Z",
  ].join(" ");
})();

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Renders `**bold**` markers; bold runs that are metrics ("60%", "₹1.5 Cr", "40,000+") turn pink. */
function rich(text: string) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <b key={i} className={/^[₹\d]|\d%/.test(part) ? "hl" : undefined}>
        {part}
      </b>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const company = experience.company.replace(" Pvt. Ltd.", "");

function Socials() {
  return (
    <div className="pf-socials">
      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <Linkedin size={28} strokeWidth={1.2} />
      </a>
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <Github size={28} strokeWidth={1.2} />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email">
        <Mail size={28} strokeWidth={1.2} />
      </a>
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      // 2D transforms only on the X layers, so the SVG re-rasterises sharp as it scales
      gsap.set(".pf-x-move, .pf-x-scale, .pf-x-rot", { force3D: false });
      gsap.set(".pf-x-rot", { rotation: 45 });

      if (reduced) {
        gsap.set(".pf-x", { display: "none" });
        gsap.set(".pf-fill", { opacity: 1 });
        return;
      }

      /* Intro */
      const name = SplitText.create(".pf-name", { type: "chars", mask: "chars" });
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        // Intro lives on the inner <svg>; the wrapper layers belong to the scroll timeline only
        .from(".pf-x svg", { scale: 0, rotation: -90, duration: 1.6, ease: "expo.out", force3D: false })
        .from(name.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.15)
        .from(".pf-role-line", { y: 24, opacity: 0, duration: 0.9 }, 0.55)
        .from(".pf-hero .pf-socials a", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.75)
        .from(".pf-resume-tab", { x: -90, duration: 1, ease: "back.out(1.6)" }, 0.9);

      /* Signature: as you read down, the X slowly turns into a "+" and grows until its core floods the
         screen. The black gaps between the arms shrink as circular cut-outs. */
      const rot = root.current!.querySelector<HTMLElement>(".pf-x-rot")!;
      const fillScale = () => {
        const unit = rot.offsetWidth / (2 * LEN); // px per path unit
        return (Math.hypot(window.innerWidth, window.innerHeight) / 2 / (CORE * unit)) * 1.08;
      };
      // Desktop: centred on screen, overlapping the name (as in the reference).
      // Narrow screens: starts below the hero text, then rises to centre.
      const wide = () => window.innerWidth > 900;
      const startX = () => 0;
      const startY = () => (wide() ? 0 : window.innerHeight * 0.24);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".pf-hero",
            start: "top top",
            end: () => `+=${window.innerHeight * 2.8}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(".pf-x-move", { x: startX, y: startY }, { x: 0, y: 0, ease: "power1.inOut", duration: 0.3, force3D: false }, 0)
        // Turns steadily with the scroll (linear) through 110°: X → "+" → past X
        // fromTo with explicit starts: a refresh (font load, resize) can never record a mid-animation
        // value as the start, which used to make the X shrink to nothing while scrolling
        .fromTo(".pf-x-rot", { rotation: 45 }, { rotation: 45 + 110, ease: "none", duration: 1, force3D: false }, 0)
        .fromTo(".pf-x-scale", { scale: 1 }, { scale: fillScale, ease: "power3.in", duration: 1, force3D: false }, 0)
        .fromTo(".pf-fill", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.05 }, 0.95);

      /* Gentle reveals only — the X is the show */
      gsap.utils.toArray<HTMLElement>(".pf-h2, .pf-row-meta, .pf-row-head, .pf-bullets li, .pf-reveal").forEach((el) =>
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }),
      );
    }, root);

    // Web fonts change text heights, so re-measure trigger positions once they're in
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* X leans gently toward the pointer */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const target = root.current?.querySelector<HTMLElement>(".pf-x-scale");
    if (!target) return;
    const tx = gsap.quickTo(target, "x", { duration: 1.2, ease: "power3", force3D: false });
    const ty = gsap.quickTo(target, "y", { duration: 1.2, ease: "power3", force3D: false });
    const onMove = (e: MouseEvent) => {
      tx((e.clientX / window.innerWidth - 0.5) * 30);
      ty((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pf" ref={root}>
      <Seo
        title={`${profile.firstName} ${profile.lastName} — ${profile.title}`}
        description="Software Engineer building enterprise web and AI products with React, Node.js, FastAPI and LLM APIs."
        url={typeof window !== "undefined" ? window.location.href : undefined}
      />

      {/* ---------- Fixed background: the X and the flood colour it becomes ---------- */}
      <div className="pf-x" aria-hidden>
        <div className="pf-x-move">
          <div className="pf-x-scale">
            <div className="pf-x-rot">
              <svg viewBox={`${-LEN} ${-LEN} ${2 * LEN} ${2 * LEN}`}>
                <path d={X_PATH} fill={X_FILL} />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="pf-fill" aria-hidden />

      <a className="pf-resume-tab" href={profile.resume} target="_blank" rel="noreferrer">
        Resume
      </a>

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="pf-hero" id="top">
          <div className="pf-wrap">
            <h1 className="pf-name">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="pf-role-line">
              {profile.title} at <b>{company}</b>
            </p>
            <Socials />
          </div>
        </section>

        {/* ---------------- Experience ---------------- */}
        <section className="pf-section" id="experience">
          <div className="pf-wrap">
            <h2 className="pf-h2">Experience</h2>

            <article className="pf-row">
              <div className="pf-row-meta">{experience.period.replace("–", "-")}</div>
              <div className="pf-row-body">
                <div className="pf-row-head">
                  <h3>{company}</h3>
                  <p className="pf-role">{experience.role}</p>
                </div>
                <ul className="pf-bullets">
                  {experience.bullets.map((b, i) => (
                    <li key={i}>{rich(b)}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* ---------------- Projects ---------------- */}
        <section className="pf-section" id="projects">
          <div className="pf-wrap">
            <h2 className="pf-h2">Projects</h2>

            {projects.map((p) => (
              <article className="pf-row" key={p.name}>
                <div className="pf-row-meta">{kindLabel[p.kind]}</div>
                <div className="pf-row-body">
                  <div className="pf-row-head">
                    <h3>
                      {p.link ? (
                        <a className="pf-proj-link" href={p.link} target="_blank" rel="noreferrer">
                          {p.name} <ArrowUpRight size={22} strokeWidth={2} />
                          <span>{p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                        </a>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <p className="pf-role">{p.summary}</p>
                  </div>
                  <ul className="pf-bullets">
                    {p.points.map((pt, j) => (
                      <li key={j}>{rich(pt)}</li>
                    ))}
                  </ul>
                  <p className="pf-tech pf-reveal">{p.tech.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section className="pf-section" id="skills">
          <div className="pf-wrap">
            <h2 className="pf-h2">Skills</h2>
            {skills.map((g) => (
              <div className="pf-row pf-row--tight" key={g.group}>
                <div className="pf-row-meta">{g.group}</div>
                <p className="pf-row-body pf-skill-list pf-reveal">{g.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Education ---------------- */}
        <section className="pf-section" id="education">
          <div className="pf-wrap">
            <h2 className="pf-h2">Education</h2>
            <article className="pf-row">
              <div className="pf-row-meta">{education.period.replace("–", "-")}</div>
              <div className="pf-row-body">
                <div className="pf-row-head">
                  <h3>{education.school}</h3>
                  <p className="pf-role">{education.degree}</p>
                  <p className="pf-context">
                    {education.place} · <b className="hl">{education.score}</b>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section className="pf-section pf-contact" id="contact">
          <div className="pf-wrap">
            <h2 className="pf-h2">Contact</h2>
            <div className="pf-row">
              <div className="pf-row-meta">Say hello</div>
              <div className="pf-row-body pf-reveal">
                <p className="pf-role">I'm open to new opportunities in web platforms and AI products.</p>
                <a className="pf-mail" href={`mailto:${profile.email}`}>
                  {profile.email} <ArrowUpRight size={22} strokeWidth={1.6} />
                </a>
                <Socials />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-wrap pf-footer">
        <span>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
        </span>
        <button onClick={scrollToTop}>Back to top ↑</button>
      </footer>
    </div>
  );
}
