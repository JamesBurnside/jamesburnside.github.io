import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ParsedPostData, PostMetadata } from "../types/postMetadata";

const POSTS_DIR = path.join(process.cwd(), "posts");
const MDX_FILE_EXTENSION = ".mdx";

const getFileId = (parsedFile: path.ParsedPath): string => parsedFile.name;
const isMarkdownFile = (parsedFile: path.ParsedPath): boolean => parsedFile.ext == MDX_FILE_EXTENSION;
const getAllFilesInDirectory = (postsDirectory: string): path.ParsedPath[] => fs.readdirSync(postsDirectory).map(path.parse);
const getAllMdxFiles = (): path.ParsedPath[] => getAllFilesInDirectory(POSTS_DIR).filter(isMarkdownFile);
const getMdxFile = (id: string): path.ParsedPath | undefined => getAllMdxFiles().find((file) => getFileId(file) == id);
const getFileContent = (file: path.ParsedPath) => {
  const content = matter(fs.readFileSync(path.join(POSTS_DIR, file.base), "utf8"));
  return {
    ...content,
    data: {
      ...content.data,
      id: getFileId(file),
    } as PostMetadata,
  };
}

/**
 * Get the Ids of all posts in the posts directory.
 */
export const getAllPostIds = () => getAllMdxFiles().map(getFileId);

/**
 * Get the full metadata of all posts in the posts directory.
 * @returns PostMetadata[] that is sorted by dateModified descending.
 */
export const getPostsMetadata = (): PostMetadata[] => getAllMdxFiles()
  .map(getFileContent)
  .map((parsedContent) => parsedContent.data)
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime());

/**
 * Get the full metadata and content of a post in the posts directory
 */
export const getPostData = (id: string): ParsedPostData => {
  const file = getMdxFile(id);
  if (!file) {
    throw new Error(`Could not find post with id ${id}`);
  }
  const allContents = getFileContent(file);
  return {
    content: allContents.content,
    metadata: allContents.data,
  };
}
