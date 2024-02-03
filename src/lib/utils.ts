import { type ClassValue, clsx } from "clsx";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.PROD_URL) return `https://${process.env.PROD_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function handleParamChange(
  e: React.ChangeEvent<HTMLInputElement>,
  searchParams: URLSearchParams,
  router: AppRouterInstance,
  pathname: string,
  key: "design" | "message",
) {
  const params = new URLSearchParams(searchParams);
  const errorsParam = searchParams.get("errors")?.toString();
  if (errorsParam) {
    params.delete("errors");
    const obj = JSON.parse(decodeURIComponent(errorsParam)) as Record<
      string,
      string
    >;
    delete obj[key];
    if (Object.keys(obj).length === 0) {
      params.delete("errors");
    } else {
      params.set("errors", encodeURIComponent(JSON.stringify(obj)));
    }
  }
  const value = e.target.value;
  if (value) {
    params.set(key, encodeURIComponent(value));
  } else {
    params.delete(key);
  }
  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
}

export function createImageSrc(slug: string) {
  return `${getBaseUrl()}/${slug}/opengraph-image`;
}
