import type { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { getPostsMetadata } from "../lib/getPosts";
import { SerializedPostMetadata } from "../types/postMetadata";
import { postMetadataToSerializablePostMetadata } from "../utils/convert";

type HomeProps = {
  posts: SerializedPostMetadata[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.map((metadata) => {
        return (
          <div key={metadata.id}>
            <h2 className="post-title">{metadata.title}</h2>
            <p className="post-abstract">{metadata.abstract}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const postsMetadata = getPostsMetadata().map(postMetadataToSerializablePostMetadata);
  return {
    props: {
      posts: postsMetadata,
    },
  };
}
