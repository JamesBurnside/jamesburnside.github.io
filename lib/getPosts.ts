import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ParsedPostData, PostMetadata } from "../types/postMetadata";

const POSTS_DIR = path.join(process.cwd(), "posts");
const MDX_FILE_EXTENSION = ".mdx";

function getAllFilesInDirectory(postsDirectory: string): path.ParsedPath[] {
  return fs.readdirSync(postsDirectory).map(path.parse);
}

function getAllMdxFiles(): path.ParsedPath[] {
  const allFiles = getAllFilesInDirectory(POSTS_DIR);
  return allFiles.filter((parsedFile) => parsedFile.ext == MDX_FILE_EXTENSION);
}

export function getAllPostsPath() {
  const allMdxFiles = getAllMdxFiles();
  return allMdxFiles.map((parsedFile) => ({
    params: {
      id: parsedFile.name,
    },
  }));
}

export function getPostsMetadata(): PostMetadata[] {
  const allMdxFiles = getAllMdxFiles();

  const postsMetadata = allMdxFiles.map((parsedFile) => {
    const fullPath = path.join(POSTS_DIR, parsedFile.base);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: metadata } = matter(fileContents);
    metadata['id'] = parsedFile.name;
    return metadata as PostMetadata;
  });
  return postsMetadata;
}

export function getPostData(id: string): ParsedPostData {
  const fullPath = path.join(POSTS_DIR, id + MDX_FILE_EXTENSION);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: metadata, content } = matter(fileContents);
  metadata['id'] = id;
  return { metadata, content } as ParsedPostData;
}
