import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export type TimelineItemProps = {
  index: number;
  role: string;
  company: string;
  period: string;
  bullets: string[];
  className?: string;
};

export default function TimelineItem({
  index,
  role,
  company,
  period,
  bullets,
  className,
}: TimelineItemProps) {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={index * 0.08} className={className}>
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.06 }}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border/70 card-glass grain shimmer-border",
          "p-5 sm:p-6 md:p-7 hover-lift",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, hsl(var(--primary)/0.22), transparent 58%)",
          }}
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/30 px-3 py-1 text-xs text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                {company}
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/30 px-3 py-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                {period}
              </span>
            </div>

            <h3 className="mt-2 text-lg sm:text-xl md:text-2xl leading-tight">
              {role}
            </h3>
          </div>

          <ul className="space-y-3 text-sm sm:text-[0.95rem] leading-relaxed text-foreground/85">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Reveal>
  );
}
