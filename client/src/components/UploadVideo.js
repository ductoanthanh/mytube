import React from "react";
import { UploadIcon } from "./Icons";
import { uploadMedia } from "../utils/upload-media";
import { useSnackbar } from "react-simple-snackbar";

function UploadVideo() {
  const [openSnackbar] = useSnackbar();

  async function handleUploadVideo(event) {
    event.persist();
    const file = event.target.files[0];

    if (file) {
      const fileSize = file.size / 1000000;

      if (fileSize > 50) {
        return openSnackbar("Video file should be less than 50MB");
      }

      const url = await uploadMedia({
        type: "video",
        file,
        preset: "tnrk1id4"
      });

      console.log(url);
      event.target.value = "";
    }
  }

  return (
    <div>
      <label htmlFor="video-upload">
        <UploadIcon />
      </label>
      <input
        style={{ display: "none" }}
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleUploadVideo}
      />
    </div>
  );
}

export default UploadVideo;
