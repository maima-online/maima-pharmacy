import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled, Switch } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import PropTypes from "prop-types";
// import Select, {
//   InputProps,
//   ValueType,
//   OptionType,
//   OptionsType,
// } from "react-select";
import { components } from "react-select";
import { StyleProps } from "../../../../features/types";
import { AngleDown, SearchIcon } from "../../svgs";
import { Colors } from "../themes/colors";
import { Fonts } from "../themes/fonts";
import {
  ClearIcon,
  FormHelper,
  InputElWrapper,
  InputLabel,
  InputLabelLabel,
  InputOriginalEl,
  InputOriginalElCustom,
  InputRadioElCustom,
  InputSearchElement,
  InputTextElement,
  MultiSelect,
  NewSearchIconStyle,
  PasswordIcon,
  Root,
  SearchIconStyle,
  SearchInputElement,
  SelectInput,
  ShadowedSearchIconStyle,
  TextAreaInput,
} from "./styles";
import makeAnimated from "react-select/animated";

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <CheckBox
          label={props.label}
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <div className="line" style={{ position: "relative", top: 10 }}></div>
        {/* <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label> */}
      </components.Option>
    </div>
  );
};
const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <AngleDown />
    </components.DropdownIndicator>
  );
};

const MultiValue = (props: any) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);
const animatedComponents = makeAnimated();

