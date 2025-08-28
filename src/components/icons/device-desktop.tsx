import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Page({ className }: HTMLAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      strokeLinejoin="round"
      color="currentcolor"
      data-testid="geist-icon"
      viewBox="0 0 16 16"
      className={cn(className)}
    >
      <title>System</title>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H8.75v3h1.75V16h-5v-1.5h1.75v-3H1a1 1 0 0 1-1-1zm1.5.5V10h13V2.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
