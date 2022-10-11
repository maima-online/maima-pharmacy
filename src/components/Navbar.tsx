import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useSelector } from "../../redux/store";
import styles from "../../styles/Home.module.css";
import { containerPadding } from "../../utils/constants/global/globalStyling";
import AccountPopover from "./AccountPopper";
import Logo from "./Logo";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 1,
    top: 2,
    background: "#D9373F",
    border: `2px solid #FFFFFF`,
    padding: "0 2px",
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.9)",
  },
}));
export const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "10px 12px 0px",
  background: "#FFF",
  minHeight: 64,
  marginBottom: 10,
  borderBottom: "1px solid #ddd",
}));
const NavItemLink = ({
  children,
  href,
  sx,
}: {
  children: React.ReactNode;
  href: string;
  sx?: object;
}) => (
  <Button
    href={href}
    sx={{
      textTransform: "none",
      mr: 2,
      fontWeight: 400,
      fontSize: "0.9rem",
      color: "#568089",
      fontFamily: "Roboto",
      ...sx,
    }}
  >
    {children}
  </Button>
);

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const inputRef = useRef({ value: "" });
  const router = useRouter();
  const { data, status } = useSession();
  // Selecting cart from global state
  const cart = useSelector((state) => state.cart);

  // Getting the count of items
  const getItemsCount = () => {
    return cart.reduce(
      (
        accumulator: number,
        item: {
          id: number;
          src: string;
          name: string;
          available: string;
          quantity: number;
          price: number;
        }
      ) => accumulator + item.quantity,
      0
    );
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    inputRef.current.value &&
      router.push(`/products/?name=${inputRef.current.value}`);
  };
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const container =
    typeof window !== undefined ? () => window.document.body : undefined;
  return (
    <AppBar
      position="sticky"
      elevation={0}
      // position="relative"
      sx={{
        backgroundColor: "#ffffff",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...containerPadding,
          color: "red",
        }}
      >
        {/* SMALL SCREENS */}
        <Box
          sx={{ display: { xs: "flex", md: "none", lg: "none", xl: "none" } }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: "2px" }}
          >
            <Image src="/images/svgs/menu.svg" alt="" width={40} height={40} />
          </IconButton>
          <Stack justifyContent="center" alignItems="center">
            <Logo />
          </Stack>
        </Box>

        <Box
          sx={{ display: { xs: "flex", md: "none", lg: "none", xl: "none" } }}
        >
          <Button
            href="/cart"
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            startIcon={
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartItems}>
                  <ShoppingCartIcon sx={{ width: 20, height: 20 }} />
                </StyledBadge>
              </IconButton>
            }
            sx={{
              m: "8px 16px 0",
              cursor: "pointer",
              textTransform: "capitalize",
              color: "#568089",
              font: "normal normal normal 12px/18px Roboto, sans",
            }}
          >
            My cart
          </Button>
        </Box>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
              background: `#FFFFFF 0% 0% no-repeat padding-box`,
              backDropFilter: `blur(45px)`,
            },
          }}
        >
          <DrawerHeader>
            <Logo />
            <Fab
              size="small"
              aria-label="add"
              sx={{
                boxShadow: "none",
                color: "#282828",
                margin: 0,
                top: 10,
                right: 10,
                bottom: 20,
                left: "auto",
                position: "fixed",
                minWidth: 5,
                minHeight: 5,
                width: 6,
                height: 6,
                padding: 2,
                backgroundColor: "#FFF",
              }}
              onClick={handleDrawerToggle}
            >
              <img
                src="/images/svgs/cancel.svg"
                alt="cancel"
                width={25}
                height={25}
              />
            </Fab>
          </DrawerHeader>
          <Box>
            <div className={styles.mobilenav}>
              <div className={styles.nav}>
                <Link href="/products?category=medication">
                  <a
                    className={
                      router.pathname === "/products?category=medication"
                        ? styles.active
                        : styles.link
                    }
                  >
                    Medications
                  </a>
                </Link>
                <Link href="/products?category=vitamins">
                  <a
                    className={
                      router.pathname === "/products?category=vitamins"
                        ? styles.active
                        : styles.link
                    }
                  >
                    Vitamins & Supplements
                  </a>
                </Link>
                <Link href="/e-prescription">
                  <a
                    className={
                      router.pathname === "/e-prescription"
                        ? styles.active
                        : styles.link
                    }
                  >
                    E-prescription
                  </a>
                </Link>
                <Link href="/login">
                  <a className={styles.login}> Sign in</a>
                </Link>

                <Link href="/signup">
                  <a className={styles.register}>Register</a>
                </Link>
              </div>
            </div>
          </Box>
        </Drawer>
        {/* END OF SMALL SCREEN */}
        <Box
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
        >
          <Logo />
        </Box>
        <Box
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
        >
          <NavItemLink href="/products?category=medication">
            Medications
          </NavItemLink>
          <NavItemLink href="/products?category=vitamins">
            Vitamins & Supplements
          </NavItemLink>
          <NavItemLink href="/e-prescription">E-prescription</NavItemLink>
        </Box>
        <Box
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
        >
          <Stack justifyContent="center">
            <form onSubmit={handleSubmit}>
              <TextField
                inputRef={inputRef}
                defaultValue=""
                name="name"
                size="small"
                placeholder="Start searching here..."
                sx={{
                  fontFamily: "Roboto",
                  // mb: 0.3,
                  "& .MuiOutlinedInput-input": {
                    fontSize: 13,
                  },
                  "& ::placeholder": {
                    color: "#050505",
                    opacity: 1,
                    fontFamily: "Roboto",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Image
                        src="/icons/search.svg"
                        alt="search"
                        height={25}
                        width={25}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Stack>
          <AccountPopover />
          <Button
            href="/cart"
            id="demo-customized-button"
            aria-haspopup="true"
            disableElevation
            startIcon={
              <StyledBadge badgeContent={getItemsCount()}>
                <ShoppingCartIcon sx={{ width: 20, height: 20 }} />
              </StyledBadge>
            }
            sx={{
              m: 0,
              cursor: "pointer",
              textTransform: "capitalize",
              color: "#568089",
              font: "normal normal normal 14px/20px Roboto, sans",
            }}
          >
            My cart
          </Button>
        </Box>
      </Toolbar>
      <Box
        sx={{
          display: { xs: "flex", sm: "none", md: "none", lg: "none" },
          m: "15px 0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            width: "90%",
          }}
        >
          <TextField
            inputRef={inputRef}
            defaultValue=""
            name="name"
            size="small"
            placeholder="Start searching here..."
            sx={{
              fontFamily: "Roboto",
              "& .MuiOutlinedInput-input": {
                fontSize: 12,
              },
              "& .css-23rptd-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
              "& ::placeholder": {
                color: "#050505",
                opacity: 1,
                fontFamily: "Roboto",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image
                    src="/icons/search.svg"
                    alt="search"
                    height={25}
                    width={25}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>
    </AppBar>
  );
}

export default Navbar;
