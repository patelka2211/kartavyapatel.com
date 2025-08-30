import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";

export default async function CompiledMdx(props: MDXRemoteProps) {
  const { content } = await compileMDX({
    source: props.source,
    components: props.components,
    options: {
      ...props.options,
      parseFrontmatter: true,
    },
  });

  return content;
}
