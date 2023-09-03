"use client";
import { useUploadContext } from "@/contexts/UploadContext";

import Upload from "@/components/Upload";
export default function UploadPage() {
  const { vidLink } = useUploadContext();
  return (
    <main className="flex min-h-screen flex-col p-5">
      <h1 className="text-4xl font-bold text-center">CineSpace</h1>
      <div className="w-100 bg-black "><Upload /></div>
      
      <div>{vidLink}</div>
    </main>
  );
}
