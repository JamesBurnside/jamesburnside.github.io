export type PostMetadata = {
  id: string;
  title?: string
  abstract?: string
  dateCreated?: Date
  dateModified?: Date
}

export type SerializedPostMetadata = {
  id: string;
  title?: string
  abstract?: string
  dateCreated?: string
  dateModified?: string
}

export type ParsedPostData = {
  metadata: PostMetadata;
  content: string;
};
