import * as React from "react";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { api, type ContactCreateInput } from "@shared/routes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NeonButton from "@/components/NeonButton";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const initial: ContactCreateInput = { name: "", email: "", message: "" };

export default function ContactDialog({
  triggerText = "Send a message",
  testId,
}: {
  triggerText?: string;
  testId?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<ContactCreateInput>(initial);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const create = useCreateContactMessage();

  const errors = React.useMemo(() => {
    const parsed = api.contact.create.input.safeParse(form);
    if (parsed.success) return {};
    const out: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = (issue.path?.[0] as string) ?? "form";
      if (!out[key]) out[key] = issue.message;
    }
    return out;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && !create.isPending;

  function set<K extends keyof ContactCreateInput>(key: K, value: ContactCreateInput[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    const parsed = api.contact.create.input.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Check your details",
        description: "Please fix the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    create.mutate(parsed.data, {
      onSuccess: () => {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out — I’ll reply soon.",
        });
        setForm(initial);
        setTouched({});
        setOpen(false);
      },
      onError: (err) => {
        toast({
          title: "Couldn’t send message",
          description: err instanceof Error ? err.message : "Please try again.",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NeonButton
          data-testid={testId ?? "contact-open"}
          onClick={() => setOpen(true)}
          variant="primary"
          size="lg"
        >
          <Mail className="h-4.5 w-4.5" />
          {triggerText}
        </NeonButton>
      </DialogTrigger>

      <DialogContent className="max-w-xl border-border/70 bg-popover/70 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Let’s build something sharp.</DialogTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Quick note or a detailed brief — both work.
          </p>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-3 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs tracking-wide text-muted-foreground">Name</label>
              <Input
                data-testid="contact-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                placeholder="Your name"
                className="h-12 rounded-2xl bg-background/50 border-2 border-border/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              {touched.name && errors.name ? (
                <p className="text-xs text-destructive">{errors.name}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-wide text-muted-foreground">Email</label>
              <Input
                data-testid="contact-email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                placeholder="you@domain.com"
                className="h-12 rounded-2xl bg-background/50 border-2 border-border/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              {touched.email && errors.email ? (
                <p className="text-xs text-destructive">{errors.email}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs tracking-wide text-muted-foreground">Message</label>
            <Textarea
              data-testid="contact-message"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, message: true }))}
              placeholder="What are you building?"
              className="min-h-[140px] rounded-2xl bg-background/50 border-2 border-border/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            {touched.message && errors.message ? (
              <p className="text-xs text-destructive">{errors.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Endpoint: <span className="font-mono text-foreground/80">{api.contact.create.path}</span>
            </p>

            <NeonButton
              data-testid="contact-submit"
              type="submit"
              disabled={!canSubmit}
              onClick={() => {}}
              className="rounded-2xl"
            >
              <Send className="h-4.5 w-4.5" />
              {create.isPending ? "Sending..." : "Send"}
            </NeonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
