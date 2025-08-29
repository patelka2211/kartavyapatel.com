import type { Metadata } from "next";
import Link from "next/link";
import { loadAllMetadata } from "@/_content/posts/data-loader";
import { Separator } from "@/components/ui/separator";
import { cn, getOgImage, usFormattedDate } from "@/lib/utils";

const pageTitle = "Posts";
const pageDescription = "Posts by Kartavya Patel";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: getOgImage("default.jpg"),
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: { icon: "/favicon.ico" },
};

export default async function Page() {
  let postsMetadata = await loadAllMetadata();

  postsMetadata = postsMetadata.sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;

    return dateB.getTime() - dateA.getTime();
  });

  if (postsMetadata.length === 0) return "Coming soon!";

  return (
    <div className="flex flex-col items-center gap-2">
      {postsMetadata.map(({ date, slug, title }) => {
        return (
          <div key={slug} className="w-full">
            <Link
              className={cn("w-full", "flex items-center justify-between")}
              href={`/posts/${slug}`}
            >
              <h5>{title}</h5>
              <p>{usFormattedDate(date)}</p>
            </Link>
            <Separator />
          </div>
        );
      })}
    </div>
  );
}
