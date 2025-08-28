import Link from "next/link";
import {
  getMetadataAndContent,
  slugsAndFullFilePaths,
} from "../../_data-loader";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  const posts = slugsAndFullFilePaths();

  const tags: string[] = [];

  for (const { slug } of posts) {
    const output = await getMetadataAndContent(slug);

    if (output) {
      output.frontmatter.tags?.forEach((tag) => {
        if (tags.includes(tag)) {
          return;
        }

        tags.push(tag);
      });
    }
  }

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
