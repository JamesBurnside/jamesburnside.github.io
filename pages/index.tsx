import type { GetStaticProps, NextPage } from "next";
import { getPostsMetadata } from "../lib/getPosts";
import { SerializedPostMetadata } from "../types/postMetadata";
import { postMetadataToSerializablePostMetadata } from "../utils/convert";
import { BlogCard } from "../components/BlogCard";
import { Container } from "@mui/material";

type HomeProps = {
  posts: SerializedPostMetadata[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Container>
      {posts.map((metadata) => {
        return (
          <BlogCard title={metadata.title} abstract={metadata.abstract} link={`/blog/${metadata.id}`} key={metadata.id} />
        );
      })}
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const postsMetadata = getPostsMetadata().map(
    postMetadataToSerializablePostMetadata
  );
  return {
    props: {
      posts: postsMetadata,
    },
  };
};
