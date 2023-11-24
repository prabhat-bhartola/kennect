"use client";

import { SxProps, TextField, TextFieldVariants } from "@mui/material";
import { useField } from "formik";

type Props = {
  variant: TextFieldVariants;
  name: string;
  label: string;
  sx?: SxProps;
  isDisabled: boolean;
  fullWidth: boolean;
  multiline: boolean;
  rows: number;
  onChangeHandler?: () => void;
};

function KennectTextField({
  variant,
  name,
  label,
  sx,
  isDisabled,
  fullWidth,
  multiline,
  rows,
  onChangeHandler,
}: Props) {
  const [field, meta] = useField(name);
  return (
    <TextField
      fullWidth={fullWidth}
      multiline={multiline}
      variant={variant}
      label={label}
      sx={sx}
      disabled={isDisabled}
      rows={rows}
      onChangeCapture={onChangeHandler}
      {...field}
    />
  );
}

KennectTextField.defaultProps = {
  fullWidth: false,
  multiline: false,
  rows: 1,
  onChangeHandler: () => {},
};

export default KennectTextField;
