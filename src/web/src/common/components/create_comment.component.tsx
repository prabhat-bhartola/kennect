import { Box, DialogActions, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import KennectTextField from "./kennect_text_field.component";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import CommentService from "@/api-sdk/services/comment.service";

interface Props {
  post_id: string;
  mutate: any;
}

function CreateComment(props: Props) {
  const { post_id, mutate } = props;
  const [disableButton, setDisableButton] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleSubmit = (values) => {
    setDisableButton(true);
    setLoadingButton(true);

    CommentService.post({
      content: values.comment,
      post_id: post_id,
    })
      .then(() => {
        mutate();
      })
      .catch(() => {
        setLoadingButton(false);
        setDisableButton(false);
      });

    setLoadingButton(false);
    setDisableButton(false);
  };

  const initialValues = {
    comment: "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Grid container rowSpacing={5}>
            <Grid item xs={12} key="comment">
              <KennectTextField
                fullWidth
                multiline
                variant="outlined"
                rows={5}
                isDisabled={false}
                label="Create a new comment..."
                name="comment"
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
            {"Comment"}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Formik>
  );
}

export default CreateComment;
