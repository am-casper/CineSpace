"use client";
import { useUploadContext } from "@/contexts/UploadContext";
import { openUploadWidget } from "@/utils/CloudinaryService";

const ImageUpload = () => {
  const { setVidLink } = useUploadContext();
  const cloudName = "cinespace";
  const uploadPreset = "cs_upload";
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        resourceType: "video",
        clientAllowedFormats: [
          "mov",
          "mp4",
          "mkv",
          "wmv",
          "avi",
          "avchd",
          "webm",
        ],
        sources: ["local"],
        styles: {
          palette: {
              window: "#B99763",
              sourceBg: "#FFEBCD",
              windowBorder: "#B99763",
              tabIcon: "#cc6600",
              inactiveTabIcon: "#E8D5BB",
              menuIcons: "#ebe5db",
              link: "#ffb107",
              action: "#FFEBCD",
              inProgress: "#99cccc",
              complete: "#78b3b4",
              error: "#ff6666",
              textDark: "#4C3F3F",
              textLight: "#D8CFCF"
          }
      }
      },
      function (error: any, result: any) {
        if (!error && result.event === "success") {
          console.log(result);
          setVidLink(result.info.secure_url);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="" onClick={uploadImageWidget}>
      Upload your Video
    </button>
  );
};

export default ImageUpload;
