import * as React from "react";
import { Box, Button, Grid } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  return (
    <Grid item xs={12}>
    {selectedImage && (
      <Box sx={{border:'1px solid #ddd', width:'150px', height:'150px',mb:3}}>
        <img
         width="150"
         height="150"
         style={{objectFit:'contain'}}
          alt="not found"
          src={URL.createObjectURL(selectedImage)}
        />
        <br />
        {/* <button onClick={() => setSelectedImage(null)}>Remove</button> */}
      </Box>
    )}
    
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      sx={{width:'100%',borderRadius:'none !important'}}
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Image
      <input
      style={{display:'none'}}
      type="file"
      name="myImage"
      onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files != null) {
          setSelectedImage(evt.target.files[0]);
        }
      }}
    />
    </Button>
  </Grid>
  );
};
