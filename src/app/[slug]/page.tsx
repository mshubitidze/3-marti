import { buttonVariants } from "@/components/ui/button";
import { cn, createOgImageSrc, getBaseUrl } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CopyInput } from "./_components/copy-input";
import { ImageDownloadButton } from "./_components/download-button";
import { Share } from "./_components/share";
import { getOg } from "./actions";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const data = await getOg(slug);
  const url = `${getBaseUrl()}/${slug}`;
  return (
    <main className="container mx-auto flex min-h-[calc(100dvh-9rem)] flex-col justify-around">
      <div className="flex flex-col items-center gap-2">
        <CopyInput value={url} />
        <Share
          title={"3 მარტი"}
          text={data?.message ?? "მისალოცი ბარათი"}
          url={url}
        />
        <div className="relative mx-auto h-auto w-full max-w-4xl">
          <img
            className="rounded-md border"
            width={1200}
            height={630}
            src={createOgImageSrc(slug)}
            alt="Congratulations Image"
          />
          <ImageDownloadButton
            imageDataUrl={createOgImageSrc(slug)}
            name={data?.message}
          />
        </div>
        <Link className={cn(buttonVariants(), "mt-2")} href="/">
          შექმენი თავიდან <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
