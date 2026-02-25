import Seo from "@/components/Seo";
import SectionHeader from "@/components/SectionHeader";
import TimelineItem from "@/components/TimelineItem";
import SocialIconLink from "@/components/SocialIconLink";
import ContactDialog from "@/components/ContactDialog";
import NeonButton from "@/components/NeonButton";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, ArrowDownRight, FileText, Dot } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NavItem = { id: string; label: string };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.18, 0.28, 0.42], rootMargin: "-15% 0px -65% 0px" },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join("|")]);

  return active;
}

export default function Home() {
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "top", label: "Home" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  const active = useActiveSection(navItems.map((n) => n.id));

  const experiences = useMemo(
    () => [
      {
        role: "Software Engineer",
        company: "ENS Enterprises Pvt. Ltd.",
        period: "Dec 2023 – Present",
        bullets: [
          "Designed and developed responsive React.js client and admin interfaces, driving a 20% increase in user engagement through performance and UI improvements.",
          "Integrated AI-powered features using LLM APIs, and regularly worked with clients to understand their business needs and turn them into practical frontend solutions.",
          "Worked closely with backend and product teams to integrate RESTful APIs, supporting smooth end-to-end CRUD workflows across the application.",
          "Mentored and led 3 interns, helping them learn React best practices, write clean code, and confidently deliver real production features.",
          "Participated in code reviews, bug fixes, and performance optimizations, improving UI stability and responsiveness.",
        ],
      },
      {
        role: "Client Project: Lakmé Website & Admin Dashboard",
        company: "ENS Enterprises Pvt. Ltd.",
        period: "Project Role",
        bullets: [
          "Collaborated as part of the development team on the Lakmé customer-facing website and admin panel, contributing to both UI implementation and dashboard functionality.",
          "Worked extensively with multiple RESTful APIs to power admin workflows, analytics views, listings, and data-driven UI components.",
          "Contributed to building admin dashboards for managing content, products, users, and operational data through structured CRUD flows.",
        ],
      },
      {
        role: "Client Project: Rajnigandha Customer Loyalty Platform",
        company: "ENS Enterprises Pvt. Ltd.",
        period: "Project Role",
        bullets: [
          "Collaborated as part of a development team to build a customer loyalty platform with purchase-based point allocation.",
          "Contributed to customer, gift, campaign, and analytics modules, handled 17 lakh customer records.",
          "Assisted in automation and data migration workflows, helping reduce manual processing errors by 30%.",
          "Integrated and optimized RESTful CRUD APIs, contributing to 15% improvement in response times.",
        ],
      },
      {
        role: "Client Project: Aumraa – Admin Management System",
        company: "ENS Enterprises Pvt. Ltd.",
        period: "Project Role",
        bullets: [
          "Contributed to an admin dashboard managing 1,000+ practitioner profiles, services, and media assets.",
          "Implemented and maintained role-based access control (RBAC) features in collaboration with the team.",
          "Worked on WebSocket-based broadcasting for admin actions, live status updates, and automatic logout across active sessions.",
          "Helped streamline admin workflows through centralized dashboards, reducing manual review effort for operations teams.",
        ],
      },
    ],
    [],
  );

  return (
    <>
      <Seo
        title="Aman Kumar — Frontend Developer"
        description="Frontend Developer with 2.2 years of experience leading the creation of complex, user-focused web applications."
        url={typeof window !== "undefined" ? window.location.href : undefined}
      />

      <div className="min-h-screen bg-mesh">
        {/* Top glow */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-2xl"
        />

        {/* NAV */}
        <header className="sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-3 rounded-3xl border border-border/70 bg-background/35 backdrop-blur-xl shadow-[0_25px_80px_-60px_hsl(0_0%_0%/0.85)]">
              <div className="flex items-center justify-between px-4 py-3 sm:px-5">
                <button
                  data-testid="nav-home"
                  onClick={() => scrollToId("top")}
                  className="group inline-flex items-center gap-2 rounded-2xl px-3 py-2 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
                >
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-primary/50 blur-[6px]" />
                    <span className="relative rounded-full bg-primary" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight">
                    Aman<span className="text-primary">.</span>
                  </span>
                </button>

                <nav className="hidden md:flex items-center gap-1">
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        data-testid={`nav-${item.id}`}
                        onClick={() => scrollToId(item.id)}
                        className={cn(
                          "relative rounded-2xl px-4 py-2 text-sm font-semibold tracking-tight transition-all",
                          "hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
                          isActive ? "text-primary" : "text-foreground/80",
                        )}
                      >
                        {item.label}
                        {isActive ? (
                          <span
                            aria-hidden
                            className="absolute inset-x-3 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-2">
                  <NeonButton
                    data-testid="resume-button"
                    onClick={() => window.open("https://drive.google.com/file/d/1yRRLQHtpHIZC1TIGTmdL_jXMl_PrYwsA/view?usp=sharing", "_blank")}
                    variant="ghost"
                    size="sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Resume</span>
                  </NeonButton>

                  <button
                    data-testid="nav-contact"
                    onClick={() => scrollToId("contact")}
                    className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/15 hover:border-primary/45 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-200"
                  >
                    Contact <ArrowDownRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HERO */}
        <main id="top" className="relative z-10">
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 md:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
                    <Dot className="h-4 w-4 text-primary" />
                    Frontend Developer • 2.2+ Years Experience
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
                    Aman Kumar
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Frontend Developer with 2.2 years of experience leading the creation of complex, user-focused web applications at the highest level of quality and efficiency.
                  </p>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                    <NeonButton
                      data-testid="hero-resume"
                      onClick={() =>
                        window.open(
                          "https://drive.google.com/file/d/1yRRLQHtpHIZC1TIGTmdL_jXMl_PrYwsA/view?usp=sharing",
                          "_blank",
                        )
                      }
                      size="lg"
                    >
                      <FileText className="h-4.5 w-4.5" />
                      View Resume
                    </NeonButton>

                    <NeonButton
                      data-testid="hero-scroll-experience"
                      onClick={() => scrollToId("experience")}
                      variant="ghost"
                      size="lg"
                    >
                      Experience <ArrowDownRight className="h-4.5 w-4.5" />
                    </NeonButton>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-9 flex items-center gap-3">
                    <SocialIconLink
                      testId="social-linkedin"
                      href="https://linkedin.com/in/im-avi07"
                      label="LinkedIn"
                      icon={<Linkedin className="h-5 w-5" />}
                    />
                    <SocialIconLink
                      testId="social-github"
                      href="https://github.com/Amanx14"
                      label="GitHub"
                      icon={<Github className="h-5 w-5" />}
                    />
                    <div className="hidden sm:block text-xs text-muted-foreground pl-2">
                      <span className="font-mono text-foreground/80">tip:</span> hit Contact to send a note
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.08} y={18}>
                  <div className="rounded-[2rem] border border-border/70 card-glass grain p-6 sm:p-7 md:p-8 hover-lift">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold tracking-tight text-foreground/90">
                        At a glance
                      </p>
                      <span className="animate-floaty inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border/70 bg-background/30">
                        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_5px_hsl(var(--primary)/0.14)]" />
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4">
                      {[
                        { k: "Stack", v: "React.js, Next.js, Redux, TypeScript" },
                        { k: "Skills", v: "Data Structures, Algorithms, RESTful APIs" },
                        { k: "Tools", v: "Git, GitHub, CI/CD, Firebase, Jest" },
                      ].map((row, idx) => (
                        <div
                          key={row.k}
                          className="rounded-2xl border border-border/60 bg-background/30 px-4 py-3 hover:border-primary/35 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                              {row.k}
                            </span>
                            <span className="text-xs text-muted-foreground">0{idx + 1}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                            {row.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <button
                        data-testid="hero-scroll-contact"
                        onClick={() => scrollToId("contact")}
                        className="w-full rounded-2xl border border-border/70 bg-gradient-to-r from-secondary/60 via-secondary/40 to-secondary/60 px-4 py-3 text-sm font-semibold text-foreground/85 hover:border-primary/35 hover:text-foreground hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-200"
                      >
                        Let’s talk <ArrowDownRight className="inline h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.24}>
              <div className="mt-12 sm:mt-16 flex items-center justify-center">
                <button
                  data-testid="scroll-down"
                  onClick={() => scrollToId("experience")}
                  className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-4 py-2 text-xs font-semibold tracking-[0.26em] uppercase text-muted-foreground hover:text-foreground hover:border-primary/35 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 transition-all"
                >
                  Scroll <ArrowDownRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              </div>
            </Reveal>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-10">
            <SectionHeader
              testId="section-experience"
              eyebrow="Experience"
              title="Building user-focused web applications."
              description="A track record of shipping high-quality frontend solutions and managing complex client projects."
            />

            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 md:gap-6">
              {experiences.map((e, idx) => (
                <TimelineItem
                  key={`${e.company}-${e.period}-${idx}`}
                  index={idx}
                  role={e.role}
                  company={e.company}
                  period={e.period}
                  bullets={e.bullets}
                />
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-18 md:pt-20 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-7">
                <SectionHeader
                  testId="section-contact"
                  eyebrow="Contact"
                  title="Let’s build something together."
                  description="Open for collaboration on frontend projects and complex web applications."
                />

                <Reveal delay={0.08}>
                  <div className="mt-6 rounded-3xl border border-border/70 card-glass grain p-6 sm:p-7 md:p-8">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground/90">Get in touch</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Email: amannkumar14@gmail.com
                        </p>
                      </div>
                      <ContactDialog triggerText="Send a message" testId="contact-open-cta" />
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.12} y={18}>
                  <div className="rounded-3xl border border-border/70 bg-card/40 backdrop-blur p-6 sm:p-7 md:p-8 hover-lift">
                    <p className="text-sm font-semibold tracking-tight">Profiles</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Where to find me online.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <SocialIconLink
                        testId="footer-linkedin"
                        href="https://linkedin.com/in/im-avi07"
                        label="LinkedIn"
                        icon={<Linkedin className="h-5 w-5" />}
                      />
                      <SocialIconLink
                        testId="footer-github"
                        href="https://github.com/Amanx14"
                        label="GitHub"
                        icon={<Github className="h-5 w-5" />}
                      />
                    </div>

                    <div className="mt-7 rounded-2xl border border-border/70 bg-background/30 p-4">
                      <p className="text-xs tracking-[0.24em] uppercase text-muted-foreground">
                        Education
                      </p>
                      <div className="mt-3 text-sm text-foreground/85">
                        <p className="font-semibold">B.Tech in Computer Science</p>
                        <p className="text-muted-foreground text-xs mt-1">Dr. APJ Abdul Kalam Technical University</p>
                        <p className="text-muted-foreground text-xs">CGPA: 8.3 / 10 | 2020 – 2023</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <NeonButton
                        data-testid="footer-resume"
                        onClick={() =>
                          window.open(
                            "https://drive.google.com/file/d/1yRRLQHtpHIZC1TIGTmdL_jXMl_PrYwsA/view?usp=sharing",
                            "_blank",
                          )
                        }
                        variant="ghost"
                        size="lg"
                        className="w-full"
                      >
                        <FileText className="h-4.5 w-4.5" />
                        Open Resume
                      </NeonButton>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-border/70 bg-background/20 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Aman Kumar. Built with intent.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    data-testid="footer-back-to-top"
                    onClick={() => scrollToId("top")}
                    className="rounded-2xl border border-border/70 bg-card/40 px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-primary/10 hover:border-primary/35 hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 transition-all"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
