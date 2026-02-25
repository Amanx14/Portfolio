import NeonButton from "@/components/NeonButton";
import Reveal from "@/components/Reveal";
import { Link } from "wouter";
import { Home, TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-mesh">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Reveal>
          <div className="rounded-3xl border border-border/70 card-glass grain p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-background/30">
                <TriangleAlert className="h-6 w-6 text-accent" />
              </span>
              <div>
                <h1 className="text-3xl sm:text-4xl">Page not found</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  The link you followed doesn’t exist here.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/" className="inline-flex">
                <NeonButton
                  data-testid="notfound-home"
                  onClick={() => {}}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Home className="h-4.5 w-4.5" />
                  Go home
                </NeonButton>
              </Link>

              <NeonButton
                data-testid="notfound-back"
                onClick={() => window.history.back()}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                Back
              </NeonButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
