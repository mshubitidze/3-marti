import { redirect } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};
export default async function Page({ params }: PageProps) {
  redirect(`/?slug=${params.slug}`);
}
