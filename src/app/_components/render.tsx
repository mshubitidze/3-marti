import { buttonVariants } from "@/components/ui/button";
import { ImageDownloadButton } from "./download-button";
import { cn, getBaseUrl } from "@/lib/utils";
import Link from "next/link";
import { RefreshCw, XIcon } from "lucide-react";
import { CopyInput } from "./copy-input";

export async function RenderDesign({ slug }: { slug: string }) {
  const url = `${getBaseUrl()}/${slug}`;
  const src = `${url}/opengraph-image`;
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <img
          width={1200}
          height={630}
          className="rounded-md border"
          src={src}
          alt="image"
        />
        <Link
          className={cn(
            buttonVariants({ size: "icon", variant: "outline" }),
            "absolute right-5 top-5 rounded-full",
          )}
          href="/"
        >
          <XIcon />
        </Link>
        <ImageDownloadButton imageDataUrl={src} />
      </div>
      <CopyInput value={url} />
      <Link className={buttonVariants()} href="/">
        შექმენი თავიდან <RefreshCw className="ml-2 h-[1rem] w-[1rem]" />
      </Link>
    </div>
  );
}
