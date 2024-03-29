"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function ImageDownloadButton({
  imageDataUrl,
  name,
}: {
  imageDataUrl: string;
  name?: string;
}) {
  function handleDownload() {
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = name
      ? name.trim().split(" ").join("-") + ".png"
      : "congratulations.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Button
      size="icon"
      variant="outline"
      className="absolute right-3 top-3 md:right-5 md:top-5 md:min-h-14 md:min-w-14"
      onClick={handleDownload}
    >
      <DownloadIcon className="h-4 w-4 md:h-8 md:w-8" />
    </Button>
  );
}
