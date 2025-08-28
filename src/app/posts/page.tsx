import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn, getOgImage, usFormattedDate } from "@/lib/utils";
import { getMetadataAndContent, slugsAndFullFilePaths } from "./_data-loader";

const title = "Posts";
const description = "Posts by Kartavya Patel";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: getOgImage("default.jpg"),
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: { icon: "/favicon.ico" },
};

export default async function Page() {
  let posts = [];

  for await (const { slug } of slugsAndFullFilePaths()) {
    const object = await getMetadataAndContent(slug);

    if (object) {
      posts.push({ slug, ...object });
    }
  }

  posts = posts.sort((a, b) => {
    const dateA = a.frontmatter.date;
    const dateB = b.frontmatter.date;

    return dateB.getTime() - dateA.getTime();
  });

  if (posts.length === 0) return "Coming soon!";

  return (
    <div className="flex flex-col items-center gap-2">
      {posts.map((post) => {
        if (post) {
          const { title, date } = post.frontmatter;

          return (
            <div key={post.slug} className="w-full">
              <Link
                className={cn("w-full", "flex items-center justify-between")}
                href={`/posts/${post.slug}`}
              >
                <h5>{title}</h5>
                <p>{usFormattedDate(date)}</p>
              </Link>
              <Separator />
            </div>
          );
        }
        return "";
      })}
    </div>
  );
}
