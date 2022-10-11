import { IconButton, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useRef } from "react";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": { padding: "10px 24px", borderRadius: "2px" },
  "& label.Mui-focused": {
    color: "#2651A3",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#2651A3",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2651A3",
    },
    "&:hover fieldset": {
      borderColor: "#2651A3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2651A3",
    },
  },
});
function NumericInput({
  available,
  value,
  setValue,
  onChange = () => null,
}: {
  available: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onChange?: (value: number) => void;
}) {
  const inputRef = useRef(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const updatedValue = value < 1 ? 1 : value;
    setValue(updatedValue);
    onChange(updatedValue);
  };

  const handleIncrement = () => {
    const updatedValue = value + 1;
    setValue(updatedValue);
    onChange(updatedValue);
  };

  const handleDecrement = () => {
    const updatedValue = value - 1;
    setValue(updatedValue);
    onChange(updatedValue);
  };

  return (
    <CustomTextField
      ref={inputRef}
      size="small"
      type="number"
      value={value}
      onChange={handleChange}
      inputProps={{
        min: 1,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton disabled={value === 1} onClick={handleDecrement}>
              −
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={value >= Number(available)}
              onClick={handleIncrement}
            >
              +
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          maxWidth: 170,
          color: "#282828",
          "input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
          },
        },
      }}
    />
  );
}

export default NumericInput;
