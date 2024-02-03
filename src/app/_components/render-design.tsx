import { buttonVariants } from "@/components/ui/button";
import { ImageDownloadButton } from "./download-button";
import { cn, createImageSrc, getBaseUrl } from "@/lib/utils";
import Link from "next/link";
import { RefreshCw, XIcon } from "lucide-react";
import { CopyInput } from "./copy-input";

export async function RenderDesign({ slug }: { slug: string }) {
  const url = `${getBaseUrl()}/${slug}`;
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <img
          className="rounded-md border"
          width={1200}
          height={675}
          src={createImageSrc(slug)}
          alt="Congratulations Image"
        />
        <Link
          className={cn(
            buttonVariants({ size: "icon", variant: "outline" }),
            "absolute right-2 top-2 rounded-full md:right-5 md:top-5",
          )}
          href="/"
        >
          <XIcon />
        </Link>
        <ImageDownloadButton imageDataUrl={createImageSrc(slug)} />
      </div>
      <CopyInput value={url} />
      <Link className={buttonVariants()} href="/">
        შექმენი თავიდან <RefreshCw className="ml-1 h-3 w-4" />
      </Link>
    </div>
  );
}
