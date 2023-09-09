"use client";
import { useUploadContext } from "@/contexts/UploadContext";

import Upload from "@/app/components/VideoUpload";
import Navbar from "@/components/Navbar/Navbar";
import Videotypeone from "@/components/Video/Videotypeone";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/main.css";
export default function Home() {
  const {VidpublicId: vidLink} = useUploadContext()
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}></main>
    </>
  );
}
