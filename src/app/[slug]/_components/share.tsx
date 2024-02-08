"use client";

import { Button } from "@/components/ui/button";
import useShare from "@/lib/hooks/use-share";

export function Share({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const { share, isSupported } = useShare({
    onShare: (content) => {
      console.log("onShare", content);
    },
    onSuccess: (content) => {
      console.log("onSuccess", content);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const handleShare = async () => {
    await share({
      title,
      text,
      url,
    });
  };

  if (!isSupported) return null;

  return (
    <Button disabled={!isSupported} onClick={handleShare}>
      Share
    </Button>
  );
}
