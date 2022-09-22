import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useRef } from 'react';
import { SerializedPostMetadata } from "../types/postMetadata";
import { useElementWidth } from '../utils/useElementWidth';
import { BlogCard } from "./BlogCard";

type BlogCardReelProps = {
  posts: SerializedPostMetadata[];
};

export const BlogCardReel = ({ posts }: BlogCardReelProps): JSX.Element => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridCardRef = useRef<HTMLDivElement>(null);
  const gridWidth = useElementWidth(gridContainerRef);
  const cardWidth = useElementWidth(gridCardRef);
  const gridSpacing = 2;
  const gridMargin = gridWidth && cardWidth && getGridMarginPX(gridWidth, cardWidth+gridSpacing*8);

  return (
    <Box ref={gridContainerRef}>
      <Grid container spacing={gridSpacing} sx={{ marginLeft: `${gridMargin}px` }}>
        {posts.map((post, i) => (
          <Grid key={`blogReelPost${i}`} ref={i=== 0 ? gridCardRef : undefined}>
            <BlogCard
              title={post.title}
              abstract={post.abstract}
              link={`/blog/${post.id}`}
              imageLink={post.previewImageLink}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const getGridMarginPX = (gridWidthInPixels: number, gridCardWidth: number): number => {
  const CONTAINER_PADDING = 24;
  const blogCardWidth = gridCardWidth;
  const spaceNotFilledUsedByCards = gridWidthInPixels % blogCardWidth;

  const gridContainerWidth = gridWidthInPixels - CONTAINER_PADDING;
  const noOfCards = Math.floor(gridContainerWidth / blogCardWidth);
  if (noOfCards === 0) return 0;

  return spaceNotFilledUsedByCards / 2;
}