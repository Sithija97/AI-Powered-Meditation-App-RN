import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export const CustomDialog = (props: any) => {
  return (
    <Dialog
      open={props.show}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <img width={"500px"} height={"500px"} src={props.imgUrl} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box mb={2} mr={2}>
          <Button
            onClick={props.close}
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
