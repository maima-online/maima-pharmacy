import { Box } from "@mui/material";
import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Subnav from "../Subnav";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Subnav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
