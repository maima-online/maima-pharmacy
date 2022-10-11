import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Grid, IconButton, Link } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import Image from "next/image";
import * as React from "react";
import { Controller, useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { useApi } from "../../../hooks/axiosApi";
import styles from "../../../styles/Inventory.module.css";
import { CancelButton, SubmitButton } from "../form/buttons";
import { ButtonsRow } from "../form/buttons/styles";
import MySelect, {
  Radio,
  RadioButton,
  Select,
  TextArea,
  TextField,
} from "../form/textFields";
import { FormSubTitle, FormTitle, InputLabel } from "../form/textFields/styles";
import { Colors } from "../form/themes/colors";
import { Fonts } from "../form/themes/fonts";
import { AddIcon } from "../svgs";

interface IPaymentMehod {
  method: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const schema = yup
  .object({
    method: yup.string().required("Product name is required"),
  })
  .required();
export default function ViewReceipt() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<number>(1);

  const methods = [
    {
      id: 1,
      name: "Card (Master, Verve, Visa)",
      description: "Lorem ipsum dolor sit amet",
    },
    { id: 2, name: "Cash", description: "Lorem ipsum dolor sit amet" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPaymentMehod>({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    console.log("e", e.target.value);
    setSelectedValue(id);
  };
  const onSubmit = async (data: IPaymentMehod) => {
    console.log("DATA", data);
    // if (data.img.length > 0) {
    //   convert2Base64(data.img[0]);
    // }
    //   const file = data.img[0];
    //   const storageRef = app.storage().ref();
    //   const fileRef = storageRef.child(file.name);
    //   fileRef.put(file).then(() => {
    //     console.log("Uploaded a file");
    //   });
    // setLoading(true);
    // dispatch(userLogin({ email: data.email, password: data.password }))
    //   .unwrap()
    //   .then(() => {
    //     setLoading(false);
    //     toast.success("Login successful");
    //     router.push("/orders");
    //   })
    //   .catch((err: any) => {
    //     setLoading(false);
    //     toast.error(err);
    //   });
    // return false;
  };

  const hasError = (field: keyof IPaymentMehod) =>
    errors[field] ? true : false;
  return (
    <div>
      <ButtonsRow style={{ marginTop: 18 }}>
        <SubmitButton onClick={handleClickOpen} style={{ width: 120 }} ghost>
          VIEW RECEIPT
        </SubmitButton>
      </ButtonsRow>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "100%", lg: 800 },
            maxWidth: { xs: "100%", md: "100%", lg: 800 },
          },
        }}
      >
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
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: Colors.greyDark,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mt: 5,
              padding: "0px 25px 0px",
            }}
          >
            <Box>
              <FormTitle>Order #2414</FormTitle>
              <FormSubTitle style={{ marginTop: -20 }}>
                29 September 2022, 23:01
              </FormSubTitle>
            </Box>
            <Box
              sx={{
                font: `normal normal 400 12px/20px ${Fonts.primary}`,
                color: Colors.greyDark,
              }}
            >
              <span
                style={{
                  color: "#34D399",
                  fontSize: 30,
                  position: "relative",
                  top: 7,
                  right: 2,
                }}
              >
                &#8226;
              </span>
              Paid
            </Box>
          </Box>
          <div className="line" style={{ margin: "0px 0 20px" }}></div>
          <Box sx={{ padding: "0px 0px 0px  30px" }}>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      flex: "auto",
                    },
                  }}
                >
                  <Box>
                    Email
                    <Box
                      component="span"
                      sx={{
                        width: "100%",
                        display: "block",
                        color: Colors.greyDark,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      sales@maimaonline.com
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: "#E5E7EB" }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      flex: "auto",
                    },
                  }}
                >
                  <Box>
                    Phone
                    <Box
                      component="span"
                      sx={{
                        width: "100%",
                        display: "block",
                        color: Colors.greyDark,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      +234814245678
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: "#E5E7EB" }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      flex: "auto",
                    },
                  }}
                >
                  <Box>
                    Payment
                    <Box
                      component="span"
                      sx={{ display: "block", color: Colors.greyDark }}
                    >
                      Card
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: "#E5E7EB" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      // flex: "auto",
                    },
                  }}
                >
                  served by
                  <Box
                    component="span"
                    sx={{
                      width: "100%",
                      display: "block",
                      color: Colors.greyDark,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Aishia
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <div className="line" style={{ margin: "20px 0 15px" }}></div>
          <Box
            component="div"
            sx={{
              // display: "flex",
              // background: "#FFFFFF",
              // border: "1px solid #E5E7EB",
              // borderRadius: "8px",
              mt: 2,
              padding: "0px 25px 0px",
            }}
          >
            <FormTitle>Summary</FormTitle>
            <Box
              component="div"
              sx={{
                display: "flex",
              }}
            >
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    <Image
                      src="/images/aloevera.jpg"
                      alt="sale image"
                      width={40}
                      height={40}
                      layout="fixed"
                    />
                    <Box sx={{ ml: 1 }}>
                      Classic Bathrobe (Carmel)
                      <Box
                        component="span"
                        sx={{ display: "block", color: Colors.textColor }}
                      >
                        Large
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      justifyContent: { xs: "flex-end", sm: "space-between" },
                      alignItems: "flex-end",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00 x 1<Box component="span">₦1,345.00</Box>
                  </Box>
                </Grid>{" "}
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    <Image
                      src="/images/mask.jpg"
                      alt="sale image"
                      width={40}
                      height={40}
                      layout="fixed"
                    />
                    <Box sx={{ ml: 1 }}>
                      Towels (Coastal Stripes)
                      <Box
                        component="span"
                        sx={{ display: "block", color: Colors.textColor }}
                      >
                        Bath Towel
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: { xs: "flex-end", sm: "space-between" },
                      alignItems: "flex-end",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00 x 1<Box component="span">₦1,345.00</Box>
                  </Box>
                </Grid>{" "}
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    <Image
                      src="/images/pot.jpg"
                      alt="sale image"
                      width={40}
                      height={40}
                      layout="fixed"
                    />
                    <Box sx={{ ml: 1 }}>
                      Linen Bedspread (Sand Grey)
                      <Box
                        component="span"
                        sx={{ display: "block", color: Colors.textColor }}
                      >
                        240x260
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: { xs: "flex-end", sm: "space-between" },
                      alignItems: "flex-end",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00 x 1<Box component="span">₦1,345.00</Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 190 },
                      display: "flex",
                      justifyContent: "space-between",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    Subtotal
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      justifyContent: "flex-end",

                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 190 },
                      display: "flex",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    Discount:
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        background: "#F3F4F6",
                        borderRadius: "8px",
                        py: 0.2,
                        px: 1,
                      }}
                    >
                      SUMMER20
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      justifyContent: "flex-end",

                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 190 },
                      display: "flex",
                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    Tax @ 12,5%
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      justifyContent: "flex-end",

                      font: `normal normal 400 12px/20px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00
                  </Box>
                </Grid>{" "}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      font: `normal normal 600 14px/24px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    Total
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      justifyContent: "flex-end",

                      font: `normal normal 600 24px/36px ${Fonts.primary}`,
                      color: Colors.greyDark,
                    }}
                  >
                    ₦1,345.00
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <div className="line" style={{ marginTop: 100 }}></div>
          <ButtonsRow style={{ padding: "0px 0 15px" }}>
            <CancelButton
              onClick={handleClose}
              style={{ width: "80px" }}
              // disabled={handleDiabledButton}
            >
              Close
            </CancelButton>
          </ButtonsRow>
        </Box>
      </Dialog>
    </div>
  );
}
