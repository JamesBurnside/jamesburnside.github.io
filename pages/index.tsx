import type { GetStaticProps, NextPage } from "next";
import { getPostsMetadata } from "../lib/getPosts";
import { SerializedPostMetadata } from "../types/postMetadata";
import { postMetadataToSerializablePostMetadata } from "../utils/convert";
import { Container } from "@mui/material";
import { BlogCardReel } from "../components/BlogCardReel";

type HomeProps = {
  posts: SerializedPostMetadata[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Container>
      <BlogCardReel posts={posts} />
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const postsMetadata = getPostsMetadata().map(
    postMetadataToSerializablePostMetadata
  );
  return {
    // props: {
    //   posts: postsMetadata,
    // },
    props: testProps
  };
};

const testProps: HomeProps = {
  posts: Array(20).fill([
    {
      id: "test",
      title: "Test",
      abstract: "Test",
      dateCreated: "2021-10-01",
      dateModified: "2021-10-01",
    }
  ])
};