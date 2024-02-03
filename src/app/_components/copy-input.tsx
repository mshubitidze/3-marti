"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex space-x-2">
      <Input readOnly value={value} />
      <Button
        className="w-44"
        onClick={() => {
          void navigator.clipboard.writeText(value);
          setCopied(true);
        }}
      >
        {copied ? "Copied!" : "Copy URL"}
      </Button>
    </div>
  );
}
