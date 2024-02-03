import { db } from "@/server/db";
import { messages } from "@/server/db/schema";
import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { getBaseUrl } from "@/lib/utils";

export const alt = "alt text";
export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const [data] = await db
    .select()
    .from(messages)
    .where(eq(messages.slug, params.slug));

  const tbcXBlack = fetch(new URL("./TBCX-Black.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div tw="flex w-full h-full text-white items-center justify-center text-6xl flex-col">
        <img
          tw="absolute left-0 top-0"
          src={`${getBaseUrl()}/${data?.design}.png`}
          alt={data?.design}
        />
        <p tw="rounded text-center mx-10 p-5 bg-black/50">{data?.message}</p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "TBCX-Black",
          data: await tbcXBlack,
          style: "normal",
          weight: 900,
        },
      ],
    },
  );
}
