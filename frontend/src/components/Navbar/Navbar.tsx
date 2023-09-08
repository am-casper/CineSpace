"use client";
import React, { useState } from "react";
import "@/components/Navbar/navbar.css";
import { Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import useSidebarStore from "@/global/sideBarStore";

function Navbar() {
  const sidebar = useSidebarStore((state) => state.sidebarActive);
  const [search, setSearch] = useState("");
  console.log(search);
  console.log("inside navbar", sidebar);
  return (
    <div
      className={`flex flex-row justify-between w-screen px-5 py-2 bg-white items-center absolute top-0 ${
        sidebar ? "sidebaractiv" : ""
      }`}
    >
      <h1 className="logo">Cinespace</h1>
      <div className="w-4/12 flex flex-row justify-between items-center">
        <input
          className="self-cente w-full h-15 my-0"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="search">
          <Search fontSize="large" className="searchicon" />
        </div>
      </div>
      <div>
        <Avatar src="https://media.licdn.com/dms/image/D4E03AQGI1ZJx1AywYQ/profile-displayphoto-shrink_800_800/0/1665646742212?e=1699488000&v=beta&t=Td2ujhuMGBT5UARVIpY3gbyKxmOeLF6qL7Qw7bCxhM8" />
      </div>
    </div>
  );
}

export default Navbar;
