import { createClient } from "contentful";
import type { ReactElement } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { IBlogsFields } from "../../@types/generated/contentful";
import Skeleton from "../../src/components/Skeleton";
import { Box } from "@mui/material";
import Head from "next/head";
import PageBanner from "../../src/components/PageBanner";
import MainLayout from "../../src/components/layouts/MainLayout";

interface Props {
  blogs: IBlogsFields[];
}

let space: any = process.env.CONTENTFUL_SPACE_ID;
let accessToken: any = process.env.CONTENTFUL_ACCESS_TOKEN;
const client = createClient({
  space,
  accessToken,
});
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "blogs",
  });
  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
export async function getStaticProps({ params }: any) {
  const { items } = await client.getEntries({
    content_type: "blogs",
    "fields.slug": params.slug,
  });
  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      blog: items[0],
    },
    revalidate: 1, //revalidate atmost every 1 second
  };
}

export default function BlogPage({ blog }: any) {
  if (!blog) return <Skeleton />;
  const { featuredImage, title, description, body } = blog.fields;

  return (
    <Box sx={{ width: "100%" }}>
      <Head>
        <title>My Cart - Maima</title>
        <meta name="description" content="my maima checkout page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title={title} />
      <Box
        component="div"
        sx={{
          width: { xs: "90%" },
          m: "30px auto 0",
        }}
      >
        <Box
          component="div"
          sx={{
            width: { xs: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={"https:" + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
            layout="fixed"
          />
        </Box>
        <Box
          component="h6"
          sx={{
            width: "100%",
            font: "normal normal 500 18px/30px Poppins, sans-serif",
          }}
        >
          {documentToReactComponents(description)}
        </Box>
        <Box
          component="p"
          sx={{
            width: "100%",
            font: "normal normal 400 14px/30px Poppins, sans-serif",
          }}
        >
          {documentToReactComponents(body)}
        </Box>
      </Box>
    </Box>
  );
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
