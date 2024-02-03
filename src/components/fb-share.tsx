"use client";

import { Facebook } from "lucide-react";

export function FbShare({ url }: { url: string }) {
  return (
    <a
      className="flex w-fit items-center rounded-lg bg-[#1778f2] px-4 py-2 text-white shadow-md hover:bg-opacity-90"
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Facebook className="mr-2 h-[1.2rem] w-[1.2rem]" />
      <p>Share</p>
    </a>
  );
}
