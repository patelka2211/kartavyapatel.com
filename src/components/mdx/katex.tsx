import { renderToString } from "katex";

interface Props {
  tex: string;
}

export default async function RenderKatex({ tex }: Props) {
  return (
    <span
      className="px-2 py-1 bg-accent rounded-sm"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Allow it to render katex.
      dangerouslySetInnerHTML={{
        __html: renderToString(tex, { output: "html" }),
      }}
    ></span>
  );
}
