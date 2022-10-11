/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "react-select";
import { Colors } from "../themes/colors";
import { Fonts } from "../themes/fonts";

interface RootState {
  vmargin?: string;
  hmargin?: string;
  vpadding?: string;
  hpadding?: string;
  flex?: boolean;
  width?: string;
  height?: string;
  align?: string;
  disabled?: boolean;
  error?: boolean;
  active?: boolean;
  custom?: boolean;
  pointer?: boolean;
  borderBottom?: boolean;
  ghost?: boolean;
}
export const FormsRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  & + & {
    margin-top: 12px;
  }
`;
export const Root = styled.div`
  position: relative;
  width: 100%;
`;
export const SearchIconStyle = styled.span`
  position: absolute;
  top: 12.8px;
  right: 0px;
  height: 36px;
  width: 35px;
  transition: all 150ms linear;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${Colors.primary};
  background: ${Colors.primary} 0% 0% no-repeat padding-box;
  color: ${Colors.disabled};
  cursor: pointer;
  svg {
    margin: auto;
  }
`;
export const NewSearchIconStyle = styled.span`
  position: absolute;
  top: 16px;
  right: auto;
  z-index: 100;
  left: 5px;
  height: 20px;
  transition: all 150ms linear;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  color: inherit;
  svg {
    margin: auto;
  }
`;
export const ShadowedSearchIconStyle = styled.span`
  position: absolute;
  top: 9px;
  right: 0px;
  height: 46px;
  width: 50px;
  transition: all 150ms linear;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 25px 65px #95959540;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${Colors.primary};
  background: ${Colors.primary} 0% 0% no-repeat padding-box;
  color: #fff;
  svg {
    margin: auto;
  }
`;
export const PasswordIcon = styled.span`
  position: absolute;
  top: 14px;
  right: 5px;
  height: 35px;
  width: 35px;
  transition: all 150ms linear;
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #568089;
  svg {
    margin: auto;
    color: inherit;
  }
`;
export const ClearIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 5px;
  height: 35px;
  width: 35px;
  transition: all 150ms linear;
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #568089;
  svg {
    margin: auto;
    color: inherit;
  }
`;
// Input label
export const InputLabel = styled.label<RootState>`
  margin: ${(props) => (props.vmargin ? props.vmargin : 0)}
    ${(props) => (props.hmargin ? props.hmargin : 0)};
  padding: ${(props) => (props.vpadding ? props.vpadding : 0)}
    ${(props) => (props.hpadding ? props.hpadding : 0)};
  display: ${(props) => (props.flex ? "flex" : "block")};
  width: ${(props) => (props.width ? props.width : "100%")};
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : props.pointer ? "pointer" : "text"};
  text-align: left;
  font: normal normal 600 12px/4px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${Colors.labelColor};
  text-transform: normal;
`;

export const FormHelper = styled(FormHelperText)`
  color: ${Colors.error};
  margin-top: -10px;
  font: normal normal normal 0.6rem/18px ${Fonts.primary};
`;
// Text input
export const InputTextElement = styled.input<RootState>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "35px")};
  margin: ${(props) => (props.vmargin ? props.vmargin : "10px")}
    ${(props) => (props.hmargin ? props.hmargin : 0)};
  padding: ${(props) => (props.vpadding ? props.vpadding : "14px")}
    ${(props) => (props.hpadding ? props.hpadding : "10px")};
  font: normal normal normal 12px/10px ${Fonts.primary};
  border: ${(props) =>
    props.disabled
      ? "1px solid #e8ebee"
      : props.error
      ? `1px solid ${Colors.error}`
      : `1px solid ${Colors.borderColor}`};
  border-radius: 8px;
  background: ${(props) =>
    props.disabled ? "#fcfdfe" : "#F9FAFB 0% 0% no-repeat padding-box"};
  color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.38)" : Colors.textColor};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  &:hover {
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.error}`
        : `1px solid ${Colors.primary}`};
    outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.error}`
        : `1px solid ${Colors.primary}`};
    outline: none;
  }
  ::placeholder {
    color: ${Colors.disabled};
    font: normal normal normal 12px/10px ${Fonts.primary};
  }
  & + & {
    margin-top: 2px;
  }
