"use client";

import Link from "next/link";

import {
  Menu,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function Navbar({
  setSidebarOpen,
}) {
  const router =
    useRouter();

  function handleLogout() {
    localStorage.removeItem(
      "token"
    );

    router.push("/login");
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="md:hidden"
        >
          <Menu size={26} />
        </button>

        <Link
          href="/dashboard"
          className="text-2xl font-bold"
        >
          Finova AI
        </Link>

      </div>

      <button
        onClick={
          handleLogout
        }
        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
      >

        <LogOut size={20} />

        <span className="hidden md:block">
          Logout
        </span>

      </button>

    </header>
  );
}