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
import { IProduct } from "../../../../features/types";
import { useApi } from "../../../../hooks/axiosApi";
import styles from "../../../../styles/Inventory.module.css";
import { CancelButton, SubmitButton } from "../../form/buttons";
import { ButtonsRow } from "../../form/buttons/styles";
import MySelect, { Select, TextArea, TextField } from "../../form/textFields";
import { FormTitle, InputLabel } from "../../form/textFields/styles";
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
const FILE_SIZE = 10000000;
const schema = yup
  .object({
    name: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    img: yup
      .mixed()
      .test(
        "required",
        "brand logo is required",
        (value) => value && value.length
      ),
    price: yup.string().required("Price is required"),
    category: yup.string().required("Category is required"),
    brand: yup.string().required("brand is required"),
    expiryDate: yup.string().required("Expiry date is required"),
    discount: yup.string().required("Discount is required"),
  })
  .required();
export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  // const [condition, setCondition] = React.useState<any>(null);
  // const [suggestion, setSuggestion] = React.useState<any>(null);
  const [subcat, setSubcat] = React.useState<any>([]);
  const { data: categories } = useApi("categories");
  const { data: brands } = useApi("brands");
  const { data: conditions } = useApi("inventory-conditions");
  const { data: products, error, isLoading } = useApi("products");
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      img: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      expiryDate: "",
      discount: "",
    },
  });

  const conditionArray = conditions?.map((condition: { name: string }) => {
    return {
      label: condition.name,
      value: condition.name,
    };
  });
  const suggestionArray = products?.map((product: { name: string }) => {
    return {
      label: product.name,
      value: product.name,
    };
  });
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const convert2Base64 = (file: any) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPhoto(reader?.result?.toString());
  //   };
  //   reader.readAsDataURL(file);
  // };
  // const handleChange = (selected: any) => {
  //   setCondition(selected);
  // };
  const handleChange = (e: any) => {
    e.preventDefault();
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("img", reader?.result?.toString());
    };
    reader.readAsDataURL(file);
  };

  // const handleSuggestionChange = (selected: any) => {
  //   setSuggestion(selected);
  // };

  const onSubmit = async (data: IProduct) => {
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
  const img = watch("img");
  const category = watch("category");

  React.useEffect(() => {
    // if (img?.length > 0) {
    //   convert2Base64(img[0]);
    // }
    let choosenCategory = categories?.find(
      (cat: {
        id: number;
        name: string;
        description: string;
        subCategory: { name: string }[];
      }) => cat.name === category
    );
    if (choosenCategory) {
      setSubcat(choosenCategory.subCategory);
    }
  }, [img, category]);

  const hasError = (field: keyof IProduct) => (errors[field] ? true : false);
  return (
    <div>
      <SubmitButton ghost style={{ width: 125 }} onClick={handleClickOpen}>
        <AddIcon /> <span style={{ marginLeft: 8 }}>Add Product</span>
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
          <FormTitle>Add Product</FormTitle>
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
              <Grid item xs={12}>
                <TextArea
                  id="description"
                  htmlFor="description"
                  name="description"
                  label="Description"
                  error={hasError("description")}
                  helper={errors.description?.message}
                  register={register}
                  required
                  // disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>
                  Image <sup style={{ color: "#ED3572" }}>*</sup>
                </InputLabel>

                <div className={styles.imgPreview}>
                  {img === "" ? (
                    <Controller
                      control={control}
                      name="img"
                      render={({ field }) => (
                        <label>
                          <input
                            {...field}
                            type="file"
                            style={{
                              display: "none",
                            }}
                            // accept="image/*"
                            accept={SUPPORTED_FORMAT}
                            onChange={(e) => {
                              handleChange(e);
                              field.onChange(e);
                            }}
                          />
                          <div className={styles.browseImg}>
                            <Link
                              underline="hover"
                              component="span"
                              sx={{
                                cursor: "pointer",
                                color: Colors.primary,
                              }}
                            >
                              Click to browse
                            </Link>

                            <span
                              style={{
                                display: "block",
                              }}
                            >
                              1200 x 1600 recommended, up to 10MB each
                            </span>
                          </div>
                        </label>
                      )}
                    />
                  ) : (
                    <>
                      <img
                        src={img}
                        alt={img}
                        width={"100%"}
                        height={70}
                        // layout="responsive"
                      />
                      <label>
                        <input
                          id="img"
                          name="img"
                          type="file"
                          style={{
                            display: "none",
                          }}
                          // accept="image/*"
                          accept={SUPPORTED_FORMAT}
                          onChange={handleChange}
                        />
                        <div className={styles.browseImg}>
                          <Link
                            underline="hover"
                            component="span"
                            sx={{
                              cursor: "pointer",
                              color: Colors.primary,
                            }}
                          >
                            Change product image
                          </Link>

                          <span
                            style={{
                              display: "block",
                            }}
                          >
                            1200 x 1600 recommended, up to 10MB each
                          </span>
                        </div>
                      </label>
                      {/* <Controller
                        control={control}
                        name="img"
                        render={({ field }) => (
                          <label>
                            <input
                              {...field}
                              type="file"
                              style={{
                                display: "none",
                              }}
                              accept="image/*"
                              // accept={SUPPORTED_FORMAT}
                              onChange={(e) => {
                                handleChange(e);
                                field.onChange(e);
                              }}
                            />
                            <div className={styles.browseImg}>
                              <Link
                                underline="hover"
                                component="span"
                                sx={{
                                  cursor: "pointer",
                                  color: Colors.primary,
                                }}
                              >
                                Change product image
                              </Link>

                              <span
                                style={{
                                  display: "block",
                                }}
                              >
                                1200 x 1600 recommended, up to 10MB each
                              </span>
                            </div>
                          </label>
                        )}
                      /> */}
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="price"
                  htmlFor="price"
                  name="price"
                  type="text"
                  label="Price (₦)"
                  error={hasError("price")}
                  helper={errors.price?.message}
                  register={register}
                  required
                  // disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  id="category"
                  htmlFor="category"
                  name="category"
                  label="Category"
                  error={hasError("category")}
                  helper={errors.category?.message}
                  register={register}
                  required
                  // defaultText=" "
                  // disabled={isLoading}
                >
                  {categories?.map(
                    (cat: {
                      id: number;
                      name: string;
                      description: string;
                      subCategory: { name: string }[];
                    }) => (
                      <option value={cat.name} key={cat.id}>
                        {cat.name}
                      </option>
                    )
                  )}
                </Select>
              </Grid>
              {category !== "" && subcat.length !== 0 ? (
                <Grid item xs={12} md={6}>
                  <Select
                    id="subCategory"
                    htmlFor="subCategory"
                    name="subCategory"
                    label="Sub-Category"
                    register={register}
                    // disabled={isLoading}
                  >
                    {subcat?.map((sub: { name: string }, i: number) => (
                      <option value={sub.name} key={i}>
                        {sub.name}
                      </option>
                    ))}
                  </Select>
                </Grid>
              ) : null}
              <Grid item xs={12} md={6}>
                <Select
                  id="brand"
                  htmlFor="brand"
                  name="brand"
                  label="Brand"
                  error={hasError("brand")}
                  helper={errors.brand?.message}
                  register={register}
                  required
                >
                  {brands?.map(
                    (
                      brand: {
                        name: string;
                        logo: string;
                      },
                      i: number
                    ) => (
                      <option value={brand.name} key={i}>
                        {brand.name}
                      </option>
                    )
                  )}
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="expiryDate"
                  htmlFor="expiryDate"
                  name="expiryDate"
                  type="date"
                  label="Expiry date"
                  error={hasError("expiryDate")}
                  helper={errors.expiryDate?.message}
                  register={register}
                  required
                />
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <TextField
                  id="discount"
                  htmlFor="discount"
                  name="discount"
                  type="text"
                  label="Discount"
                  register={register}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <Select
                  id="package"
                  htmlFor="package"
                  name="package"
                  label="Type of packing"
                  error={hasError("packing")}
                  helper={errors.packing?.message}
                  register={register}
                  required
                >
                  <option value="Bottle">Bottle</option>
                  <option value="Satchet">Satchet</option>
                  <option value="Box">Box</option>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="condition">
                  Condition(s) <sup style={{ color: "#ED3572" }}>*</sup>
                </InputLabel>
                {/* <MySelect
                  value={condition}
                  options={conditionArray}
                  onChange={handleChange}
                /> */}
                <Controller
                  name="condition"
                  control={control}
                  render={({ field: { name, onBlur, onChange, value } }) => (
                    <MySelect
                      // name={name}
                      value={value}
                      // onBlur={onBlur}
                      onChange={onChange}
                      options={conditionArray}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="condition">Suggestion(s)</InputLabel>
                <Controller
                  name="suggestion"
                  control={control}
                  render={({ field: { name, onBlur, onChange, value } }) => (
                    <MySelect
                      // name={name}
                      value={value}
                      // onBlur={onBlur}
                      onChange={onChange}
                      options={suggestionArray}
                    />
                  )}
                />
                {/* <MySelect
                  value={suggestion}
                  options={suggestionArray}
                  onChange={handleSuggestionChange}
                /> */}
              </Grid>
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
              <SubmitButton style={{ width: "120px" }}>Save</SubmitButton>
            </ButtonsRow>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
const SUPPORTED_FORMAT = ["PNG", "JPEG", "JPG"]
  .map(function (x) {
    return "." + x;
  })
  .join(",");
