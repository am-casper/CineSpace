import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className="flex">
      <Navbar />
      <Sidebar />
    </main>
  );
}
