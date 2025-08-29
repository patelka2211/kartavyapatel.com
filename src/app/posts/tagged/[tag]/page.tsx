import Link from "next/link";
import { loadAllMetadata } from "@/_content/posts/data-loader";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  const metadata = await loadAllMetadata();

  const tags = [...new Set(metadata.flatMap(({ tags }) => tags))];

  return tags.map((tag) => {
    return { tag };
  });
}

export default function Page({ params: { tag } }: Props) {
  return (
    <div>
      This page has not been implemented yet. It will be available soon. Thank
      you for your cooperation! Meanwhile you can read all posts{" "}
      <Link href={"/posts"}>here</Link>.
    </div>
  );
}
