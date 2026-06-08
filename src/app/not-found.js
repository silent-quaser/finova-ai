"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      
      <div className="text-center">
        
        <h1 className="text-8xl font-bold gradient-text mb-6">
          404
        </h1>

        <h2 className="text-4xl font-bold mb-4">
          Page Not Found
        </h2>

        <p className="text-zinc-400 mb-8 max-w-lg">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link href="/dashboard">
          <button className="finova-button px-8 py-4 rounded-2xl font-semibold">
            Back to Dashboard
          </button>
        </Link>

      </div>

    </div>
  );
}