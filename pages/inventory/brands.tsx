import {
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useApi } from "../../hooks/axiosApi";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import Callout, { MenuCheckbox } from "../../src/components/callout";
import { OutlinedSearch } from "../../src/components/form/textFields";
import {
  FormSubTitle,
  FormTitle,
  Goback,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { Fonts } from "../../src/components/form/themes/fonts";
import AddBrand from "../../src/components/Inventory/brands/AddBrand";
import DeleteBrand from "../../src/components/Inventory/brands/DeleteBrand";
import EditBrand from "../../src/components/Inventory/brands/EditBrand";
import { ArrowBack } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";

export default function BrandsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: brands, error, isLoading } = useApi("brands");

  return (
    <div>
      <Head>
        <title>Brand detail - Maima</title>
        <meta name="description" content="Inventory brand page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={0}>
        <Grid item xs={12} lg={6}>
          <Goback onClick={() => router.push("/inventory")}>
            <ArrowBack /> Back to inventory
          </Goback>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AddBrand />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: { xs: "block", md: "flex" },
              justifyContent: { xs: "normal", md: "space-between" },
              mt: { xs: 1, md: 0 },
            }}
          >
            <div className={styles.pageTitleCard}>
              <FormTitle>All Brands</FormTitle>
              <FormSubTitle style={{ marginTop: -10 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </FormSubTitle>
            </div>
            <OutlinedSearch
              id="search"
              name="search"
              value={search}
              placeholder="Search by name of brand"
              borderBottom={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              ghost
              style={{ width: 200, float: "right" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexGrow: 1,
          my: 3,
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={1}>
          {brands?.map((brand: { name: string; logo: string }, i: number) => (
            <Grid item xs={12} sm={4} lg={3} xl={2} key={i}>
              <div className={styles.brandcard}>
                <MenuCheckbox>
                  <ListItemButton
                    sx={{
                      p: 0,
                      minHeight: 32,
                      color: Colors.greyDark,
                    }}
                  >
                    <ListItemIcon>
                      <Image
                        src={brand.logo}
                        width={38}
                        height={38}
                        layout="fixed"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={brand.name}
                      primaryTypographyProps={{
                        fontFamily: Fonts.primary,
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: Colors.greyDark,
                        ml: 1,
                      }}
                    />
                    <Callout
                      TopAction={<EditBrand />}
                      BottomAction={<DeleteBrand />}
                    />
                  </ListItemButton>
                </MenuCheckbox>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
BrandsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
