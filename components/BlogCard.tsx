import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

type BlogCardProps = {
  title?: string;
  abstract?: string;
  imageLink?: string;
  imageAlt?: string;
  link?: string;
};

export const BlogCard = ({ title, abstract, link, imageLink, imageAlt }: BlogCardProps) => {
  return (
    <Link href={link ?? ''}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageLink}
            alt={imageAlt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title || "Lizard"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {abstract ||
                "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
