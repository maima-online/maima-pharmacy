import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import * as React from "react";
import { OutlinedSearch } from "../form/textFields";
import { Colors } from "../form/themes/colors";
import { Fonts } from "../form/themes/fonts";
import { PercentIcon, PrescriptionIcon, PurchasesIcon } from "../svgs";
import Notifications from "./notification";
import Profile from "./profile";

const drawerWidth = 240;
const appHeight = 48;
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactElement;
}
const data = [
  {
    icon: <DashboardOutlinedIcon />,
    label: "Dashboard",
    link: "/dashboard",
  },
  { icon: <ShoppingCartOutlinedIcon />, label: "orders", link: "/orders" },
  { icon: <LocalOfferOutlinedIcon />, label: "Sales", link: "/sales" },
  { icon: <InventoryOutlinedIcon />, label: "Inventory", link: "/inventory" },
  { icon: <PurchasesIcon />, label: "Purchases", link: "/purchases" },
  {
    icon: <PrescriptionIcon />,
    label: "Prescriptions",
    link: "/prescriptions",
  },
  {
    icon: <PeopleOutlinedIcon />,
    label: "User Management",
    link: "/user-management",
    subpages: [
      {
        icon: <PeopleOutlinedIcon />,
        label: "Customers",
        link: "/user-management/customer",
      },
      {
        icon: <PeopleOutlinedIcon />,
        label: "Cashiers",
        link: "/user-management/cashiers",
      },
      {
        icon: <PeopleOutlinedIcon />,
        label: "Admin",
        link: "/admin",
      },
    ],
  },
  {
    icon: <PercentIcon />,
    label: "Platform consultants",
    link: "/platform-consultants",
  },
];
const NavList = styled(List)<{ component?: React.ElementType }>({
  paddingTop: 24,
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
    width: "93%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px auto",
    "&.Mui-selected": {
      backgroundColor: "rgba(86, 128, 137, 0.2) !important",
      borderRadius: "6px !important",
    },
    "&:focused": {
      backgroundColor: "rgba(86, 128, 137, 0.2) !important",
      borderRadius: "6px !important",
    },
    "&:hover": {
      backgroundColor: "rgba(86, 128, 137, 0.05) !important",
      borderRadius: "6px !important",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    color: Colors.primary,
  },
});
function stripTrailingSlash(str: string) {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
}

stripTrailingSlash("/platform-consultants/dfghsjkjhf");
export default function AdminDashboardLayout(props: Props) {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: `${appHeight}px !important` }}>
        <Link href="/" prefetch={false}>
          <a style={{ paddingTop: "8px" }}>
            <Image
              src={"/icons/logo/full_logo.svg"}
              alt="logo"
              width={140}
              height={38}
              layout="fixed"
              priority
            />
          </a>
        </Link>
      </Toolbar>
      <NavList component="nav" disablePadding>
        {data.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => router.push(item.link)}
            sx={{ py: 0, minHeight: 32, color: Colors.greyDark }}
            selected={router.pathname === item.link}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 12,
                fontWeight: "400",
                fontStyle: "normal",
                lineHeight: "20px",
                fontFamily: Fonts.primary,
                color: Colors.greyDark,
              }}
            />
          </ListItemButton>
        ))}
      </NavList>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: appHeight,
          backgroundColor: "#fff",
          boxShadow: "none",
          borderBottom: `1px solid ${Colors.greyLight}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: Colors.greyDark, mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              width: 300,
              mr: 2,
              mb: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            <OutlinedSearch
              id="search"
              name="search"
              value={search}
              placeholder="Search anything..."
              borderBottom={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </Box>
          <Box
            component="div"
            sx={{
              width: 70,
              mr: 2,
              mb: 2,
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Notifications />
            <Profile />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        <Toolbar sx={{ minHeight: `${appHeight}px !important` }} />
        {props.children}
      </Box>
    </Box>
  );
}
