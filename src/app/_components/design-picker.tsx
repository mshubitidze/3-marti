"use client";

import { cn, handleParamChange } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  { name: "design", value: "1", src: "/1.png", alt: "Design 1" },
  { name: "design", value: "2", src: "/2.png", alt: "Design 2" },
  { name: "design", value: "3", src: "/3.png", alt: "Design 3" },
];

export function DesignPicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const errors = searchParams.get("errors")?.toString();
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">ნაბიჯი 1: აირჩიე დიზაინი</h2>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => {
          return (
            <label
              className={cn(
                "cursor-pointer rounded-lg transition-all hover:scale-105 has-[:checked]:ring-2 has-[:checked]:ring-blue-800",
                {
                  "ring-2 ring-destructive":
                    errors &&
                    (
                      JSON.parse(decodeURIComponent(errors)) as Record<
                        string,
                        string
                      >
                    ).design,
                },
              )}
              key={option.value}
            >
              <input
                className="hidden"
                name={option.name}
                type="radio"
                value={option.value}
                defaultChecked={searchParams.get("design") === option.value}
                onChange={(e) =>
                  handleParamChange(e, searchParams, router, pathname, "design")
                }
              />
              <Image
                alt={option.alt}
                className="h-auto w-full rounded-lg object-cover shadow-md"
                height="183"
                width="275"
                src={option.src}
                style={{
                  aspectRatio: "275/183",
                  objectFit: "cover",
                }}
              />
            </label>
          );
        })}
        {errors ? (
          <p className="text-sm text-destructive">
            {(JSON.parse(decodeURIComponent(errors)) as Record<string, string>)
              .design
              ? "გთხოვ, აირჩიო დიზაინი"
              : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}
