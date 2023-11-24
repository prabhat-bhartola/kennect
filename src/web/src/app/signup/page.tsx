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
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import UserService from "@/api-sdk/services/user.service";
import Link from "next/link";

interface UserSignup {
  username: string;
  password: string;
}

export default function Signup() {
  const { push } = useRouter();

  const [msg, setMsg] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleSubmit = (values: UserSignup) => {
    setDisableButton(true);
    setLoadingButton(true);

    const data = {
      username: values.username,
      password: values.password,
    };
    UserService.post(data)
      .then((data) => {
        setMsg("User Created!");
      })
      .catch((data) => {
        console.log(data);
        setMsg(data.response.data.detail[0].msg || data.response.data.detail);
        setDisableButton(false);
        setLoadingButton(false);
      });

    setDisableButton(false);
    setLoadingButton(false);
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
            Signup
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
                  onChangeHandler={() => {
                    setDisableButton(false);
                  }}
                />
                <KennectTextField
                  variant="outlined"
                  isDisabled={false}
                  label="Password"
                  name="password"
                  onChangeHandler={() => {
                    setDisableButton(false);
                  }}
                />
              </Stack>
            </Box>
            <DialogActions sx={{ pt: "25px" }}>
              <LoadingButton
                variant="contained"
                content="Save"
                size="large"
                type="submit"
                disabled={disableButton}
                loading={loadingButton}
              >
                {"signup"}
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
        <Typography>
          Already have an account? <Link href={"/login"}>Login</Link>
        </Typography>
        <Typography color="red">{msg}</Typography>
      </CardContent>
    </Card>
  );
}
