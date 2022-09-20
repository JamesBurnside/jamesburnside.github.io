export type PostMetadata = {
  id: string;
  title: string;
  abstract: string;
  dateCreated: Date;
  dateModified: Date;
  previewImageLink: string;
  heroImageLink: string;
  published: boolean;
}

export type SerializedPostMetadata = {
  id: string;
  title: string;
  abstract: string;
  dateCreated: string;
  dateModified: string;
  previewImageLink: string;
  heroImageLink: string;
  published: boolean;
}

export type ParsedPostData = {
  metadata: PostMetadata;
  content: string;
};
