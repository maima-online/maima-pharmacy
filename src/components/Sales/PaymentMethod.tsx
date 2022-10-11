import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Link } from "@mui/material";
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
import { FormTitle, InputLabel } from "../form/textFields/styles";
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
  return <Slide direction="up" ref={ref} {...props} />;
});
const schema = yup
  .object({
    method: yup.string().required("Product name is required"),
  })
  .required();
export default function AddPaymentMethod() {
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
        <SubmitButton
          onClick={handleClickOpen}
          style={{ width: 120, float: "right" }}
        >
          Proceed
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
            width: { xs: "100%", md: 400 },
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
          <FormTitle>Select Payment Method</FormTitle>
          <div className="line" style={{ margin: "30px 0" }}></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {methods?.map(
                  (meth: { id: number; name: string; description: string }) => {
                    return (
                      <div
                        className={
                          selectedValue === meth.id
                            ? styles.catCardSelected
                            : styles.catCard
                        }
                        key={meth.id}
                      >
                        <div
                          className={styles.cardContent}
                          style={{ padding: "12px 10px" }}
                        >
                          <div className={styles.radioDescription}>
                            <RadioButton
                              checked={selectedValue === meth.id}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, meth.id)}
                              value={meth.name}
                              name="method"
                              vmargin="-15px"
                              hmargin="4px"
                              label={
                                <Box component="h3" className={styles.heading}>
                                  {meth.name}
                                  <Box
                                    component="span"
                                    className={styles.subheading}
                                  >
                                    {meth.description}
                                  </Box>
                                </Box>
                              }
                              register={register}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </Grid>
            </Grid>
            <div className="line" style={{ marginTop: 100 }}></div>
            <ButtonsRow style={{ padding: "0px 0 15px" }}>
              <CancelButton
                onClick={handleClose}
                style={{ width: "120px" }}
                // disabled={handleDiabledButton}
              >
                cancel
              </CancelButton>
              <SubmitButton style={{ width: "120px" }}>Proceed</SubmitButton>
            </ButtonsRow>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
