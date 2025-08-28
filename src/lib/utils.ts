import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cdnLocation =
  "https://cdn.jsdelivr.net/gh/patelka2211/kartavyapatel.com.github.io@latest/";

export function getOgImage(fileName: string) {
  return `og-images/${fileName}`;
}

export function usFormattedDate(date: Date) {
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}
