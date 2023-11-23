"use client";

import {
  Box,
  Card,
  CardContent,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import KennectTextField from "@/common/components/kennect_text_field.component";
import AuthService from "@/api-sdk/services/auth.service";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UserLogin {
  username: string;
  password: string;
}

export default function Login() {
  const { push } = useRouter();

  const handleSubmit = (values: UserLogin) => {
    const data = {
      // username: "prabhat1811",
      // password: "SecretStr",
      username: values.username,
      password: values.password,
    };
    AuthService.signup(data).then((data) => {
      Cookies.set("access_token", data.access_token);
      push("/");
    });
  };

  const initialLoginValues = {
    username: "",
    password: "",
  };

  return (
    <Card
      sx={{
        border: 1,
        borderColor: "#808080",
        borderRadius: "16px",
        mx: { xs: "5%", md: "25%" },
        mt: "10%",
      }}
    >
      <CardContent>
        <Box sx={{ padding: "2.5%", mb: "25px" }}>
          <Typography
            variant="h4"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Login
          </Typography>
        </Box>

        <Formik
          enableReinitialize
          initialValues={initialLoginValues}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Stack sx={{ width: { xs: "100%", md: "50%" } }} spacing={2}>
                <KennectTextField
                  variant="outlined"
                  isDisabled={false}
                  label="Username"
                  name="username"
                  onChangeHandler={() => {}}
                />
                <KennectTextField
                  variant="outlined"
                  isDisabled={false}
                  label="Password"
                  name="password"
                  onChangeHandler={() => {}}
                />
              </Stack>
            </Box>
            <DialogActions sx={{ pt: "25px" }}>
              <LoadingButton
                variant="contained"
                content="Save"
                size="large"
                type="submit"
                disabled={false}
                loading={false}
              >
                {"Login"}
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
