import { Link } from "@mui/material";
import Image from "next/image";
import React from "react";

function Logo({ height = 36, width = 100 }) {
  return (
    <div>
      <Link href="/">
        <Image
          src="/icons/logo/full_logo.svg"
          alt="logo"
          height={height}
          width={width}
        />
      </Link>
    </div>
  );
}

export default Logo;
