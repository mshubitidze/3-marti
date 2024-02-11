"use server";

import { db } from "@/server/db";
import { messages, messagesInsertSchema } from "@/server/db/schema";
import { nanoid } from "nanoid";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const ratelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "300s"),
});

export async function handleSubmit(fd: FormData) {
  const design = fd.get("design")?.toString();
  const message = fd.get("message")?.toString();
  try {
    const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
    const allowed = await ratelimiter.limit(ip);
    if (!allowed.success) {
      redirect(`/?limit=${allowed.reset}`);
    }
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
      const params = new URLSearchParams();
      params.set(
        "errors",
        encodeURIComponent(JSON.stringify(err.flatten().fieldErrors)),
      );
      redirect(`/?${params.toString()}`);
    }
  }
}
