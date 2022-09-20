import { getAllPostsPath, getPostData } from "../../lib/getPosts";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { postMetadataToSerializablePostMetadata } from "../../utils/convert";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { TestComponent } from "../../components/testComponent";
import { Container } from "@mui/material";
import HighlightedCode from "../../components/HighlightedCode";

const components = {
  TestComponent,
  code: HighlightedCode
};

export const Blog = ({
  postMetadata,
  postContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      {/* <div className="blog-metadata">{postMetadata}</div> */}
      <div className="blog-content">
        <MDXRemote {...postContent} components={components} />
      </div>
    </Container>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsPath();
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
      postContent: await serialize(postData.content),
      id: params.id,
    },
  };
};
