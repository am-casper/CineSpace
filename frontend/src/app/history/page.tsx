"use client";
import Navbar from "@/components/Navbar/Navbar";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/main.css";
export default function History() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
        <h1>History</h1>
        <h1>History</h1>
        <h1>History</h1>
      </main>
    </>
  );
}
