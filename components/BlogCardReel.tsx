import { Box, Stack } from "@mui/material";
import { SerializedPostMetadata } from "../types/postMetadata";
import { BlogCard } from "./BlogCard";

type BlogCardReelProps = {
  posts: SerializedPostMetadata[];
};

export const BlogCardReel = ({ posts }: BlogCardReelProps): JSX.Element => {
  const groupedPosts = groupByN(3, posts);
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'inline-block'}}>
        {groupedPosts.map((group, i) => (
          <Stack
            direction="row"
            spacing={2}
            key={`reelGroup${i}`}
            mt={i === 0 ? 0 : 2}
          >
            {group.map((post, j) => (
              <BlogCard
                title={post.title}
                abstract={post.abstract}
                link={`/blog/${post.id}`}
                imageLink={post.previewImageLink}
                key={`post.id${i}${j}`}
              />
            ))}
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

function groupByN<T>(n: number, data: T[]): T[][] {
  let result = [];
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  return result;
}
