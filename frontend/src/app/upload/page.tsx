"use client";
import { useUploadContext } from "@/contexts/UploadContext";
import VideoUpload from "@/app/components/VideoUpload";
import ThumbnailUpload from "../components/ImageUpload";

export default function UploadPage() {
  const { VidpublicId: VidpublicId, ImgpublicId: ImgpublicId } = useUploadContext();
  const defaultLink = `https://res.cloudinary.com/cinespace/video/upload/v1693681213/${VidpublicId}.jpg`
  const customLink = `https://res.cloudinary.com/cinespace/image/upload/v1693681213/${ImgpublicId}`
  function handleSubmit(event: any): void {
    //code for uploading to db
  }

  return (
    <main className="flex min-h-screen flex-col p-5">
      <h1 className="text-4xl font-bold text-center">CineSpace</h1>
      <div className="w-100 rounded-xl bg-black ">
        <div className="grid grid-cols-6">
          <div className="text-[blanchedalmond] text-center col-span-5">
            <form>
              <div className="grid grid-cols-6 items-center">
                <label className="flex justify-end mr-2">Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-[100%] upload-input col-span-5"
                />
              </div>
              <div className="grid grid-cols-6 items-center">
                <label className="flex justify-end mr-2">Description</label>
                <textarea
                  name="desc"
                  className="w-[100%] upload-input col-span-5"
                />
              </div>
            </form>
          </div>
          <VideoUpload />
        </div>
        {VidpublicId&&!ImgpublicId&&<img src={defaultLink}></img>}
        {ImgpublicId&&<img src={customLink}></img>}
        <ThumbnailUpload />
        <div className="flex justify-center items-center">
          <button type="submit" className=" upload-btn " onClick={handleSubmit}>
            <div className="px-5">Upload Video</div>
          </button>
        </div>
      </div>
     
    </main>
  );
}
