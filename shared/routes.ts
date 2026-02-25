import { z } from "zod";
import { insertContactMessageSchema, type ContactMessage } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    create: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactMessageSchema.extend({
        email: z.string().email(),
        name: z.string().min(1),
        message: z.string().min(1),
      }),
      responses: {
        201: z.custom<ContactMessage>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ContactCreateInput = z.infer<typeof api.contact.create.input>;
export type ContactCreateResponse = z.infer<
  typeof api.contact.create.responses[201]
>;
