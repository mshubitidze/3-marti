import { buttonVariants } from "@/components/ui/button";
import { ImageDownloadButton } from "./download-button";
import { cn, createImageSrc, getBaseUrl } from "@/lib/utils";
import Link from "next/link";
import { RefreshCw, XIcon } from "lucide-react";
import { CopyInput } from "./copy-input";

export async function RenderDesign({ slug }: { slug: string }) {
  const url = `${getBaseUrl()}/${slug}`;
  return (
    <div className="flex flex-col items-center gap-2">
      <CopyInput value={url} />
      <a href="fb-messenger://share/?link= https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Freference%2Fsend-dialog&app_id=123456789">
        Send In Messenger
      </a>
      <div
        className="fb-share-button"
        data-href="https://developers.facebook.com/docs/plugins/"
        data-layout=""
        data-size=""
      >
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
          className="fb-xfbml-parse-ignore"
        >
          Share
        </a>
      </div>
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
            "absolute right-3 top-3 rounded-full md:right-5 md:top-5 md:min-h-14 md:min-w-14",
          )}
          href="/"
        >
          <XIcon className="h-4 w-4 md:h-8 md:w-8" />
        </Link>
        <ImageDownloadButton imageDataUrl={createImageSrc(slug)} />
      </div>
      <Link className={cn(buttonVariants(), "mt-2")} href="/">
        შექმენი თავიდან <RefreshCw className="ml-1 h-3 w-4" />
      </Link>
    </div>
  );
}
