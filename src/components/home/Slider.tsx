import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const CustomSlider = styled(SlickSlider)`
  .slick-prev:before {
    content: "";
  }

  .slick-next:before {
    content: "";
  }
  .slick-dots li {
    width: 2rem;
    top: 0.5rem;
  }
  .slick-dots li button:before {
    content: "";
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    background-color: white;
    border: 1px solid #c4c4c4;
  }
  .slick-dots > li.slick-active button:before {
    background-color: #568089;
    border: 1px solid #568089;
    opacity: 1;
  }
`;
interface Pictures {
  sliderimages: {
    src: string;
    name: string;
  }[];
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: "52px",
        left: "auto",
        zIndex: 100,
        top: "45%",
      }}
    >
      <Button
        component="button"
        sx={{
          width: "56px",
          height: "56px",
          background: "#fff",
          "&:hover": {
            background: "#fff",
          },
        }}
      >
        <ChevronRightIcon
          onClick={onClick}
          sx={{ width: 30, height: 30, color: "#568089" }}
        />
      </Button>
    </div>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        left: "10px",
        right: "auto",
        zIndex: 100,
        top: "45%",
      }}
    >
      <Button
        sx={{
          width: "56px",
          height: "56px",
          background: "#fff",
          "&:hover": {
            background: "#fff",
          },
        }}
      >
        <ChevronLeftIcon
          onClick={onClick}
          sx={{ width: 30, height: 30, color: "#568089" }}
        />
      </Button>
    </div>
  );
}
const Slider = ({ sliderimages }: Pictures) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      sx={{
        width: "100%",
        mb: 7,
        mt: 7,
      }}
    >
      <CustomSlider {...settings}>
        {sliderimages.map((el, idx) => (
          <div
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
            key={idx}
          >
            <Link href="/">
              <a>
                <img
                  src={el.src}
                  alt={el.name}
                  width="100%"
                  height="100%"
                  style={{ cursor: "pointer" }}
                  // layout="responsive"
                  // objectFit="cover"
                  // objectPosition="relative"
                />
              </a>
            </Link>
          </div>
        ))}
      </CustomSlider>
    </Box>
  );
};

export default Slider;
