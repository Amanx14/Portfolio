import { db } from "./db";
import {
  contactMessages,
  type ContactMessageResponse,
  type CreateContactMessageRequest,
} from "@shared/schema";

export interface IStorage {
  createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse> {
    const [created] = await db
      .insert(contactMessages)
      .values(input)
      .returning();

    return created;
  }
}

export const storage = new DatabaseStorage();
