import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  testId,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)} data-testid={testId}>
      <Reveal>
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-muted-foreground">
          <span className="inline-flex h-6 items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 shadow-[0_0_0_1px_hsl(var(--primary)/0.05)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {eyebrow ?? "Section"}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-[1.05]">
          <span className="text-gradient">{title}</span>
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
