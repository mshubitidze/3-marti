"use client";

import { cn, handleParamChange } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  { name: "design", value: "white", src: "/white.png", alt: "White Design" },
  { name: "design", value: "blue", src: "/blue.png", alt: "Blue Design" },
  { name: "design", value: "red", src: "/red.png", alt: "Red Design" },
];

export function DesignPicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const errors = searchParams.get("errors")?.toString();
  const isError = !!(
    errors &&
    (JSON.parse(decodeURIComponent(errors)) as Record<string, string>).design
  );

  return (
    <div className="flex flex-col space-y-4">
      <h2
        className={cn("text-xl font-bold md:text-2xl", {
          "text-destructive": isError,
        })}
      >
        ნაბიჯი 1: აირჩიე დიზაინი
      </h2>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {options.map((option) => {
            return (
              <label
                className={cn(
                  "relative cursor-pointer rounded-lg border transition-all has-[:checked]:scale-[1.02] has-[:checked]:border-primary",
                  {
                    "border-destructive": isError,
                  },
                )}
                key={option.value}
              >
                <input
                  className="absolute right-2 top-2 md:right-5 md:top-5 md:h-6 md:w-6"
                  name={option.name}
                  type="radio"
                  value={option.value}
                  defaultChecked={searchParams.get("design") === option.value}
                  onChange={(e) =>
                    handleParamChange(
                      e,
                      searchParams,
                      router,
                      pathname,
                      "design",
                    )
                  }
                />
                <Image
                  alt={option.alt}
                  className="rounded-lg object-cover"
                  width={1200}
                  height={675}
                  src={option.src}
                />
              </label>
            );
          })}
        </div>
        <p className="text-sm text-destructive">
          {isError ? "გთხოვ, აირჩიო დიზაინი" : null}
        </p>
      </div>
    </div>
  );
}
