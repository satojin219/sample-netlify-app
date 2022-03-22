import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import dayjs from "dayjs";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        post: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(title: string) {
  const fullPath = path.join(postsDirectory, `${title}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const formatedDate = dayjs(matterResult.data.date.toString()).format(
    "YYYY-MM-DD"
  );
  console.log(typeof contentHtml);
  return {
    title,
    contentHtml,
    ...matterResult.data,
    date: formatedDate,
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const formatedDate = dayjs(matterResult.data.date.toString()).format(
      "YYYY-MM-DD"
    );
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      date: formatedDate,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
