import { RenderDesign } from "./_components/render-design";
import { DesignPicker } from "./_components/design-picker";
import { MessageInput } from "./_components/message-input";
import { PendingButton } from "./_components/pending-button";
import { handleSubmit } from "./actions";

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
