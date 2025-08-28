import { readFileSync } from "node:fs";
import { join, parse } from "node:path";
import { cwd } from "node:process";
import { globbySync } from "globby";
import { compileMDX } from "next-mdx-remote/rsc";
import slugify from "slugify";
import z, { type ZodError } from "zod";

const fileRoot = join(cwd(), "src/_content/posts/");

function fullFilePathToSlug(fullFilePath: string) {
  return slugify(
    parse(fullFilePath.replace(fileRoot, "").replaceAll("/", "-")).name,
    {
      lower: true,
      trim: true,
    },
  );
}

export const slugsAndFullFilePaths = () =>
  globbySync(`${fileRoot}**/*.mdx`).map((fullFilePath) => {
    return {
      slug: fullFilePathToSlug(fullFilePath),
      fullFilePath: fullFilePath,
    };
  });

export async function getMetadataAndContent(slug: string) {
  const object = slugsAndFullFilePaths().find((value) => slug === value.slug);

  if (object) {
    const fileContent = readFileSync(object.fullFilePath, "utf-8");

    const frontmatterParser = z.object({
      title: z.string(),
      excerpt: z.string().nullish(),
      date: z
        .string()
        .transform((str) => new Date(str))
        .refine((date) => !Number.isNaN(date.getTime()), {
          message: "Invalid date string",
        }),
      published: z.boolean(),
      tags: z.array(z.string()),
      og: z
        .string()
        .default("default.jpg")
        .transform((filePath) => `/og-images/${filePath}`),
    });

    let { content, frontmatter } = await compileMDX<
      z.infer<typeof frontmatterParser>
    >({
      source: fileContent,
      options: { parseFrontmatter: true },
    });

    try {
      frontmatter = frontmatterParser.parse(frontmatter);
    } catch (error) {
      console.error(`error while parsing file: ${object.fullFilePath}`);
      (error as ZodError).issues.forEach(({ path, message }) => {
        console.error(`- ${path.join(", ")}: ${message}`);
      });
      return;
    }

    if (!frontmatter.published) {
      return;
    }

    return { content, frontmatter: { ...frontmatter, published: undefined } };
  }
}
