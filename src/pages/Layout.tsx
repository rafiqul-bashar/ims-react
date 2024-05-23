import Header from "@/components/custom/Header";
import SideBar from "@/components/custom/SideBar";

import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      {/* Main content wrapper */}
      <main className="min-h-screen  flex flex-1 bg-gray-100">
        {/* Left Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Header />
          {/* Children content */}
          <Outlet />
        </div>
      </main>
    </>
  );
}
