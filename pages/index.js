"use client";
import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import FamilyTree from "@/components/shared/FamilyTree";
import LandDetails from "@/components/shared/LandDetails";
import { familyData } from "@/data/familyData";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("LandDetails");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        setActiveComponent={setActiveComponent}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "w-full"
        }`}
      >
        {activeComponent === "FamilyTree" && <FamilyTree data={familyData}/>}
        {activeComponent === "LandDetails" && <LandDetails />}
      </div>
    </div>
  );
}
