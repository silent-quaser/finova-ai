"use client";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

export default function Navbar({
  setSidebarOpen,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 border-b border-white/10 bg-black/30 backdrop-blur-xl z-50">
      
      <div className="h-full px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          
          <button
            onClick={() =>
              setSidebarOpen(
                (prev) => !prev
              )
            }
            className="md:hidden w-11 h-11 rounded-2xl glass flex items-center justify-center"
          >
            
            <Menu size={22} />

          </button>

          <div>
            
            <h1 className="text-3xl font-bold">
              
              <span className="gradient-text">
                Finova
              </span>{" "}
              AI

            </h1>

            <p className="text-zinc-400 text-sm">
              AI-powered financial platform
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center gap-3 glass px-4 py-2 rounded-2xl">
            
            <Search
              size={18}
              className="text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm placeholder:text-zinc-500 w-44"
            />

          </div>

          <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-cyan-500/10 transition-all">
            
            <Bell
              size={20}
              className="text-cyan-400"
            />

          </button>

        </div>

      </div>

    </header>
  );
}