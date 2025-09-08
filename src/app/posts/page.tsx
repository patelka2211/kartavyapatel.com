import type { Metadata } from "next";
import Link from "next/link";
import { getLoadAllMetadataFunction } from "@/_content/posts/data-loader";
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
  const postsMetadata = (await getLoadAllMetadataFunction()()).sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;

    return dateB.getTime() - dateA.getTime();
  });

  if (postsMetadata.length === 0) return "Coming soon!";

  return (
    <div className="flex flex-col items-center gap-2">
      {postsMetadata.map(({ date, slug, title, og }, index) => {
        return (
          <div key={slug} className="w-full">
            <Link
              className={cn(
                "w-full",
                "flex flex-col items-center justify-between",
                "border",
                "rounded-md",
                "hover:bg-accent",
                "mb-2",
              )}
              href={`/posts/${slug}`}
            >
              {/** biome-ignore lint/performance/noImgElement: img tag is needed. */}
              <img className="rounded-t-sm" src={`/og-images/${og}`} alt="hi" />
              <div className="w-full flex items-center justify-between p-2">
                <h5>{title}</h5>
                <p>{usFormattedDate(date)}</p>
              </div>
            </Link>
            {index === postsMetadata.length - 1 ? "" : <Separator />}
          </div>
        );
      })}
    </div>
  );
}
