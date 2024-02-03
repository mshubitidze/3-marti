import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Link from "next/link";

export function CloseButton() {
  return (
    <Link
      className={cn(
        buttonVariants({ size: "icon", variant: "outline" }),
        "absolute right-3 top-3 rounded-full md:right-5 md:top-5 md:min-h-14 md:min-w-14",
      )}
      href="/"
    >
      <XIcon className="h-4 w-4 md:h-8 md:w-8" />
    </Link>
  );
}
