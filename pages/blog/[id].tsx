import { getAllPostIds, getPostData } from "../../lib/getPosts";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { postMetadataToSerializablePostMetadata } from "../../utils/convert";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Box, Container } from "@mui/material";
import Head from "next/head";
import { HEADER_HEIGHT_REM } from "../../components/Header";
import { FOOTER_HEIGHT_REM, FOOTER_MARGIN_TOP_REM } from "../../components/Footer";
import { PostMetadataHeading } from "../../components/PostMetadataHeading";
import remarkGfm from 'remark-gfm';
import { markdownComponents } from "../../components/MarkdownComponents";

const H1_MARGIN_TOP_REM = 2;
const MIN_BODY_HEIGHT_REDUCTIONS = HEADER_HEIGHT_REM+FOOTER_HEIGHT_REM+FOOTER_MARGIN_TOP_REM+H1_MARGIN_TOP_REM;

export const Blog = ({
  postMetadata,
  postContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <Head>
        <title>{`${postMetadata.title} | jamesburnside.github.io`}</title>
        <meta name="description" content={postMetadata.abstract} />
        <meta property="og:title" content={postMetadata.title} />
        <meta property="og:description" content={postMetadata.abstract} />
        <meta property="og:image" content={postMetadata.previewImage} />
      </Head>
      <Box sx={{ minHeight: `calc(100vh - ${MIN_BODY_HEIGHT_REDUCTIONS}rem)` }} className="blog-content">
        <PostMetadataHeading postDate={(new Date(postMetadata.dateModified)).toDateString()} />
        <MDXRemote {...postContent} components={markdownComponents} />
      </Box>
    </Container>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds().map((id) => ({
    params: {
      id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || params.id instanceof Array) {
    throw new Error(`Invalid params id: ${params?.id}`);
  }

  const postData = getPostData(params.id);
  return {
    props: {
      postMetadata: postMetadataToSerializablePostMetadata(postData.metadata),
      postContent: await serialize(postData.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        }
      }),
      id: params.id,
    },
  };
};
