"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function ImageDownloadButton({
  imageDataUrl,
}: {
  imageDataUrl: string;
}) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className="absolute right-5 top-16"
      onClick={handleDownload}
    >
      <DownloadIcon />
    </Button>
  );
}
