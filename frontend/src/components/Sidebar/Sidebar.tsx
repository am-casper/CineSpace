"use client";
import React from "react";
import "@/components/Sidebar/sidebar.css";
import {
  History,
  HistoryEduRounded,
  House,
  Menu,
  Subscriptions,
} from "@mui/icons-material";
import useSidebarStore from "@/global/sideBarStore";
function Sidebar() {
  const setSidebar = useSidebarStore((state) => state.setSidebarActive);
  const sidebar = useSidebarStore((state) => state.sidebarActive);
  console.log(sidebar);
  return (
    <div className={` ${sidebar ? "sidebaropen" : "sidebarclose"}`}>
      <div
        className={`menudiv`}
        onClick={() => {
          setSidebar(!sidebar);
        }}
      >
        <Menu className="menu" fontSize="large" />
      </div>
      <div className={`${sidebar ? "optionsopen" : "optionsclose"}`}>
        <div className={`${sidebar ? "optionopen" : "optionclose"}`}>
          <House fontSize="large" />
          <p className="tags">Home</p>
        </div>
        <div className={`${sidebar ? "optionopen" : "optionclose"}`}>
          <History fontSize="large" />
          <p className="tags">History</p>
        </div>
        <div className={`${sidebar ? "optionopen" : "optionclose"}`}>
          <Subscriptions fontSize="large" />
          <p className="tags">Subsciptions</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
