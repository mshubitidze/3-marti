"use client";

import { Input } from "@/components/ui/input";
import { cn, handleParamChange } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MessageInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const errors = searchParams.get("errors")?.toString();
  const errorMessage = errors
    ? (JSON.parse(decodeURIComponent(errors)) as Record<string, string>).message
    : null;
  return (
    <div className="flex flex-col space-y-4">
      <h2
        className={cn("text-xl font-bold md:text-2xl", {
          "text-destructive": !!errorMessage,
        })}
      >
        ნაბიჯი 2: შეიყვანე მესიჯი
      </h2>
      <div className="flex flex-col gap-2">
        <Input
          className={cn({
            "border-destructive": !!errorMessage,
          })}
          onChange={(e) =>
            handleParamChange(e, searchParams, router, pathname, "message")
          }
          defaultValue={decodeURIComponent(
            searchParams.get("message")?.toString() ?? "",
          )}
          placeholder="შეიყვანე მილოცვის მესიჯი"
          name="message"
        />
        <p className="text-sm text-destructive">{errorMessage}</p>
      </div>
    </div>
  );
}
