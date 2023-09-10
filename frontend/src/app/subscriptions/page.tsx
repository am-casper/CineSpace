"use client"
import useSidebarStore from "@/global/sideBarStore";
import { Navbar } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Subscriptions(){
    const sbactive = useSidebarStore((state) => state.sidebarActive);
    const [username, setUsername] = useState<string[]>([])
    useEffect(()=>{
        axios.get("http://localhost:10000/user?username="+"casper").then((res)=>setUsername(res.data[0].subs))
    },[])
    useEffect(()=>{
        console.log(username);
        
    },[username])
    return (
        <>
          <Navbar />
          <main className={`master ${sbactive ? "master-active" : ""}`}>
            
          </main>
        </>
      );
}