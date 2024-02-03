"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader } from "lucide-react";

export function PendingButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} disabled={pending} type="submit">
      შექმნა
      {pending ? (
        <Loader className="ml-1 h-4 w-4 animate-spin" />
      ) : (
        <ArrowRight className="ml-1 h-4 w-4" />
      )}
    </Button>
  );
}
