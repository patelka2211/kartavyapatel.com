"use client";

import { useEffect } from "react";
import LogoLinkedIn from "@/components/icons/logo-linkedin";

export default function Page() {
  const url = "https://linkedin.com/in/kartavyapatel";

  useEffect(() => {
    window.open(url, "_blank");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[23%] m-auto mt-10 mb-5">
        <LogoLinkedIn className="w-[61%] m-auto" />
      </div>
      <p>Redirecting you to my LinkedIn...</p>
      <span className="flex flex-row gap-2">
        <p className="opacity-55">or</p>
        <a
          className="text-blue-400 underline decoration-dotted"
          href={url}
          target={"_blank"}
        >
          click here to visit manually
        </a>
      </span>
    </div>
  );
}
