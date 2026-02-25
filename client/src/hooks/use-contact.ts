import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ContactCreateInput } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useCreateContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ContactCreateInput) => {
      const validated = parseWithLogging(api.contact.create.input, input, "contact.create.input");

      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (res.status === 400) {
        const err = parseWithLogging(api.contact.create.responses[400], await res.json(), "contact.create.400");
        throw new Error(err.field ? `${err.field}: ${err.message}` : err.message);
      }

      if (!res.ok) {
        throw new Error(`Failed to send message (${res.status})`);
      }

      return parseWithLogging(api.contact.create.responses[201], await res.json(), "contact.create.201");
    },
    onSuccess: async () => {
      // There is no list endpoint in the contract; still keep the app consistent.
      await queryClient.invalidateQueries({ queryKey: [api.contact.create.path] });
    },
  });
}
