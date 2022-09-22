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
        <meta name="description" content="Blogs posts by James Burnside" />
        <meta property="og:title" content="James Burnside Blog Site" />
        <meta property="og:description" content="Blog posts by James Burnside" />
        <meta name="google-site-verification" content="80GAIAWS24DM0Ms_2FRXohAy_cXAVvy3v_QMUs9gYeQ" />
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
  title: "Test Page",
  abstract:
    "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  dateCreated: "2021-10-01",
  dateModified: "2021-10-01",
  previewImageLink: "images/lizard.jpeg",
});