const SwitchStyle = styled((props: any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: Colors.primary,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const PhoneInputStyle = styled(MuiPhoneNumber)({
  "& .MuiPhoneNumber-flagButton": {
    padding: "6px",
  },
  "& .MuiOutlinedInput-input": {
    boxSizing: "border-box",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    color: Colors.textColor,
    height: "35px",
    width: "100%",
    margin: "10px 0px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s",
    cursor: "pointer",
    font: `normal normal normal 12px/10px ${Fonts.primary}`,

    "& fieldset": {
      border: `1px solid ${Colors.borderColor}`,
    },
    "&:hover fieldset": {
      border: `1px solid ${Colors.primary}`,
    },
    "&.Mui-focused fieldset": {
      border: `1px solid ${Colors.primary}`,
    },
    "&.Mui-error fieldset": {
      borderColor: Colors.error,
    },
    "&:hover .Mui-error fieldset": {
      borderColor: Colors.error,
    },
    "&.Mui-disabled": {
      cursor: "not-allowed",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "#e8ebee",
    },
  },
});
export function TextField({
  id,
  name,
  htmlFor,
  label,
  type,
  onChange,
  disabled,
  helper,
  error,
  register,
  onKeyUp,
  onFocus,
  showClearIcon,
  clearField,
  onKeyDown,
  onKeyPress,
  field,
  accept,
  onBlur,
  required,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>
        {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
      </InputLabel>
      {register ? (
        <InputTextElement
          id={id}
          type={type}
          error={error}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          disabled={disabled}
          onBlur={onBlur}
          accept={accept}
          {...field}
          {...otherProps}
          {...register(name)}
        />
      ) : (
        <InputTextElement
          id={id}
          type="text"
          error={error}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          disabled={disabled}
          onBlur={onBlur}
          accept={accept}
          {...field}
          {...otherProps}
        />
      )}
      {showClearIcon ? (
        <ClearIcon>
          <CancelIcon
            onClick={clearField}
            sx={{
              fontSize: 18,
              cursor: "pointer",
              color: "rgba(17.0, 24.0, 39.0, 0.5) !important",
            }}
          />
        </ClearIcon>
      ) : null}

      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}
export function PhoneInput({
  id,
  htmlFor,
  name,
  value,
  label,
  onChange,
  helper,
  required,
  register,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>
        {" "}
        {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
      </InputLabel>
      {register ? (
        <PhoneInputStyle
          id={id}
          name={name}
          value={value}
          variant="outlined"
          onChange={onChange}
          defaultCountry={"ng"}
          {...otherProps}
          {...register(name)}
        />
      ) : (
        <PhoneInputStyle
          id={id}
          name={name}
          value={value}
          variant="outlined"
          onChange={onChange}
          defaultCountry={"ng"}
          {...otherProps}
        />
      )}
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}
export function TextArea({
  id,
  htmlFor,
  name,
  value,
  label,
  onChange,
  register,
  required,
  helper,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>
        {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
      </InputLabel>
      {register ? (
        <TextAreaInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          cols={50}
          {...otherProps}
          {...register(name)}
        />
      ) : (
        <TextAreaInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          cols={50}
          {...otherProps}
        />
      )}
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}

export function Select({
  id,
  htmlFor,
  children,
  name,
  value,
  label,
  onChange,
  register,
  helper,
  required,
  multiple,
  defaultText,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>
        {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
      </InputLabel>
      {register ? (
        <SelectInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          multiple={multiple}
          label={label}
          {...otherProps}
          {...register(name)}
        >
          <option value="" hidden>
            {defaultText}
          </option>
          {children}
        </SelectInput>
      ) : (
        <SelectInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          multiple={multiple}
          {...otherProps}
        >
          <option value="" hidden>
            {defaultText}
          </option>
          {children}
        </SelectInput>
      )}
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}

export function SelectR({
  id,
  htmlFor,
  children,
  name,
  value,
  label,
  onChange,
  register,
  helper,
  required,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>
        {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
      </InputLabel>
      {register ? (
        <SelectInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
          {...register(name)}
        >
          {children}
        </SelectInput>
      ) : (
        <SelectInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
        >
          {children}
        </SelectInput>
      )}
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}

export function PasswordField({
  style,
  id,
  name,
  htmlFor,
  helper,
  label,
  value,
  disabled,
  showPassword,
  onClick,
  onChange,
  required,
  register,
  ...otherProps
}: StyleProps) {
  return (
    <Root style={style}>
      <InputElWrapper>
        <InputLabel htmlFor={htmlFor}>
          {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
        </InputLabel>
        {register ? (
          <>
            <InputTextElement
              id={id}
              name={name}
              type="password"
              value={value}
              onChange={onChange}
              disabled={disabled}
              {...otherProps}
              {...register(name)}
            />
            <PasswordIcon>
              {showPassword ? (
                <VisibilityOff
                  onClick={onClick}
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Visibility
                  onClick={onClick}
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              )}
            </PasswordIcon>
            <FormHelper>{helper}</FormHelper>
          </>
        ) : (
          <>
            <InputTextElement
              id={id}
              name={name}
              type="password"
              value={value}
              onChange={onChange}
              {...otherProps}
            />
            <PasswordIcon>
              {showPassword ? (
                <VisibilityOff
                  onClick={onClick}
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Visibility
                  onClick={onClick}
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              )}
            </PasswordIcon>
            <FormHelper>{helper}</FormHelper>
          </>
        )}
      </InputElWrapper>
    </Root>
  );
}
PasswordField.propTypes = {
  name: PropTypes.string,
};

export function CheckBox({
  id,
  htmlFor,
  label,
  name,
  value,
  onChange,
  register,
  helper,
  required,
  readOnly,
  defaultChecked,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper custom>
      <InputLabel htmlFor={htmlFor}>
        {register ? (
          <InputOriginalEl
            id={id}
            name={name}
            type="checkbox"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            defaultChecked={defaultChecked}
            {...otherProps}
            {...register(name)}
          />
        ) : (
          <InputOriginalEl
            id={id}
            name={name}
            type="checkbox"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            defaultChecked={defaultChecked}
            {...otherProps}
          />
        )}
        <InputOriginalElCustom />
        {/* {label} */}
        <InputLabelLabel>{label}</InputLabelLabel>
      </InputLabel>
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}

export function SwitchField({
  id,
  name,
  value,
  register,
  onChange,
  helper,
  label,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper>
      {register ? (
        <SwitchStyle
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
          {...register(name)}
        />
      ) : (
        <SwitchStyle
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...otherProps}
        />
      )}
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}

export function RadioButton({
  checked,
  id,
  htmlFor,
  vmargin,
  hmargin,
  name,
  value,
  label,
  onChange,
  required,
  helper,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper custom>
      <InputLabel
        htmlFor={htmlFor}
        pointer
        flex
        vmargin={vmargin}
        hmargin={hmargin}
      >
        <InputOriginalEl
          id={id}
          name={name}
          type="radio"
          value={value}
          onChange={onChange}
          checked={checked}
          {...otherProps}
        />
        <InputRadioElCustom />
        <InputLabelLabel>
          {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
        </InputLabelLabel>
      </InputLabel>
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}
export function Radio({
  checked,
  id,
  htmlFor,
  vmargin,
  hmargin,
  name,
  value,
  label,
  onChange,
  register,
  required,
  helper,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper custom>
      <InputLabel
        htmlFor={htmlFor}
        pointer
        flex
        vmargin={vmargin}
        hmargin={hmargin}
      >
        {register ? (
          <InputOriginalEl
            id={id}
            name={name}
            type="radio"
            value={value}
            onChange={onChange}
            checked={checked}
            {...otherProps}
            {...register(name)}
          />
        ) : (
          <InputOriginalEl
            id={id}
            name={name}
            type="radio"
            value={value}
            onChange={onChange}
            {...otherProps}
          />
        )}
        <InputRadioElCustom />
        <InputLabelLabel>
          {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
        </InputLabelLabel>
      </InputLabel>
      <FormHelper>{helper}</FormHelper>
    </InputElWrapper>
  );
}
export function Search({
  style,
  id,
  name,
  htmlFor,
  label,
  value,
  onChange,
  onClick,
  ...otherProps
}: StyleProps) {
  return (
    <Root style={style}>
      <InputElWrapper>
        <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
        <InputTextElement
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          {...otherProps}
        />
        <SearchIconStyle>
          <SearchIcon onClick={onClick} />
        </SearchIconStyle>
      </InputElWrapper>
    </Root>
  );
}
export function OutlinedSearch({
  style,
  id,
  name,
  htmlFor,
  label,
  value,
  borderBottom,
  onChange,
  onClick,
  ghost,
  ...otherProps
}: StyleProps) {
  return (
    <InputElWrapper style={style}>
      <NewSearchIconStyle>
        <SearchIcon onClick={onClick} />
      </NewSearchIconStyle>
      <InputSearchElement
        ghost={ghost}
        id={id}
        name={name}
        borderBottom={borderBottom}
        type="search"
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </InputElWrapper>
  );
}
export function ShadowedSearch({
  style,
  id,
  name,
  htmlFor,
  label,
  value,
  onClick,
  onChange,
  ...otherProps
}: StyleProps) {
  return (
    <Root style={style}>
      <InputElWrapper>
        <SearchInputElement
          id={id}
          name={name}
          type="search"
          value={value}
          onChange={onChange}
          {...otherProps}
        />
        <ShadowedSearchIconStyle>
          <SearchIcon onClick={onClick} />
        </ShadowedSearchIconStyle>
      </InputElWrapper>
    </Root>
  );
}
export const MultipleSelectField = ({
  id,
  htmlFor,
  name,
  value,
  label,
  required,
  onChange,
  register,
  options,
  isMulti,
  getOptionValue,
  isSearchable,
  closeMenuOnSelect,
  hideSelectedOptions,
  ...otherProps
}: StyleProps) => {
  return (
    <InputElWrapper>
      <InputLabel htmlFor={htmlFor}>
        {label} {required ? <sup style={{ color: "#ED3572" }}>*</sup> : ""}
      </InputLabel>
      {register ? (
        <MultiSelect
          classNamePrefix={"Select"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          options={options}
          isMulti={isMulti}
          getOptionValue={getOptionValue}
          isSearchable={isSearchable}
          hideSelectedOptions={hideSelectedOptions}
          components={{
            IndicatorSeparator: () => null,
          }}
          {...otherProps}
          {...register(name)}
        />
      ) : (
        <MultiSelect
          classNamePrefix={"Select"}
          id={id}
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          isMulti={isMulti}
          getOptionValue={getOptionValue}
          isSearchable={isSearchable}
          hideSelectedOptions={hideSelectedOptions}
          closeMenuOnSelect={closeMenuOnSelect}
          components={{
            IndicatorSeparator: () => null,
          }}
          {...otherProps}
        />
      )}
    </InputElWrapper>
  );
};
const MySelect = (props: any) => {
  if (props.allowSelectAll) {
    return (
      <InputElWrapper>
        <MultiSelect
          classNamePrefix={"Select"}
          options={[props?.allOption, ...props?.options]}
          placeholder=""
          hideSelectedOptions={false}
          allowSelectAll={false}
          closeMenuOnSelect={false}
          isMulti
          onChange={(selected: any) => {
            if (
              selected !== null &&
              selected.length > 0 &&
              selected[selected.length - 1].value === props.allOption.value
            ) {
              return props.onChange(props.options);
            }
            return props.onChange(selected);
          }}
          {...props}
        />
      </InputElWrapper>
    );
  }
  return (
    <InputElWrapper>
      <MultiSelect
        hideSelectedOptions={false}
        allowSelectAll={false}
        closeMenuOnSelect={false}
        isMulti
        classNamePrefix={"Select"}
        placeholder=""
        onBlur={props.onBlur}
        components={{
          Option,
          MultiValue,
          animatedComponents,
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        {...props}
      />
    </InputElWrapper>
  );
};

MySelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
};

export default MySelect;
