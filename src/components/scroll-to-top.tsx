"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: run useEffect only when pathname changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
    }, 1000);
  }, [pathname]);

  return "";
}
