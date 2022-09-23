export type PostMetadata = {
  id: string;
  title: string;
  abstract: string;
  dateCreated: Date;
  dateModified: Date;
  previewImageLink: string;
  heroImageLink?: string;
  published: boolean;
  tags?: string[];
}

export type SerializedPostMetadata = {
  id: string;
  title: string;
  abstract: string;
  dateCreated: string;
  dateModified: string;
  previewImageLink: string;
  heroImageLink?: string;
  published: boolean;
  tags?: string[];
}

export type ParsedPostData = {
  metadata: PostMetadata;
  content: string;
};
