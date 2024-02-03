"use client";

import { Input } from "@/components/ui/input";
import { handleParamChange } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MessageInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const errors = searchParams.get("errors")?.toString();
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">ნაბიჯი 2: შეიყვანე მესიჯი</h2>
      <div className="flex flex-col gap-2">
        <Input
          onChange={(e) =>
            handleParamChange(e, searchParams, router, pathname, "message")
          }
          defaultValue={decodeURIComponent(
            searchParams.get("message")?.toString() ?? "",
          )}
          placeholder="შეიყვანე მილოცვის მესიჯი"
          name="message"
        />
        {errors ? (
          <p className="text-sm text-destructive">
            {
              (JSON.parse(decodeURIComponent(errors)) as Record<string, string>)
                .message
            }
          </p>
        ) : null}
      </div>
    </div>
  );
}
