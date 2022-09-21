import { Stack, Typography } from "@mui/material";
import { PostShareTray } from "./PostShareTray";

type PostMetadataHeadingProps = {
  postDate: string;
};

export const PostMetadataHeading = (
  props: PostMetadataHeadingProps
): JSX.Element => (
  <Stack direction="row" spacing={2} alignItems="center" mt={4}>
    <Stack spacing={1}>
      <Typography sx={{ fontWeight: "semibold" }}>{props.postDate}</Typography>
    </Stack>
    <PostShareTray />
  </Stack>
);
