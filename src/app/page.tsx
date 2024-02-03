import { redirect } from "next/navigation";
import { messages, messagesInsertSchema } from "@/server/db/schema";
import { db } from "@/server/db";
import { isRedirectError } from "next/dist/client/components/redirect";
import { Button } from "@/components/ui/button";
import { RenderDesign } from "./_components/render";
import { ZodError } from "zod";
import { DesignPicker } from "./_components/design-picker";
import { MessageInput } from "./_components/message-input";

export default async function IndexPage({
  searchParams: { slug },
}: {
  searchParams: {
    slug: string | undefined;
    errors: string | undefined;
  };
}) {
  async function handleSubmit(fd: FormData) {
    "use server";
    const design = fd.get("design")?.toString();
    const message = fd.get("message")?.toString();
    try {
      const slug = crypto.randomUUID();
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
    <div className="flex min-h-[calc(100vh-10rem)] flex-col">
      <main className="mx-auto mt-6 w-full max-w-4xl flex-1 p-4 md:mt-16">
        <div className="mb-5">
          {slug ? (
            <RenderDesign slug={slug} />
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <DesignPicker />
              <MessageInput />
              <Button type="submit">Generate</Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
