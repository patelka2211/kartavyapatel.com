import { cn } from "@/lib/utils";

interface Props {
  links: string[];
  overflow?: boolean;
}

export default function RenderSources({ links, overflow }: Props) {
  // https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={url}&size={size}
  return (
    <span
      className={cn(
        "gap-2",
        overflow ? "flex w-full overflow-x-auto" : "inline-flex",
      )}
    >
      {[...new Set(links)].map((link) => (
        <span key={link}>
          <a
            className={cn(
              "px-2 py-1",
              "bg-accent text-accent-foreground",
              "rounded-sm",
            )}
            href={link}
            target="_blank"
          >
            {new URL(link).host.split(".").slice(-2).join(".")}
          </a>
        </span>
      ))}
    </span>
  );
}
