import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  Grid,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IBrand } from "../../../../features/types";
import styles from "../../../../styles/Inventory.module.css";
import { MenuNav } from "../../callout";
import { CancelButton, SubmitButton } from "../../form/buttons";
import { ButtonsRow } from "../../form/buttons/styles";
import { TextField } from "../../form/textFields";
import { FormSubTitle, FormTitle } from "../../form/textFields/styles";
import { Colors } from "../../form/themes/colors";
import { Fonts } from "../../form/themes/fonts";
import { EditIcon } from "../../svgs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const FILE_SIZE = 5000;
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    brandLogo: yup
      .mixed()
      .test(
        "required",
        "brand logo is required",
        (value) => value && value.length
      )
      .test(
        "FILE_SIZE",
        "Uploaded file is too big.",
        (value) => !value || (value && value.size <= FILE_SIZE)
      )
      .test(
        "FILE_FORMAT",
        "Uploaded file has unsupported format.",
        (value) => !value || (value && SUPPORTED_FORMAT.includes(value.type))
      ),
  })
  .required();
export default function EditBrand() {
  const [open, setOpen] = React.useState(false);
  const [photo, setPhoto] = React.useState<any>("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IBrand>({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const convert2Base64 = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader?.result?.toString());
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = async (data: IBrand) => {
    console.log("DATA", data, photo);
    // if (data.brandLogo.length > 0) {
    //   convert2Base64(data.brandLogo[0]);
    // }
    //   const file = data.brandLogo[0];
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
  const brandLogo = watch("brandLogo");
  React.useEffect(() => {
    if (brandLogo?.length > 0) {
      convert2Base64(brandLogo[0]);
    }
  }, [brandLogo]);
  const hasError = (field: keyof IBrand) => (errors[field] ? true : false);

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
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Edit Brand"
            primaryTypographyProps={{
              fontFamily: Fonts.primary,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "20px",
              color: Colors.greyDark,
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
            width: { xs: "100%", md: 600 },
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
            padding: "10px 25px 20px",
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
          <FormTitle>Details</FormTitle>
          <FormSubTitle style={{ marginTop: -10 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </FormSubTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  htmlFor="name"
                  name="name"
                  type="text"
                  label="Name"
                  error={hasError("name")}
                  helper={errors.name?.message}
                  register={register}
                  required
                  // disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={styles.brandLogoPreview}>
                  {!brandLogo || brandLogo.length === 0 ? (
                    <p
                      style={{
                        font: `normal normal normal 600 12px/20px ${Fonts.primary}`,
                        textAlign: "center",
                        color: "#6B7280",
                      }}
                    >
                      57 X 57
                    </p>
                  ) : (
                    <img
                      src={photo}
                      alt={brandLogo[0].name}
                      width={60}
                      height={50}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  htmlFor="brandLogo"
                  id="brandLogo"
                  label={
                    <span className={styles.browsebutton}>
                      <ControlPointIcon
                        fontSize="small"
                        sx={{
                          cursor: "pointer",
                          mt: 2,
                          background: "rgba(86, 128, 137, 0.01)",
                        }}
                      />{" "}
                      <span
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 26,
                        }}
                      >
                        Add brand logo
                      </span>
                    </span>
                  }
                  register={register}
                  type="file"
                  name="brandLogo"
                  error={hasError("brandLogo")}
                  helper={errors.brandLogo?.message}
                  accept={SUPPORTED_FORMAT}
                  style={{
                    display: "none",
                  }}
                  onChange={convert2Base64}
                />
              </Grid>
              {/* {serverErrors && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {Array.isArray(serverErrors) ? (
                      <>
                        {serverErrors.map((error, index) => (
                          <li key={error + index}>{error}</li>
                        ))}
                      </>
                    ) : (
                      <p>{JSON.stringify(serverErrors)}</p>
                    )}
                  </Alert>
                </Grid>
              )} */}
            </Grid>
            <div className="line" style={{ marginTop: 140 }}></div>
            <ButtonsRow style={{ padding: "0px 25px 15px" }}>
              <CancelButton
                onClick={handleClose}
                style={{ width: "120px" }}
                // disabled={handleDiabledButton}
              >
                cancel
              </CancelButton>
              <SubmitButton
                // onClick={handleClose}
                style={{ width: "120px" }}
                // disabled={disabled}
              >
                Save
              </SubmitButton>
            </ButtonsRow>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
const SUPPORTED_FORMAT = ["PNG", "JPEG", "JPG", "PSD", "SVG", "ESP", "PDF"]
  .map(function (x) {
    return "." + x;
  })
  .join(",");
