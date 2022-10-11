import type { ReactElement } from "react";
import AdminDashboardLayout from "../../src/components/AdminLayout";

export default function PlatformConsultantsPage() {
  return (
    <div>
      <h1>Platform Consultants page</h1>
    </div>
  );
}
PlatformConsultantsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
