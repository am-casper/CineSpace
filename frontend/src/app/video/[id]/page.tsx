"use client";
import Navbar from "@/components/Navbar/Navbar";
import useSidebarStore from "@/global/sideBarStore";
import "@/styles/main.css";
import { Video } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  params: id;
}

interface id {
  id: string;
}

export default function History({ params }: Props) {
  const sbactive = useSidebarStore((state) => state.sidebarActive);

  const [video, setVideo] = useState<Video>();
  useEffect(() => {
    axios.get(`http://localhost:8000/video/${params.id}`).then((res) => {
      setVideo(res.data.data.document);
    });
  }, []);
  console.log(video);

  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
        <div className="video-container"></div>
      </main>
    </>
  );
}
