import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ICategory } from "../../../../features/types";
import { CancelButton, SubmitButton } from "../../form/buttons";
import { ButtonsRow } from "../../form/buttons/styles";
import { TextArea, TextField } from "../../form/textFields";
import { FormTitle } from "../../form/textFields/styles";
import { Colors } from "../../form/themes/colors";
import { Fonts } from "../../form/themes/fonts";
import { AddIcon } from "../../svgs";

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
    name: yup.string().required("Name is required"),
    subtitle: yup.string().required("Subtitle is required"),
  })
  .required();
export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = async (data: ICategory) => {
    console.log("DATA", data);
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
  const hasError = (field: keyof ICategory) => (errors[field] ? true : false);

  return (
    <div>
      <SubmitButton ghost style={{ width: 135 }} onClick={handleClickOpen}>
        <AddIcon /> <span style={{ marginLeft: 8 }}>Add Category</span>
      </SubmitButton>
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
          <FormTitle>Add category</FormTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
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
              <Grid item xs={12}>
                <TextArea
                  id="subtitle"
                  htmlFor="subtitle"
                  name="subtitle"
                  label="Subtitle"
                  register={register}
                  error={hasError("subtitle")}
                  helper={errors.subtitle?.message}
                  required
                  // disabled={isLoading}
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
          </form>
        </Box>
        <div className="line" style={{ marginTop: 40 }}></div>
        <ButtonsRow style={{ padding: "0px 25px 15px" }}>
          <CancelButton
            onClick={handleClose}
            style={{ width: "120px" }}
            // disabled={handleDiabledButton}
          >
            cancel
          </CancelButton>
          <SubmitButton
            onClick={handleClose}
            style={{ width: "120px" }}
            // disabled={disabled}
          >
            Save
          </SubmitButton>
        </ButtonsRow>
      </Dialog>
    </div>
  );
}
