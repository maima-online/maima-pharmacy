import { ArrowForward } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import {
  PageSubTitle,
  PageTitle,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { AngleForward } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";

const inventories = [
  {
    name: "Categories",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    name: "Conditions",
    description: "Lorem ipsum dolor sit amet consectetur elit",
  },
  {
    name: "Brands",
    description: "Lorem ipsum dolor sit amet consectetu",
  },
  {
    name: "Products",
    description: "Lorem ipsum dolor sit adipisicing elit",
  },
];
/* eslint no-useless-concat: 0 */
function updateKey(str: string) {
  if (typeof str !== "string") return "";
  const regex = / /g;
  const newStr = str.toLowerCase();
  const update = newStr.replace(regex, "-");
  return update;
}
export default function InventoryPage() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Inventory - Maima</title>
        <meta name="description" content="Inventory page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle>Inventory page</PageTitle>
      <PageSubTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </PageSubTitle>
      <Grid container spacing={2}>
        {inventories &&
          inventories.map((inventory, i) => {
            return (
              <Grid item xs={12} sm={12} md={6} key={i}>
                <div
                  className={styles.card}
                  onClick={() =>
                    router.push("/inventory/" + updateKey(inventory.name))
                  }
                >
                  <div className={styles.cardContent}>
                    <div className={styles.description}>
                      <div className={styles.circle}></div>
                      <div className={styles.cardTitle}>
                        <h3 className={styles.heading}>
                          {inventory.name}{" "}
                          <span className={styles.subheading}>
                            {inventory.description}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div className={styles.arrowIcon}>
                      <AngleForward />
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
InventoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
