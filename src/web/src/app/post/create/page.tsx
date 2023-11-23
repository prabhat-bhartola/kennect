"use client";

import { Box, DialogActions, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import KennectTextField from "@/common/components/kennect_text_field.component";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import PostService from "@/api-sdk/services/post.service";

function CreatePost() {
  const [msg, setMsg] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleSubmit = (values) => {
    setDisableButton(true);
    setLoadingButton(true);

    PostService.post({
      content: values.content,
    })
      .then(() => {
        setMsg("Post Created!");
      })
      .catch(() => {
        setLoadingButton(false);
        setDisableButton(false);
      });

    setLoadingButton(false);
    setDisableButton(false);
  };

  const initialValues = {
    content: "",
  };

  return (
    <Box sx={{ mx: "25%", mt: "10%" }}>
      <Typography variant="h6">New Post</Typography>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Grid container rowSpacing={5}>
              <Grid item xs={12} key="content">
                <KennectTextField
                  fullWidth
                  multiline
                  variant="outlined"
                  rows={5}
                  isDisabled={false}
                  label="Create a new post..."
                  name="content"
                  onChangeHandler={() => setDisableButton(false)}
                />
              </Grid>
            </Grid>
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
              {"Post"}
            </LoadingButton>
          </DialogActions>
        </Form>
      </Formik>
      <Typography>{msg}</Typography>
    </Box>
  );
}

export default CreatePost;
