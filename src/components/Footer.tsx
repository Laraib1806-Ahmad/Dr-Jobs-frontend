"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center justify-between py-6 px-1 text-xs text-gray-400 gap-3 select-none">
      <div>
        <span>© 2026 Dr.Job FZ LLC. All Rights Reserved.</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#terms" className="hover:text-gray-600 transition-colors">
          Terms
        </a>
        <a href="#privacy" className="hover:text-gray-600 transition-colors">
          Privacy
        </a>
        <a href="#help" className="hover:text-gray-600 transition-colors">
          Help
        </a>
      </div>
    </footer>
  );
}
