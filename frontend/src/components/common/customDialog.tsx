
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export const CustomDialog  = (props:any) => {

  return (
    <Dialog
    open={props.show}
    onClose={props.close}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {props.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
       <img width={'500px'} height={'500px'} src='https://firebasestorage.googleapis.com/v0/b/vehicle-management-platform.appspot.com/o/images%2Fvehicle%20-%20revenue_licences%2F20240430_201138_Vehicle%20Revenue%20License.jpg?alt=media&token=dcc374df-9c67-4662-93c2-b0564980cab0'/>
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

