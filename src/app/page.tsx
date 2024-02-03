import { redirect } from "next/navigation";
import { messages, messagesInsertSchema } from "@/server/db/schema";
import { db } from "@/server/db";
import { isRedirectError } from "next/dist/client/components/redirect";
import { RenderDesign } from "./_components/render-design";
import { ZodError } from "zod";
import { DesignPicker } from "./_components/design-picker";
import { MessageInput } from "./_components/message-input";
import { nanoid } from "nanoid";
import { PendingButton } from "./_components/pending-button";

export default async function IndexPage({
  searchParams: { slug },
}: {
  searchParams: {
    slug: string | undefined;
    design: string | undefined;
    message: string | undefined;
    errors: string | undefined;
  };
}) {
  async function handleSubmit(fd: FormData) {
    "use server";
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
      redirect(`/?slug=${slug}`);
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

  return (
    <main className="flex min-h-[calc(100dvh-11rem)] flex-col justify-around">
      <div className="container mx-auto -mt-24 h-full md:-mt-16">
        {slug ? (
          <RenderDesign slug={slug} />
        ) : (
          <form action={handleSubmit} className="space-y-6">
            <DesignPicker />
            <MessageInput />
            <PendingButton />
          </form>
        )}
      </div>
    </main>
  );
}
