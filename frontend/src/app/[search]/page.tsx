"use client";
import Navbar from "@/components/Navbar/Navbar";
import Videotypetwo from "@/components/Video/Videotypetwo";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/search.css";
export default function Search({}) {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}></main>
    </>
  );
}
