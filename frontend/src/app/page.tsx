'use client'
import Navbar from "@/components/Navbar/Navbar";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/home.css";
export default function Home() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
    <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
        <h1>Samosa</h1>
        <h1>Samosa</h1>
        <h1>Samosa</h1>
      </main>
    </>
  );
}
