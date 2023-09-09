"use client";
import Navbar from "@/components/Navbar/Navbar";
import Videotypeone from "@/components/Video/Videotypeone";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/main.css";
export default function Home() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}></main>
    </>
  );
}
