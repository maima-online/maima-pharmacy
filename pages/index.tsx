import { Box, Grid, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { createClient } from "contentful";
import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { IBlogsFields } from "../@types/generated/contentful";
import AnemiaTab from "../src/components/AnemiaTab";
import AntibacterialTab from "../src/components/AntibacterialTab";
import AntibioticTab from "../src/components/AntibioticTab";
import AntimalerialTab from "../src/components/AntimalerialTab";
import BlogSectionCard from "../src/components/BlogCardSection";
import FaqsSectionCard from "../src/components/FAQsCardSection";
import AnemiaSectionCard from "../src/components/home/AnemiaSectioCard";
import AntibacterialSectionCard from "../src/components/home/AntibacterialSectionCard";
import AntibioticSectionCard from "../src/components/home/AntibioticCardSection";
import AntimaleriaSectionCard from "../src/components/home/AntimaleriaSectionCard";
import Slider from "../src/components/home/Slider";
import MainLayout from "../src/components/layouts/MainLayout";
import PrescriptionSectionCard from "../src/components/PrescriptionCardSection";
import { containerPadding } from "../utils/constants/global/globalStyling";
import {
  CancelButton,
  DeleteButton,
  Fab,
  SubmitButton,
} from "../src/components/form/buttons";
import { Edit } from "@mui/icons-material";
import {
  CheckBox,
  OutlinedSearch,
  Search,
  Select,
  TextArea,
  TextField,
} from "../src/components/form/textFields";

interface Props {
  blogs: IBlogsFields[];
}

let space: any = process.env.CONTENTFUL_SPACE_ID;
let accessToken: any = process.env.CONTENTFUL_ACCESS_TOKEN;
const client = createClient({
  space,
  accessToken,
});
export const getStaticProps: GetStaticProps = async () => {
  const { items } = await client.getEntries<Props>({
    content_type: "blogs",
  });
  return {
    props: {
      blogs: items,
    },
    revalidate: 1,
  };
};

export default function HomePage({ blogs }: Props) {
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("");

  const inputRef = React.useRef({ value: "" });
  const router = useRouter();
  // const { data, status } = useSession();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    inputRef.current.value &&
      router.push(`/products/?name=${inputRef.current.value}`);
  };
  const images = [
    {
      src: "/images/sliderBg.png",
      name: "sliderbg",
    },
    {
      src: "/images/celena.webp",
      name: "slider1",
      width: "340",
      height: "160",
    },
    {
      src: "/images/BambiPant.webp",
      name: "slider2",
    },
  ];
  const secondimages = [
    {
      src: "/images/Skin.webp",
      name: "antibiotic picture",
    },
    {
      src: "/images/Korea.webp",
      name: "slider1",
    },
  ];
  return (
    <div>
      <Head>
        <title>Home - Maima</title>
        <meta
          name="description"
          content="This is the home page of maima pharmacy"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          ...containerPadding,
        }}
      >
        <Slider sliderimages={images} />
        <AntibacterialSectionCard>
          <Slider sliderimages={secondimages} />
          <AntibacterialTab />
        </AntibacterialSectionCard>
        <AntibioticSectionCard>
          <Slider sliderimages={secondimages} />
          <AntibioticTab />
        </AntibioticSectionCard>
        <AnemiaSectionCard>
          <Slider sliderimages={secondimages} />
          <AnemiaTab />
          <Box
            sx={{
              bgcolor: "#F8D864",
              width: "97%",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              p: { xs: "30px 0px", sm: "40px 0px", md: "50px 0px" },
              m: {
                xs: "20px auto 20px",
                sm: "40px auto 40px",
                md: "80px auto 40px",
              },
            }}
          >
            <Grid container spacing={0}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    width: { xs: "100%", sm: "100%", md: 320 },
                    color: "#000",
                    fontSize: { xs: 12, sm: 20, md: 25 },
                    p: { xs: "14px 20px", sm: "14px 20px", md: "14px 20px" },
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    lineHeight: 1.8,
                    fontStyle: "normal",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Delivering Affordable Medicine & Healthcare At Your Doorstep
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Box>
                  <Image
                    src="/images/delivery.png"
                    alt="delivery man"
                    width={250}
                    height={200}
                    layout="fixed"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AnemiaSectionCard>
        <AntimaleriaSectionCard>
          <Slider sliderimages={secondimages} />
          <AntimalerialTab />
        </AntimaleriaSectionCard>
        <PrescriptionSectionCard />
        <FaqsSectionCard />
        {/* <div className="recipe-list">
          {blogs.map((blog: any) => (
            <BlogSectionCard key={blog.sys.id} blog={blog} />
          ))}
          <style jsx>{`
            .recipe-list {
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 20px 60px;
            }
          `}</style>
        </div> */}
        {blogs ? <BlogSectionCard blogs={blogs} /> : null}
      </Box>
    </div>
  );
}
HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
