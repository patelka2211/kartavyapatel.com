import { readFileSync } from "node:fs";
import type { Metadata } from "next";
import Link from "next/link";
import type z from "zod";
import {
  type frontmatterParser,
  loadAllMetadata,
} from "@/_content/posts/data-loader";
import CompiledMdx from "@/components/compiled-mdx";
import { getOgImage, usFormattedDate } from "@/lib/utils";

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

async function RelatedPosts({
  tags,
  params,
}: Pick<z.infer<typeof frontmatterParser>, "tags"> & Props) {
  const metadatas = await loadAllMetadata();

  const slug = (await params).slug;

  const filtered = metadatas
    .filter((metadata) => {
      if (slug === metadata.slug) {
        return false;
      }

      let itIncludes = false;

      for (let index = 0; index < tags.length; index++) {
        const tag = tags[index];

        itIncludes = metadata.tags.includes(tag);

        if (itIncludes) {
          break;
        }
      }

      return itIncludes;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (filtered.length === 0) {
    return;
  }

  return (
    <CompiledMdx
      source={`---
###### Related Posts

${filtered
  .map(({ title, slug }) => `- <Link href="/posts/${slug}">${title}</Link>`)
  .join("\n")}
`}
      components={{ Link }}
    />
  );
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;

  const metadata = (await loadAllMetadata()).find(
    (metadata) => metadata.slug === slug,
  );

  if (metadata) {
    return (
      <article className="prose prose-neutral dark:prose-invert">
        <CompiledMdx
          source={`# ${metadata.title}
            
            > ${metadata.excerpt}

            > Published: ${usFormattedDate(metadata.date)}

            ---
            `}
        />
        <CompiledMdx
          source={readFileSync(metadata.fullFilePath, "utf-8")}
          options={{ parseFrontmatter: true }}
        />
        <RelatedPosts params={params} tags={metadata.tags} />
      </article>
    );
  }

  return "Page Not found";
}
