import localFont from "next/font/local";

export const tbcX = localFont({
  src: [
    {
      path: "./font/TBCX-Black.ttf",
      weight: "900",
      style: "black",
    },
    {
      path: "./font/TBCX-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./font/TBCX-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./font/TBCX-Medium.ttf",
      weight: "600",
      style: "medium",
    },
    {
      path: "./font/TBCX-Regular.ttf",
      weight: "400",
      style: "regular",
    },
  ],
  display: "swap",
});
