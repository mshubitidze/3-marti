import { ImageResponse } from "next/og";
import { getBaseUrl } from "@/lib/utils";
import { getOg } from "./actions";

export const alt = "alt text";
export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const data = await getOg(params.slug);
  const tbcXBlack = fetch(new URL("./TBCX-Black.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div tw="flex w-full h-full text-white items-center justify-end text-3xl flex-col">
        <img
          tw="absolute left-0 top-0"
          src={`${getBaseUrl()}/${data?.design}.png`}
          alt={data?.design}
        />
        <div tw="flex items-center rounded-lg m-10 p-5 bg-black/50 text-center">
          {data?.message}
        </div>
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
