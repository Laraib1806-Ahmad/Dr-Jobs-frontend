"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCreditCard, FiSettings } from "react-icons/fi";

interface SidebarProps {
  activeItem?: string;
  setActiveItem?: (item: string) => void;
}

export default function Sidebar({
  activeItem = "Billing",
  setActiveItem,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Billing", icon: FiCreditCard, href: "/billing" },
    { name: "Settings", icon: FiSettings, href: "/settings" },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col min-h-screen p-4 select-none shrink-0">
      <div className="px-2 pt-1 pb-6">
        <Link href="/" className="inline-block">
          <h1 className="text-xl font-black tracking-tight text-gray-950 font-sans leading-none">
            Dr.Job
          </h1>
          <span className="text-[11px] text-gray-400 font-medium block mt-1 tracking-normal">
            AI Recruiter
          </span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem
            ? activeItem === item.name
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem?.(item.name)}
              title={item.name}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                isActive
                  ? "bg-[#edf3ff] text-[#2563eb] font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon
                className={`text-base shrink-0 ${
                  isActive ? "text-[#2563eb]" : "text-gray-500"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
