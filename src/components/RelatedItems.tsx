import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Pictures {
  sliderimages: {
    id: number;
    src: string;
    code: string;
    type: string;
    name: string;
    quantity: string;
    package: string;
    expiration: string;
    description: string;
    price: string;
  }[];
}

export default function RelatedItemsSlider({ sliderimages }: Pictures) {
  const router = useRouter();
  const { name, id } = router.query;
  function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "-18px", top: "40%" }}
      >
        <Image
          src="/images/svgs/rightArrow.svg"
          alt=""
          width={15}
          height={15}
          layout="fixed"
          onClick={onClick}
        />
      </div>
    );
  }

  function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "-45px", top: "40%" }}
      >
        <Image
          src="/images/svgs/leftArrow.svg"
          alt=""
          width={15}
          height={15}
          layout="fixed"
          onClick={onClick}
        />
      </div>
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const notCurrentItem = sliderimages?.filter((item) => item.id !== Number(id));
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <SlickSlider {...settings}>
        {notCurrentItem?.map((el, idx) => (
          <div style={{ cursor: "pointer", background: "#fff" }} key={idx}>
            <Link href={`/conditions/${name}/${el.id}`}>
              <a>
                <Image
                  src={el.src}
                  alt=""
                  width={120}
                  height={120}
                  layout="fixed"
                />
              </a>
            </Link>
          </div>
        ))}
      </SlickSlider>
    </Box>
  );
}
