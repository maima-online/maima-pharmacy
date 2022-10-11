import PageBanner from "../src/components/PageBanner";
import type { ReactElement } from "react";
import MainLayout from "../src/components/layouts/MainLayout";

export default function MyAccountPage() {
  return (
    <div>
      <PageBanner title="My Account" />
      <h1 style={{ width: 200, margin: "20px auto" }}>MyAccount</h1>
    </div>
  );
}
MyAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
