import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import * as React from "react";
import { MenuNav } from "../../callout";
import { CancelButton, DeleteButton } from "../../form/buttons";
import { ButtonsRow } from "../../form/buttons/styles";
import { TextField } from "../../form/textFields";
import { DeleteTitle } from "../../form/textFields/styles";
import { Colors } from "../../form/themes/colors";
import { Fonts } from "../../form/themes/fonts";
import { DeleteIcon } from "../../svgs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DeleteCondition() {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisable] = React.useState(false);
  const deletedName = "Corona";
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (name === "" || name !== deletedName) {
      return setDisable(true);
    }
    setDisable(false);
  }, [name, deletedName]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MenuNav onClick={handleClickOpen}>
        <ListItemButton
          sx={{
            py: 0,
            minHeight: 32,
            color: Colors.greyDark,
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText
            primary="Delete SubCategory"
            primaryTypographyProps={{
              fontFamily: Fonts.primary,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "20px",
              color: Colors.deleteButton,
            }}
          />
        </ListItemButton>
      </MenuNav>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: "100%",
            padding: "20px 25px",
            "@media only screen and (min-width: 600px)": {
              width: 500,
            },
          },
        }}
      >
        <DeleteTitle>Whoops caution!</DeleteTitle>
        <Box
          component="div"
          sx={{
            fontFamily: Fonts.primary,
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "24px",
            color: Colors.textColor,
          }}
        >
          Are you sure that you want to delete this condition? The data will be
          gone forever.
          <Box component="span" sx={{ display: "block", mt: 2 }}>
            Type the name{" "}
            <Box
              component="span"
              sx={{ color: Colors.greyDark, fontWeight: "600" }}
            >
              Corona
            </Box>{" "}
            to confirm.
          </Box>
          <TextField
            type="text"
            name="name"
            value={name}
            placeholder="Name of the category"
            onChange={(e: any) => setName(e.target.value)}
          />
        </Box>
        <ButtonsRow style={{ padding: "8px 0 8px" }}>
          <CancelButton onClick={handleClose} style={{ width: "120px" }}>
            cancel
          </CancelButton>
          <DeleteButton
            onClick={handleClose}
            style={{ width: "120px" }}
            disabled={disabled}
          >
            Delete Category
          </DeleteButton>
        </ButtonsRow>
      </Dialog>
    </div>
  );
}
