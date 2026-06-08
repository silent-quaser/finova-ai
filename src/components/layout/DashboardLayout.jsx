"use client";

import {
  useState,
} from "react";

import Navbar from "./Navbar";

import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}) {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div className="min-h-screen">
      
      <Navbar
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <Sidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <main className="pt-24 md:ml-64 px-4 md:px-6 pb-10 transition-all duration-300">
        
        {children}

      </main>

    </div>
  );
}