`;
//SEARCH FIELD
//input fields
export const InputSearchElement = styled.input<RootState>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "35px")};
  margin: ${(props) => (props.vmargin ? props.vmargin : "10px")}
    ${(props) => (props.hmargin ? props.hmargin : 0)};
  padding: 14px 10px 14px 30px;
  font: normal normal normal 12px/10px ${Fonts.primary};
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: ${(props) =>
    props.borderBottom === true ? "1px solid #ccc" : "none"};
  background: ${(props) =>
    props.disabled
      ? "#fcfdfe"
      : props.ghost
      ? "transparent 0% 0% no-repeat padding-box"
      : "#FFFFFF 0% 0% no-repeat padding-box"};
  color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.38)" : Colors.textColor};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  &:hover {
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: ${(props) =>
      props.borderBottom === true ? "1px solid #ccc" : "none"};
    outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: ${(props) =>
      props.borderBottom === true ? "1px solid #ccc" : "none"};
    outline: none;
  }
  ::placeholder {
    color: ${Colors.disabled};
    font: normal normal normal 12px/10px ${Fonts.primary};
  }
  & + & {
    margin-top: 2px;
  }
`;
// Text input SERACH
export const SearchInputElement = styled.input<RootState>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "45px")};
  margin: ${(props) => (props.vmargin ? props.vmargin : "10px")}
    ${(props) => (props.hmargin ? props.hmargin : 0)};
  padding: ${(props) => (props.vpadding ? props.vpadding : "16px")}
    ${(props) => (props.hpadding ? props.hpadding : "14px")};
  font: normal normal 600 12px/23px ${Fonts.primary};
  border: 1px solid ${Colors.borderColor};
  border-radius: 8px;
  background: ${(props) =>
    props.disabled ? "#fcfdfe" : "#F9FAFB 0% 0% no-repeat padding-box"};
  text-align: left;
  letter-spacing: 0px;
  color: ${Colors.textColor};
  cursor: text;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  outline: none;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
    border: 1px solid ${Colors.primary};
    outline: none;
  }
  ::placeholder {
    color: ${Colors.disabled};
    font: normal normal 600 12px/23px ${Fonts.primary};
  }
  & + & {
    margin-top: 2px;
  }
`;
//TextArea
export const TextAreaInput = styled.textarea<RootState>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "45px")};
  margin: ${(props) => (props.vmargin ? props.vmargin : "10px")}
    ${(props) => (props.hmargin ? props.hmargin : 0)};
  padding: ${(props) => (props.vpadding ? props.vpadding : "16px")}
    ${(props) => (props.hpadding ? props.hpadding : "14px")};
  min-height: ${(props) => props.height || "56px"};
  font: normal normal normal 12px/16px ${Fonts.primary};
  resize: none;
  border: 1px solid ${Colors.borderColor};
  border-radius: 8px;
  background: ${(props) =>
    props.disabled ? "#fcfdfe" : "#F9FAFB 0% 0% no-repeat padding-box"};
  text-align: left;
  letter-spacing: 0px;
  color: ${Colors.textColor};
  cursor: text;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  outline: none;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
    border: 1px solid ${Colors.primary};
    outline: none;
  }
  ::placeholder {
    color: ${Colors.disabled};
    font: normal normal 600 12px/23px ${Fonts.primary};
  }
  & + & {
    margin-top: 2px;
  }
`;
//Select input
export const SelectInput = styled.select<RootState>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "35px")};
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 5px 14px 5px 15px;
  margin: ${(props) => (props.vmargin ? props.vmargin : "10px")}
    ${(props) => (props.hmargin ? props.hmargin : "0")};
  font: normal normal normal 12px/10px ${Fonts.primary};
  border: ${(props) =>
    props.disabled
      ? "1px solid #e8ebee"
      : props.error
      ? `1px solid ${Colors.error}`
      : `1px solid ${Colors.borderColor}`};
  border-radius: 8px;
  color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.38)" : Colors.textColor};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  line-height: 1.6;
  height: ${(props) => props.height || "35px"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background: url("/images/svgs/angle-down.svg") no-repeat right #f9fafb;
  -webkit-appearance: none;
  background-size: 12px;
  background-position: right 10px top 50%;
  &:hover {
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.error}`
        : `1px solid ${Colors.primary}`};
    outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.error}`
        : `1px solid ${Colors.primary}`};
    outline: none;
  }
  option {
    color: ${Colors.textColor};
    font-size: 12px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 10px #00000027;
  }
  ::placeholder {
    color: ${Colors.disabled};
    font: normal normal normal 12px/10px ${Fonts.primary};
  }
  & + & {
    margin-top: 2px;
  }
