"use client";
import Navbar from "@/components/Navbar/Navbar";
import Videotypetwo from "@/components/Video/Videotypetwo";
import useSidebarStore from "@/global/sideBarStore";
import "@/styles/search.css";



interface Props {
  params: search;
}

interface search {
  search: string;
}


export default function Search({params} : Props) {
  console.log(params.search);
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
      </main>
    </>
  );
}
