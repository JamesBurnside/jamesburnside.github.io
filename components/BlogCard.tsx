import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

type BlogCardProps = {
  title: string;
  abstract: string;
  imageLink: string;
  link: string;
};

export const BlogCard = ({
  title,
  abstract,
  link,
  imageLink,
}: BlogCardProps) => {
  return (
    <Link href={link ?? ""} passHref>
      <a aria-label={`Blog post about ${title}`}>
        <Card sx={{ maxWidth: '345px', minWidth: '230px', height: '100%' }}>
          <CardActionArea
            sx={{
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={imageLink}
              alt={"Blog Card Image"}
              role="presentation"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {abstract}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};
