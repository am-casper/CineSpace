"use client";
import { useUploadContext } from "@/contexts/UploadContext";
import ImageUpload from "@/components/Upload";
import ReactPlayer from "react-player";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { SeekBackwardIcon, SeekForwardIcon } from "@vidstack/react/icons";

export default function UploadPage() {
  const { vidLink } = useUploadContext();



  

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
          <ImageUpload />
        </div>
        <div className="flex justify-center items-center">
          <button type="submit" className=" upload-btn ">
            <div className="px-5">Upload Video</div>
          </button>
        </div>
      </div>
      <div>{vidLink}</div>
     
    </main>
  );
}
