import CancelIcon from "@mui/icons-material/Cancel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import * as React from "react";
import { MenuNav } from "../../callout";
import { SubmitButton } from "../../form/buttons";
import { CheckBox, TextField } from "../../form/textFields";
import { Colors } from "../../form/themes/colors";
import { Fonts } from "../../form/themes/fonts";
import { AddIcon } from "../../svgs";

export default function AddSubCategory() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLUListElement | null>(null);
  const isCheckboxDisabled = false;
  const [showClearIcon, setShowClearIcon] = React.useState(false);
  const [subcat, setSubcat] = React.useState("");
  const [subcatgory, setSubcategory] = React.useState([
    { name: "diapers" },
    { name: "Soap" },
  ]);
  React.useEffect(() => {
    if (subcat === "") {
      setShowClearIcon(false);
    }
  }, [subcat, setShowClearIcon]);

  const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleInputchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubcat(event.target.value);
    event.target.value ? setShowClearIcon(true) : setShowClearIcon(false);
  };
  const ClearField = () => {
    setSubcat("");
  };
  const deleteItem = (e: any, index: number) => {
    e.preventDefault();
    const list = [...subcatgory];
    list.splice(index, 1);
    setSubcategory(list);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSubcategory([
        ...subcatgory,
        {
          name: subcat,
        },
      ]);
    }
  };
  const handleSubmit = () => {
    console.log("sub", subcatgory);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MenuNav onClick={handleClick}>
        <ListItemButton
          sx={{
            py: 0,
            minHeight: 32,
            color: Colors.greyDark,
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText
            primary="Add Sub-Category"
            primaryTypographyProps={{
              fontFamily: Fonts.primary,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "20px",
              color: Colors.greyDark,
            }}
          />
          <ChevronRightIcon
            sx={{
              fontSize: 20,
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: 0,
              ml: 2.5,
              color: Colors.textColor,
              mr: 0,
            }}
          />
        </ListItemButton>
      </MenuNav>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": { width: 300, py: 1 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SubmitButton
            style={{ width: "50%", margin: "10px auto" }}
            onClick={handleSubmit}
          >
            Add
          </SubmitButton>
          <div className="line" />
          {subcatgory &&
            subcatgory.map((sub, i) => {
              return (
                <MenuNav key={i}>
                  <ListItemButton
                    sx={{
                      py: 0,
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
                    <CancelIcon
                      onClick={(e: any) => deleteItem(e, i)}
                      sx={{
                        fontSize: 18,
                        cursor: "pointer",
                        color: "rgba(17.0, 24.0, 39.0, 0.5) !important",
                      }}
                    />
                  </ListItemButton>

                  <div className="line" style={{ padding: "10px 0 0 0" }} />
                </MenuNav>
              );
            })}
          <Box sx={{ width: "90%", margin: "10px auto" }}>
            <TextField
              type="text"
              id="subcategory"
              name="subcategory"
              value={subcat}
              onChange={handleInputchange}
              onKeyPress={handleKeyPress}
              clearField={ClearField}
              showClearIcon={showClearIcon}
              style={{
                background: "#F9FAFB",
                borderRadius: "8px",
                color: Colors.greyDark,
              }}
            />
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
