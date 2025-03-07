import { Button } from "@/components/ui/button";
import { Home, List, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar, setActiveComponent }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        isMobile ? "w-16" : isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button (Desktop Only) */}
      {!isMobile && (
        <div className="p-4 flex justify-between items-center">
          <Button
            className="bg-gray-800 hover:bg-gray-700 p-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      )}

      {/* Sidebar Items */}
      <nav className="flex flex-col space-y-2 mt-4">
        <Button
          className="w-full justify-start bg-gray-800 hover:bg-gray-700 flex items-center"
          onClick={() => setActiveComponent("FamilyTree")}
        >
          <Home className="h-5 w-5" />
          {!isMobile && isOpen && <span className="ml-2">Family Tree</span>}
        </Button>
        <Button
          className="w-full justify-start bg-gray-800 hover:bg-gray-700 flex items-center"
          onClick={() => setActiveComponent("LandDetails")}
        >
          <List className="h-5 w-5" />
          {!isMobile && isOpen && <span className="ml-2">Land Details</span>}
        </Button>
      </nav>
    </div>
  );
}
