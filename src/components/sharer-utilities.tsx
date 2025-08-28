"use client";
import Script from "next/script";

export default function Page() {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/gh/patelka2211/dynamic-colors@1.1.5/DynamicColors.js" />
      <Script src="https://cdn.jsdelivr.net/gh/patelka2211/dominar@1.2.4/Dominar.js" />
      <Script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js" />
      <Script src="https://cdn.jsdelivr.net/gh/patelka2211/sharer@1.0.0/Sharer.js" />
      <Script
        defer
        id="sharer-utility-js"
        className="set-color-2596d1"
        src="https://cdn.jsdelivr.net/gh/patelka2211/sharer@1.0.0/utility.js"
      />
    </>
  );
}
