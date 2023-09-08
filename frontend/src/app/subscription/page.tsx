"use client";
import Navbar from "@/components/Navbar/Navbar";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/main.css";
export default function Subsciptions() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
        <h1>Subsciptions</h1>
        <h1>Subsciptions</h1>
        <h1>Subsciptions</h1>
      </main>
    </>
  );
}
