import { cn } from "@/lib/utils";
import React from "react";

export default function SocialIconLink({
  href,
  label,
  icon,
  testId,
  className,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  testId?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-testid={testId}
      className={cn(
        "group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/50 backdrop-blur",
        "shadow-[0_18px_55px_-40px_hsl(0_0%_0%/0.9)]",
        "hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
        "transition-all duration-200",
        className,
      )}
    >
      <span className="text-foreground/85 transition-colors duration-200 group-hover:text-primary">
        {icon}
      </span>
    </a>
  );
}
