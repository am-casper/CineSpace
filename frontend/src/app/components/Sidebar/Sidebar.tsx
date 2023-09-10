"use client";
import React from "react";
import "@/components/Sidebar/sidebar.css";
import { History, House, Menu, Subscriptions } from "@mui/icons-material";
import useSidebarStore from "@/global/sideBarStore";
import { useRouter } from "next/navigation";

function Sidebar() {
  const router = useRouter();

  const setSidebar = useSidebarStore((state) => state.setSidebarActive);
  const sidebar = useSidebarStore((state) => state.sidebarActive);
  return (
    <div className={`z-30 ${sidebar ? "sidebaropen" : "sidebarclose"}`}>
      <div
        className={`z-50 menudiv`}
        onClick={() => {
          setSidebar(!sidebar);
        }}
      >
        <Menu className="menu" fontSize="large" />
      </div>
      <div className={`${sidebar ? "optionsopen" : "optionsclose"}`}>
        <div
          className={`${sidebar ? "optionopen" : "optionclose"}`}
          onClick={() => {
            router.push("/");
          }}
        >
          <House fontSize="large" />
          <p className="tags">Home</p>
        </div>
        <div
          onClick={() => {
            router.push("/history");
          }}
          className={`${sidebar ? "optionopen" : "optionclose"}`}
        >
          <History fontSize="large" />
          <p className="tags">History</p>
        </div>
        <div
          onClick={() => {
            router.push("/subscription");
          }}
          className={`${sidebar ? "optionopen" : "optionclose"}`}
        >
          <Subscriptions fontSize="large" />
          <p className="tags">Subsciptions</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
