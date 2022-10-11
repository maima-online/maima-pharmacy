import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Remove } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RowProps } from "../../../pages/purchases";
// import { IPurchase } from "../../../features/types";
import { CancelButton, SubmitButton } from "../form/buttons";
import { ButtonsRow } from "../form/buttons/styles";
import { CheckBox, TextField } from "../form/textFields";
import { FormSubTitle, FormTitle, InputLabel } from "../form/textFields/styles";
import { Colors } from "../form/themes/colors";
import { Fonts } from "../form/themes/fonts";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IPurchase {
  purchase: boolean;
  addPurchase: number;
}

export default function UpdatePurchase({ data }: any) {
  const [open, setOpen] = React.useState(false);
  const schema = yup
    .object({
      addPurchase: yup.number().required("Add purchase field is required"),
      purchase: yup.boolean(),
    })
    .required();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPurchase>({
    resolver: yupResolver(schema),
    defaultValues: {
      purchase: data?.purchased,
      addPurchase: data?.availability,
    },
  });
  const addPurchase = watch("addPurchase");
  const handleAddPurchase = () => {
    setValue("addPurchase", Number(addPurchase) + 1);
  };
  const handleReducePurchase = () => {
    if (addPurchase > 1) {
      setValue("addPurchase", Number(addPurchase) - 1);
    }
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: IPurchase) => {
    //  const newreviewers = isEmpty(reviewers)
    //    ? []
    //    : reviewers.map((pay) => pay.value);

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
  const hasError = (field: keyof IPurchase) => (errors[field] ? true : false);
  return (
    <div>
      <ButtonsRow style={{ margin: "5px 0" }}>
        <SubmitButton ghost style={{ width: 80 }} onClick={handleClickOpen}>
          Update
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
            width: { xs: "100%", md: 280 },
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
          <FormTitle>Update Purchase</FormTitle>
          <FormSubTitle style={{ marginTop: -15 }}>
            Update {data?.name}
          </FormSubTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="addPurchase">
                  Add purchase <sup style={{ color: "#ED3572" }}>*</sup>
                </InputLabel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    aria-label="remove"
                    onClick={handleReducePurchase}
                    sx={{
                      position: "relative",
                      top: 6,
                      left: -2,
                      color: Colors.greyDark,
                      // background: "hotpink",
                    }}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    disabled={addPurchase === 0}
                  >
                    <Remove
                      sx={{
                        fontSize: 18,
                      }}
                    />
                  </IconButton>
                  <TextField
                    id="addPurchase"
                    name="addPurchase"
                    type="number"
                    error={hasError("addPurchase")}
                    helper={errors.addPurchase?.message}
                    register={register}
                    style={{
                      width: 75,
                      paddingLeft: 20,
                      margin: "14px 0 10px 10px",
                    }}
                  />
                  <IconButton
                    aria-label="add"
                    onClick={handleAddPurchase}
                    sx={{
                      position: "relative",
                      top: 5,
                      right: 70,
                      color: Colors.greyDark,
                    }}
                  >
                    <Add
                      sx={{
                        fontSize: 18,
                      }}
                    />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12}>
                <CheckBox
                  id="purchase"
                  htmlFor="purchase"
                  name="purchase"
                  label="Purchased?"
                  register={register}
                />
              </Grid>
            </Grid>
            <div className="line" style={{ marginTop: 80 }}></div>
            <ButtonsRow style={{ padding: "0px 5px 15px 0" }}>
              <CancelButton
                onClick={handleClose}
                style={{ width: 80 }}
                // disabled={handleDiabledButton}
              >
                cancel
              </CancelButton>
              <SubmitButton style={{ width: 80 }}>Save</SubmitButton>
            </ButtonsRow>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
