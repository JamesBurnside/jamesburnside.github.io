import type { PostMetadata, SerializedPostMetadata } from "../types/postMetadata";

export const postMetadataToSerializablePostMetadata = (post: PostMetadata): SerializedPostMetadata => ({
  ...post,
  dateCreated: post.dateCreated?.toISOString(),
  dateModified: post.dateModified?.toISOString(),
});
