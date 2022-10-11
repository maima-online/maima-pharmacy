import { Close } from "@mui/icons-material";
import {
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useApi } from "../../hooks/axiosApi";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import Callout, { MenuCheckbox } from "../../src/components/callout";
import {
  CheckBox,
  OutlinedSearch,
  RadioButton,
} from "../../src/components/form/textFields";
import {
  FormSubTitle,
  FormTitle,
  Goback,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { Fonts } from "../../src/components/form/themes/fonts";
import AddCategory from "../../src/components/Inventory/categories/AddCategory";
import AddSubCategory from "../../src/components/Inventory/categories/AddSubCategory";
import DeleteCategory from "../../src/components/Inventory/categories/DeleteCategory";
import DeleteSubCategory from "../../src/components/Inventory/categories/DeleteSubCategory";
import EditCategory from "../../src/components/Inventory/categories/EditCategory";
import EditSubCategory from "../../src/components/Inventory/categories/EditSubCategory";
import { AngleForward, ArrowBack, SearchIcon } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";

export default function CategoriesPage() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);
  const [subcats, setSubcats] = useState<{ name: string }[]>([]);
  const isCheckboxDisabled = false;
  const { data, error, isLoading } = useApi("categories");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    setSelectedValue(id);
  };
  const handleShowcat = (subcategories: { name: string }[]) => {
    setSubcats(subcategories);
  };
  const handleShowSearch = () => setShowSearch(!showSearch);
  return (
    <div>
      <Head>
        <title>Inventory detail - Maima</title>
        <meta name="description" content="Inventory detail page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Goback onClick={() => router.push("/inventory")}>
        <ArrowBack /> Back to inventory
      </Goback>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          margin: "-40px 0 20px",
        }}
      >
        <AddCategory />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <div className={styles.detailCard}>
            <div className={styles.titleHolder}>
              {showSearch ? (
                <>
                  <OutlinedSearch name="search" borderBottom />
                  <Tooltip title="close search">
                    <Close
                      sx={{
                        fontSize: 20,
                        color: "inherit",
                        cursor: "pointer",
                        mt: "10px",
                      }}
                      onClick={handleShowSearch}
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <FormTitle>All Categories</FormTitle>
                  <SearchIcon
                    style={{ marginTop: 10, cursor: "pointer" }}
                    onClick={handleShowSearch}
                  />
                </>
              )}
            </div>
            <FormSubTitle>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </FormSubTitle>
            {data?.map(
              (category: {
                id: number;
                name: string;
                description: string;
                subCategory: { name: string }[];
              }) => {
                return (
                  <div
                    className={
                      selectedValue === category.id
                        ? styles.catCardSelected
                        : styles.catCard
                    }
                    key={category.id}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.radioDescription}>
                        <RadioButton
                          checked={selectedValue === category.id}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e, category.id)
                          }
                          value={""}
                          name={category.name}
                          vmargin="-15px"
                          hmargin="4px"
                          label={
                            <h3 className={styles.heading}>
                              {category.name}
                              <span className={styles.subheading}>
                                {category.description}
                              </span>
                            </h3>
                          }
                        />
                      </div>
                      {selectedValue === category.id ? (
                        <div className={styles.calloutIcon}>
                          <Callout
                            TopAction={<EditCategory />}
                            BottomAction={<AddSubCategory />}
                            ThirdAction={<DeleteCategory />}
                          />
                          <span className={styles.descriptionArrowIcon}>
                            <AngleForward
                              onClick={() =>
                                handleShowcat(category.subCategory)
                              }
                            />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Grid>
        {subcats && subcats.length !== 0 ? (
          <Grid item xs={12} lg={8}>
            <div className={styles.subCatCard}>
              <Box sx={{ flexGrow: 1 }}>
                <div className="line"></div>
                <Grid container spacing={0}>
                  {subcats.map((sub, i) => {
                    return (
                      <Grid item xs={6} sm={4} lg={3} key={i}>
                        <MenuCheckbox>
                          <ListItemButton
                            sx={{
                              p: 0,
                              minHeight: 32,
                              color: Colors.greyDark,
                            }}
                          >
                            <ListItemIcon sx={{ color: "inherit" }}>
                              <CheckBox
                                name="isCheckboxDisabled"
                                defaultChecked={isCheckboxDisabled}
                                disabled
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={sub.name}
                              primaryTypographyProps={{
                                fontFamily: Fonts.primary,
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: 12,
                                lineHeight: "16px",
                                color: Colors.greyDark,
                                ml: -1,
                                mt: 1,
                              }}
                            />
                            <Callout
                              TopAction={<EditSubCategory />}
                              BottomAction={<DeleteSubCategory />}
                            />
                          </ListItemButton>
                        </MenuCheckbox>
                        <div className="line" style={{ margin: "1px 0" }}></div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
