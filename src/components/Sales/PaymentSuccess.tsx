import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import * as React from "react";
import { MenuNav } from "../callout";
import { CancelButton, DeleteButton, SubmitButton } from "../form/buttons";
import { ButtonsRow } from "../form/buttons/styles";
import { TextField } from "../form/textFields";
import { DeleteTitle } from "../form/textFields/styles";
import { Colors } from "../form/themes/colors";
import { Fonts } from "../form/themes/fonts";
import { DeleteIcon } from "../svgs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function PaymentSuccess() {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisable] = React.useState(false);
  const deletedName = "Peak";
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
        <ListItemText
          sx={{ cursor: "pointer" }}
          primary="Payment success"
          primaryTypographyProps={{
            fontFamily: Fonts.primary,
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 12,
            lineHeight: "20px",
            color: Colors.primary,
          }}
        />
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
        <DeleteTitle style={{ color: Colors.primary }}>
          Payment Successful
        </DeleteTitle>
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
          ullam.
        </Box>
        <ButtonsRow style={{ padding: "8px 0 8px" }}>
          <CancelButton onClick={handleClose} style={{ width: "120px" }}>
            Back to Sales
          </CancelButton>
          <SubmitButton
            onClick={handleClose}
            style={{ width: 120 }}
            disabled={disabled}
          >
            Print Receipt
          </SubmitButton>
        </ButtonsRow>
      </Dialog>
    </div>
  );
}
