import { Suspense } from "react";
import { DesignPicker } from "./_components/design-picker";
import { MessageInput } from "./_components/message-input";
import { PendingButton } from "./_components/pending-button";
import { handleSubmit } from "./actions";

type IndexPageProps = {
  searchParams: {
    limit: "1" | undefined;
  };
};

export default async function IndexPage({
  searchParams: { limit },
}: IndexPageProps) {
  return (
    <main className="container mx-auto flex min-h-[calc(100svh-9rem)] flex-col justify-center gap-10">
      {limit ? (
        <p className="text-center text-xl text-destructive">
          გთხოვ, მოიცადო 5 წუთი ახალი მისალოცი ბარათის დაგენერირებამდე
        </p>
      ) : null}
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
