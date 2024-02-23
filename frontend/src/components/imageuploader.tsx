import * as React from "react";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface IProps {
  setter?: any;
  name?: string;
  folderName?: string;
}

export const ImageUploader: React.FC<IProps> = ({
  setter,
  name,
  folderName,
}) => {
  const handleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target?.files?.[0];
    if (selectedFile) {
      const timestamp = dayjs().format("YYYYMMDD_HHmmss");

      const modifiedFileName = `${timestamp}_${selectedFile.name}`;

      const storageRef = ref(
        storage,
        `images/${folderName}/${modifiedFileName}`
      );

      try {
        // Upload the image file
        await uploadBytes(storageRef, selectedFile);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        if (downloadURL) {
          toast.info(`Image uploaded to ${folderName} successfully!`);
        }

        // Ensure name is defined before using it as a computed property name
        if (name) {
          setter((prevData: any) => ({
            ...prevData,
            [name]: downloadURL,
          }));
        }

        // Now we can use this downloadURL as needed (e.g., save it to state or database)
        return downloadURL;
      } catch (error) {
        alert(`Error uploading file: ${error}`);
        return null;
      }
    }
  };
  return (
    <Grid item xs={12}>
      {/* {selectedImage && (
        <Box
          sx={{
            border: "1px solid #ddd",
            width: "150px",
            height: "150px",
            mb: 3,
          }}
        >
          <img
            width="150"
            height="150"
            style={{ objectFit: "contain" }}
            alt="not found"
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </Box>
      )} */}

      <Button
        component="label"
        role={undefined}
        variant="outlined"
        sx={{ width: "100%", borderRadius: "none !important" }}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <input
          style={{ display: "none" }}
          type="file"
          name="myImage"
          onChange={handleProfilePictureUpload}
        />
      </Button>
    </Grid>
  );
};
