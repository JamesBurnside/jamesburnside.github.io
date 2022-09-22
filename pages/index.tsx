import type { GetStaticProps, NextPage } from "next";
import { getPostsMetadata } from "../lib/getPosts";
import { SerializedPostMetadata } from "../types/postMetadata";
import { postMetadataToSerializablePostMetadata } from "../utils/convert";
import { Container } from "@mui/material";
import { BlogCardReel } from "../components/BlogCardReel";
import { Hero } from "../components/Hero";
import Head from "next/head";

type HomeProps = {
  posts: SerializedPostMetadata[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Container>
      <Head>
        <title>{`Home | jamesburnside.github.io`}</title>
      </Head>
      <Hero />
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
    props: {
      posts: [...postsMetadata, ...testPosts],
    },
  };
};

const testPosts: SerializedPostMetadata[] = Array(5).fill({
  id: "test",
  title: "Lizard",
  abstract:
    "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  dateCreated: "2021-10-01",
  dateModified: "2021-10-01",
  previewImageLink: "images/lizard.jpeg",
});
