import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useApi } from "../../hooks/axiosApi";
import { containerPadding } from "../../utils/constants/global/globalStyling";

const SubNavLoading = () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((el, idx) => (
        <Stack key={idx}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={80}
            height={80}
          />
        </Stack>
      ))}
    </>
  );
};
function updateKey(str: string) {
  if (typeof str !== "string") return "";
  const regex = / /g;
  const newStr = str.toLowerCase();
  const update = newStr.replace(regex, "-");
  return update;
}

function capitalize(str: string) {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function Subnav() {
  const { data, error, isLoading } = useApi("conditions");
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        ...containerPadding,
        justifyContent: "space-between",
        overflowX: "scroll",
        mt: 5,
        mb: 2,
      }}
    >
      {isLoading && <SubNavLoading />}
      {error && (
        <Typography
          variant="body1"
          sx={{
            color: "#568089",
            font: "normal normal 400 18px/25px Roboto,sans-serif",
            fontFamily: "Roboto",
            textAlign: "center",
          }}
        >
          {error.message}
        </Typography>
      )}
      {data?.map((el: { name: string; icon: string }) => (
        <Stack key={el.name}>
          <Link href={"/conditions/" + updateKey(el.name)}>
            <a>
              <Avatar
                alt={el.name}
                src={el.icon}
                sx={{
                  border:
                    el.name === "Eczema" || el.name === "Pregnancy"
                      ? "1px solid #B6DFEF !important"
                      : el.name === "Diarrhea" ||
                        el.name === "Covid" ||
                        el.name === "Vitamins" ||
                        el.name === "Skin"
                      ? "1px solid #DBEEBC !important"
                      : el.name === "Cough Flu"
                      ? "1px solid #F9D99F !important"
                      : "1px solid #F7CDCD !important",
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  cursor: "pointer",
                }}
              />
            </a>
          </Link>

          <Typography
            variant="subtitle2"
            sx={{
              color: "#568089",
              fontWeight: 400,
              fontFamily: "Roboto",
              textAlign: "center",
            }}
          >
            {capitalize(el.name)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default Subnav;
