import * as React from "react";
import { cn } from "@/lib/utils";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function NeonButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: NeonButtonProps) {
  const sizes =
    size === "sm"
      ? "px-4 py-2 text-sm rounded-xl"
      : size === "lg"
        ? "px-7 py-3.5 text-base rounded-2xl"
        : "px-5 py-2.5 text-sm rounded-2xl";

  const styles =
    variant === "ghost"
      ? "bg-transparent border border-border/70 text-foreground/90 hover:border-primary/40 hover:bg-primary/10"
      : "bg-gradient-to-r from-primary/95 via-primary to-accent/85 text-primary-foreground border border-primary/30 shadow-[0_16px_55px_-35px_hsl(var(--primary)/0.85)] hover:shadow-[0_22px_70px_-40px_hsl(var(--primary)/0.95)]";

  return (
    <button
      {...props}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 font-semibold tracking-tight",
        sizes,
        styles,
        "hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-200 ease-out",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none",
        className,
      )}
    >
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px 220px at 20% 20%, hsl(var(--primary)/0.35), transparent 55%), radial-gradient(500px 220px at 85% 40%, hsl(var(--accent)/0.25), transparent 60%)",
          }}
        />
      ) : null}
      {props.children}
    </button>
  );
}
