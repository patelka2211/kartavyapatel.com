import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getOgImage } from "@/lib/utils";
import { getMetadataAndContent, slugsAndFullFilePaths } from "../_data-loader";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return slugsAndFullFilePaths().map(({ slug }) => {
    return { slug };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const object = await getMetadataAndContent(slug);

  if (!object) {
    return {
      title: "Page Not Found",
    };
  }

  const { excerpt, tags, og } = object.frontmatter;

  const title = `${object.frontmatter.title} - Posts`;

  return {
    title,
    description: excerpt,
    keywords: tags,
    openGraph: {
      title,
      description: excerpt || undefined,
      images: getOgImage(og),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - kartavyapatel.com`,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;

  const object = await getMetadataAndContent(slug);

  if (object) {
    const { content, frontmatter } = object;

    const tags = frontmatter.tags || [];

    const { content: tagsContent } = await compileMDX({
      source:
        tags.length === 0
          ? ""
          : `---\n#### Related Tags${tags
              .map(
                (tag) =>
                  `\n- <Link href={'/posts/tagged/${tag}'}>#${tag}</Link>`,
              )
              .join("")}`,
      components: {
        Link,
      },
    });

    return (
      <div className="prose prose-neutral dark:prose-invert">
        <h1>{frontmatter.title}</h1>
        {content}
        <br />
        {tagsContent}
      </div>
    );
  }

  return "Page Not found";
}
