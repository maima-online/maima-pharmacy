import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Button, MenuItem, Popover, Menu, alpha, styled } from "@mui/material";
import { MenuProps } from "@mui/material/Menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { removeCookie } from "typescript-cookie";
import { logout } from "../../redux/auth.slice";
import { useDispatch, useSelector } from "../../redux/store";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 180,
    backgroundColor: "#fcfdff",
    borderLeft: "1px solid #eee",
    color: "#282828",
    boxShadow: "none",
    borderRadius: "5px",
    marginTop: 1,
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: "#568089",
        marginRight: "12px",
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
//   <Popover
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "left",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "left",
//     }}
//     {...props}
//   />
// ))(() => ({
//   "& .MuiPopover-paper": {
//     borderRadius: "10px",
//     minWidth: 100,
//     color: "#282828",
//     font: "normal normal 400 12px/20px Roboto, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     boxShadow: "0px 2px 10px #00000027",
//     padding: 0,
//   },
// }));

export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    removeCookie("maima");
    router.push("/login");
  };
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        onMouseOver={handleClick}
        startIcon={
          <Image
            src="/icons/user.svg"
            alt=""
            width={17}
            height={17}
            layout="fixed"
          />
        }
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          m: "0px 14px 0",
          cursor: "pointer",
          textTransform: "capitalize",
          font: "normal normal normal 14px/20px Roboto, sans",
        }}
      >
        Account
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
          onMouseLeave: handleClose,
        }}
      >
        {!isLoggedIn ? (
          <div>
            <MenuItem
              onClick={handleClose}
              disableRipple
              sx={{
                p: " 8px 10px",
                borderBottom: "2px solid #ededed",
                "&:hover": {
                  background: "#FFFFFF",
                },
              }}
            >
              <Button
                href="/login"
                variant="contained"
                sx={{
                  width: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: "12px auto",
                  p: "10px 12px",
                  font: "normal normal 400 14px/20px Roboto, sans-serif",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                  "&:hover": {
                    background: "#568089",
                  },
                }}
              >
                LOG IN
              </Button>
            </MenuItem>
            <Link href="/login">
              <a>
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  sx={{
                    color: "#568089",
                    p: "8px 10px",
                    mt: "5px",
                    font: "normal normal normal 14px/18px Roboto, sans-serif",
                  }}
                >
                  <span style={{ marginRight: "12px" }}>
                    <Image
                      src="/icons/user.svg"
                      alt=""
                      width={17}
                      height={17}
                      layout="fixed"
                    />
                  </span>
                  My Account
                </MenuItem>
              </a>
            </Link>
            <Link href="/login">
              <a>
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  sx={{
                    color: "#568089",
                    p: "8px 10px",
                    m: "5px 0 8px",
                    font: "normal normal normal 14px/18px Roboto, sans-serif",
                  }}
                >
                  <LocalShippingOutlinedIcon />
                  Orders
                </MenuItem>
              </a>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/my-account">
              <a>
                {" "}
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  sx={{
                    color: "#568089",
                    p: "8px 10px",
                    mt: "5px",
                    font: "normal normal normal 14px/18px Roboto, sans-serif",
                  }}
                >
                  <span style={{ marginRight: 8 }}>
                    <Image
                      src="/icons/user.svg"
                      alt=""
                      width={17}
                      height={17}
                      layout="fixed"
                    />
                  </span>
                  My Account
                </MenuItem>
              </a>
            </Link>
            <Link href="/orders">
              <a>
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  sx={{
                    color: "#568089",
                    p: "8px 10px",
                    m: "5px 0 8px",
                    font: "normal normal normal 14px/18px Roboto, sans-serif",
                  }}
                >
                  <LocalShippingOutlinedIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  Orders
                </MenuItem>
              </a>
            </Link>
            <MenuItem
              onClick={handleClose}
              disableRipple
              sx={{
                p: "10px",
                borderTop: "2px solid #ededed",
                "&:hover": {
                  background: "#FFFFFF",
                },
              }}
            >
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  width: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: "8px 10px",
                  font: "normal normal 400 14px/20px Roboto, sans-serif",
                  background: "#ED3572",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                  "&:hover": {
                    background: "#ED3572",
                  },
                }}
              >
                LOG OUT
              </Button>
            </MenuItem>
          </div>
        )}
      </StyledMenu>
    </div>
  );
}
