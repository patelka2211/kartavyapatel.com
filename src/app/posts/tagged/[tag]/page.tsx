import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { loadAllMetadata } from "@/_content/posts/data-loader";
import { cn, usFormattedDate } from "@/lib/utils";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const metadata = await loadAllMetadata();

  const tags = [...new Set(metadata.flatMap(({ tags }) => tags))];

  return tags.map((tag) => {
    return { tag };
  });
}

export default async function Page({ params }: Props) {
  const tag = (await params).tag;

  const postsMetadata = (await loadAllMetadata())
    .filter(({ tags }) => {
      if (tags.includes(tag)) {
        return true;
      }

      return false;
    })
    .sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

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
