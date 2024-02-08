import { Suspense } from "react";
import { DesignPicker } from "./_components/design-picker";
import { MessageInput } from "./_components/message-input";
import { PendingButton } from "./_components/pending-button";
import { handleSubmit } from "./actions";

export default async function IndexPage() {
  return (
    <main className="container mx-auto flex min-h-[calc(100svh-9rem)] flex-col justify-around">
      <form action={handleSubmit} className="space-y-6">
        <Suspense fallback={null}>
          <DesignPicker />
        </Suspense>
        <Suspense fallback={null}>
          <MessageInput />
        </Suspense>
        <PendingButton />
      </form>
    </main>
  );
}
