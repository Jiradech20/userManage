"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token
    router.push("/login"); // พาไปหน้า login
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6">My Sidebar</h2>
      <nav className="flex flex-col gap-4">
        <a href="/users" className="hover:bg-gray-700 px-3 py-2 rounded">
          Users
        </a>
        <button
          onClick={handleLogout}
          className="text-left hover:bg-gray-700 px-3 py-2 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
