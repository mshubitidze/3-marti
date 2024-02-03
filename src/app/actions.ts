"use server";

import { db } from "@/server/db";
import { messages, messagesInsertSchema } from "@/server/db/schema";
import { nanoid } from "nanoid";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function handleSubmit(fd: FormData) {
  const design = fd.get("design")?.toString();
  const message = fd.get("message")?.toString();
  try {
    const slug = nanoid(10);
    const parsed = messagesInsertSchema.parse({
      design,
      message,
      slug,
    });
    await db.insert(messages).values({ ...parsed });
    redirect(`/${slug}`);
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof ZodError) {
      redirect(
        `/?errors=${encodeURIComponent(JSON.stringify(err.flatten().fieldErrors))}`,
      );
    }
  }
}
