import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { IBlogs, IBlogsFields } from "../../@types/generated/contentful";

interface Props {
  blogs: IBlogsFields[];
}
export default function BlogSectionCard({ blogs }: Props) {
  // const { title, slug, readTime, thumbnail, description } = blogs.fields;
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        background: "#FFFFFF",
        p: "100px 800x",
        m: "100px 0",
      }}
    >
      <Box
        component="div"
        sx={{
          width: { xs: "100%" },
          m: "30px auto",
          p: "20px 80px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Quicksand",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: 35,
                lineHeight: 1.8,
                color: "#282828",
                padding: "10px 14px",
                textTransform: "capitalize",
                m: "10px 0 0",
              }}
            >
              {" "}
              Blog
            </Typography>
          </Grid>
          {blogs.map((blog: any) => (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={blog.sys.id}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    component="div"
                    sx={{
                      width: "100%",
                      mr: 2,
                    }}
                  >
                    <Image
                      src={"https:" + blog.fields.thumbnail.fields.file.url}
                      alt="blog image thumnail"
                      // width={
                      //   blog.fields.thumbnail.fields.file.details.image.width
                      // }
                      // height={
                      //   blog.fields.thumbnail.fields.file.details.image.height
                      // }
                      // layout="intrinsic"
                      width={700}
                      height={550}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: { xs: 12, sm: 14, lg: 18 },
                      lineHeight: 1.6,
                      color: "#282828",
                      display: "flex",
                      alignItems: "center",
                      mixBlendMode: "normal",
                    }}
                  >
                    {blog.fields.title}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: { xs: 12, sm: 14, lg: 15 },
                      lineHeight: 1.6,
                      color: "#282828",
                      display: "flex",
                      alignItems: "center",
                      mixBlendMode: "normal",
                    }}
                  >
                    {documentToReactComponents(blog.fields.description)}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: 12,
                      lineHeight: 1.4,
                      color: "#EA3973",
                      display: "flex",
                      alignItems: "center",
                      mixBlendMode: "normal",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    <Link href={"/blogs/" + blog.fields.slug}>
                      <a>Read in {blog.fields.readTime} minutes</a>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
