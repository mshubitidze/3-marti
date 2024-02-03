"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyInput({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  return (
    <div className="flex w-full max-w-lg items-center gap-2">
      <Input readOnly value={value} />
      <Button
        size="icon"
        className="min-h-9 min-w-9"
        aria-disabled={copied}
        disabled={copied}
        onClick={() => {
          void navigator.clipboard.writeText(value);
          setCopied(true);
        }}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
