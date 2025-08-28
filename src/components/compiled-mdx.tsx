import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";

export default async function Comp(props: MDXRemoteProps) {
  const { content } = await compileMDX({
    source: props.source,
    components: props.components,
    options: props.options,
  });

  return <div className="prose prose-neutral dark:prose-invert">{content}</div>;
}
