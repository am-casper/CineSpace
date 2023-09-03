"use client"
import { useUploadContext } from "@/contexts/UploadContext";

import Upload from "@/components/Upload";
export default function Home() {
  
  const {vidLink} = useUploadContext()
  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h1 className="text-4xl font-bold text-center">CineSpace</h1>
    </main>
  );
}
