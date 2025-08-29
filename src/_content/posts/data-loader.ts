import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { globbySync } from "globby";
import memoize from "memoize";
import { compileMDX } from "next-mdx-remote/rsc";
import slugify from "slugify";
import z, { type ZodError } from "zod";
import { usFormattedDate } from "@/lib/utils";

const postsRoot = join(fileURLToPath(import.meta.url), "../");

export const frontmatterParser = z.object({
  title: z.string(),
  excerpt: z.string(),
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

const parseFrontmatter = memoize(async (source: string) => {
  const { frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  try {
    const matter = frontmatterParser.parse(frontmatter);

    if (matter.published === true) {
      return matter;
    }
  } catch (error) {
    ((error: ZodError) => {
      error.issues.forEach(({ path, message }) => {
        path.forEach((value) => {
          console.error(`${message} ${value.toString()}`);
        });
      });
    })(error as ZodError);
  }
});

export const parseMdx = memoize(async (source: string) => {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return content;
});

export const loadAllMetadata = memoize(async () => {
  const fullFilesPaths = globbySync(`${postsRoot}**/*.mdx`);

  const fms = [];

  for (let index = 0; index < fullFilesPaths.length; index++) {
    const fullFilePath = fullFilesPaths[index];

    const source = readFileSync(fullFilePath, "utf-8");

    const fm = await parseFrontmatter(source);

    if (fm) {
      fms.push({ ...fm, fullFilePath });
    } else {
      console.error(`Could not parse frontmatter for file: ${fullFilePath}`);
    }
  }

  const output = fms.map((value) => {
    return {
      ...value,
      slug: slugify(
        `${value.title}-${usFormattedDate(value.date)}`.replaceAll("/", "-"),
        { trim: true, lower: true },
      ),
    };
  });

  return output;
});