`;
// Checkbox input
export const InputOriginalEl = styled.input<RootState>`
  display: none;
  &:checked ~ div {
    background-color: ${(props) =>
      props.disabled ? Colors.disabled : Colors.light};
    border-color: ${(props) =>
      props.disabled ? Colors.disabled : Colors.primary};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    &::after {
      transform: rotate(45deg) scale(1);
    }
  }
`;
export const InputOriginalElCustom = styled.div<RootState>`
  position: absolute;
  top: 4px;
  left: 4px;
  height: 18px;
  width: 18px;
  background: ${Colors.light};
  color: ${Colors.textColor};
  font: normal normal 400 12px/20px ${Fonts.primary};
  border: 1px solid ${Colors.borderColor};
  border-radius: 4px;
  transition: all 0.25s ease-in-out;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    border-color: ${(props) =>
      props.disabled ? Colors.disabled : props.error ? "red" : "#d1d5db"};
    outline: none;
  }
  &::after {
    position: absolute;
    content: "";
    left: 6px;
    top: 4px;
    width: 5px;
    height: 8px;
    border: solid ${Colors.primary};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(0);
    transition: transform 0.25s ease-in-out;
  }
`;

export const InputLabelLabel = styled.span<RootState>`
  margin-left: 30px;
  position: relative;
  top: 0px;
  font: normal normal normal 12px/25px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${(props) => (props.disabled ? Colors.disabled : Colors.textColor)};
`;

// Radio input
export const InputRadioElCustom = styled(InputOriginalElCustom)<RootState>`
  &,
  &::after {
    border-radius: 50%;
  }
  &::after {
    left: 4px;
    top: 4px;
    width: 8px;
    height: 8px;
    background-color: ${Colors.primary};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    color: ${Colors.textColor};
    font: normal normal normal 12px/25px ${Fonts.primary};
    transform: scale(0);
    transition: transform 0.25s ease-in-out;
  }
