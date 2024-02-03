"use server";

import { db } from "@/server/db";
import { messages } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getOg(slug: string) {
  return (await db.select().from(messages).where(eq(messages.slug, slug)))[0];
}
