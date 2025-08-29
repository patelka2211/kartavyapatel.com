import { readFileSync } from "node:fs";
import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { loadAllMetadata, parseMdx } from "@/_content/posts/data-loader";
import { getOgImage } from "@/lib/utils";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await loadAllMetadata()).map(({ slug }) => {
    return { slug };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const metadata = (await loadAllMetadata()).find(
    (metadata) => metadata.slug === slug,
  );

  if (!metadata) {
    return {
      title: "Page Not Found",
    };
  }

  const { excerpt, tags, og } = metadata;

  const title = `${metadata.title} - Posts`;

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

  const metadata = (await loadAllMetadata()).find(
    (metadata) => metadata.slug === slug,
  );

  if (metadata) {
    const { fullFilePath, title } = metadata;

    const content = await parseMdx(readFileSync(fullFilePath, "utf-8"));

    const tags = metadata.tags || [];

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
      <>
        <div className="prose prose-neutral dark:prose-invert">
          <h1>{title}</h1>
          {content}
          {tagsContent}
        </div>
        {/* related posts */}
      </>
    );
  }

  return "Page Not found";
}