`;
// General Input wrapper
export const InputElWrapper = styled.fieldset<RootState>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 0;
  padding-bottom: 0px;
  margin: 0;
  margin-bottom: 4px;
  line-height: 0;
  border: 0;
  &:first-of-type {
    padding-right: 8px;
    padding-left: 0;
  }

  &:nth-of-type(n + 2) {
    padding-left: 8px;
    padding-right: 20px;
  }

  &:last-of-type {
    padding-right: 0;
  }

  label,
  input:not(type=checkbox):not(type=radio),
  textarea {
    width: 100%;
  }

  ${(props) =>
    props.active &&
    css`
      label {
        color: ${Colors.primary};
      }

      input,
      textarea {
        border-bottom-color: ${Colors.primary};
      }

      ${InputOriginalElCustom} {
        background-color: ${Colors.light};
        border-color: ${Colors.primary};
        color: ${Colors.textColor};
        &::after {
          transform: rotate(45deg) scale(1);
        }
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      &,
      label,
      input,
      select,
      radio,
      checkbox,
      textarea {
        cursor: not-allowed;
      }

      label {
        color: Colors.disabled;
      }

      input,
      textarea,
      ${InputOriginalElCustom} {
        border-bottom-color: ${Colors.borderColor};
      }
    `}
  ${(props) =>
    props.error &&
    css`
      label {
        color: ${Colors.error};
      }

      input,
      textarea {
        border-bottom-color: ${Colors.error};
      }

      ${InputOriginalElCustom} {
        background: transparent;
        border: 2px solid ${Colors.error};
      }
    `}

  ${(props) =>
    props.custom &&
    css`
      position: relative;
    `}
`;

export const Text = styled.p<RootState>`
  margin: ${(props) => props.vmargin || "2px"}
    ${(props) => props.hmargin || "0"};
  padding: ${(props) => props.vpadding || 0} ${(props) => props.hpadding || 0};
  display: block;
  width: 100%;
  color: ${Colors.textColor};
  font: normal normal normal 12px/18px ${Fonts.primary};
  cursor: text;
  text-transform: none;
  letter-spacing: 0px;
`;
export const PageTitle = styled.h1`
  text-align: left;
  text-transform: capitalize;
  font: normal normal 600 30px/28px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${Colors.greyDark};
`;
export const PageSubTitle = styled.h4`
  text-align: left;
  text-transform: capitalize;
  font: normal normal 400 14px/24px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${Colors.textColor};
`;
export const Goback = styled.h4`
  display: flex;
  text-align: left;
  font: normal normal 600 12px/20px ${Fonts.primary};
  color: ${Colors.disabled};
  cursor: pointer;
  &:hover {
    color: ${Colors.textColor};
  }
`;
export const DeleteTitle = styled.h2<RootState>`
  text-align: ${(props) => props.align || "left"};
  text-transform: normal;
  font: normal normal 600 16px/24px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${(props) => props.color || Colors.cautionText};
  margin-top: 0;
`;
export const FormTitle = styled.h2<RootState>`
  text-align: ${(props) => props.align || "left"};
  text-transform: capitalize;
  font: normal normal 600 24px/36px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${(props) => props.color || Colors.greyDark};
  margin-top: 0;
`;
export const FormSubTitle = styled.h4`
  text-align: left;
  text-transform: capitalize;
  font: normal normal 14px/18px ${Fonts.primary};
  letter-spacing: 0px;
  color: ${Colors.textColor};
  margin-top: 0;
`;
export const MultiSelect = styled(Select)<RootState>`
& .Select__menu{
     background: #FFFFFF 0% 0% no-repeat padding-box;
     border: 1px solid #E5E7EB;
     box-shadow: 0px 2px 16px rgba(17, 24, 39, 0.08);
    border-radius: 8px;
    top:45px;
}
& .Select__multi-value__remove{
    background: ${Colors.primary};
    border-radius: 50%;
    color:#FFF;
    cursor:pointer;
}
& .Select__multi-value__label{
    background: ${Colors.greyLight};
    color:${Colors.textColor};
    border-radius: 8px;
    padding: 0px 10px;
}
& .Select__indicator{
  color: ${Colors.textColor};
}
& .Select__clear-indicator{
   color: ${Colors.textColor};
}
  & .Select__dropdown-indicator{
    color: #6B7280;
  }
   & .Select__option{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    text-align: left;
    font: normal normal normal 12px/20px ${Fonts.primary};
    color: ${Colors.textColor};
    cursor:pointer;
  }
  &.Select__control--is-focused {
   box-shadow:none;
    border: ${(props) =>
      props.disabled
        ? "1px solid #e8ebee"
        : props.error
        ? `1px solid ${Colors.error}`
        : `1px solid ${Colors.primary}`};
         outline: none;
  }
  &.css-1pahdxg-control {
    border-width: 1px;
    border-style: solid;
    box-shadow:none;
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.primary};
    box-shadow:none;
   height: ${(props) => (props.height ? props.height : "20px")};
   outline: none;
  &:hover {
     border-width: 1px;
    border-style: solid;
    box-shadow:none;
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.primary};
         outline: none;
  }
  &:focus {
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.primary};
  }
    :focus-within {
      border-width: 1px;
    border-style: solid;
    box-shadow:none;
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.primary};
         outline: none;
  }
  }
  & .Select__control {
  width: ${(props) => (props.width ? props.width : "100%")};
  min-height: ${(props) => (props.height ? props.height : "35px")};
  margin: ${(props) => (props.vmargin ? props.vmargin : "10px")}
    ${(props) => (props.hmargin ? props.hmargin : 0)};
    ${(props) => (props.hpadding ? props.hpadding : "10px")};
  font: normal normal normal 12px/10px ${Fonts.primary};
    border-width: 1px;
    border-style: solid;
    box-shadow:none;
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.borderColor};
         outline: none;
  border-radius: 8px;
  background: ${(props) =>
    props.disabled ? "#fcfdfe" : "#F9FAFB 0% 0% no-repeat padding-box"};
  color: ${(props) => (props.disabled ? Colors.disabled : Colors.textColor)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  position: relative;
  &:hover {
     border-width: 1px;
    border-style: solid;
    box-shadow:none;
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.primary};
         outline: none;
  }
  &:focus {
    outline: none;
  }
  :focus-within {
     border-width: 1px;
    border-style: solid;
    box-shadow:none;
    border-color: ${(props) =>
      props.disabled
        ? Colors.disabled
        : props.error
        ? Colors.error
        : Colors.primary};
         outline: none;
  }
  ::placeholder {
    color: ${Colors.disabled};
    font: normal normal normal 12px/10px ${Fonts.primary};
  }
  & + & {
    margin-top: 2px;
  }

`;
