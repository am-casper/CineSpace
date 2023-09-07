import { openUploadWidget } from "@/utils/CloudinaryService";

const ThumbnailUpload=()=>{
    

    function uploadImageWidget(event: any): void {
        let myWidget = openUploadWidget(
        {
          cloudName: 'cinespace',
          uploadPreset: "cs_upload",
          esourceType: "image",
          sources: [ "local", "url"], 
          multiple: false, 
          clientAllowedFormats: ["jpg","jpeg","png","svg"],
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
        (error:any, result:any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
           
          }
        }
      );
      myWidget.open();
    }

      return (
        <div className=" flex justify-center items-center">
        <button className="upload-btn mr-4" onClick={uploadImageWidget}>
          Add your Thumbnail
        </button></div>
      );
}
export default ThumbnailUpload;