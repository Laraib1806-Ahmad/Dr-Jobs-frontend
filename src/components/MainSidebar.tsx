"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiPieChart,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

interface MainSidebarProps {
  activeItem?: string;
  setActiveItem?: (item: string) => void;
}

export default function MainSidebar({
  activeItem,
  setActiveItem,
}: MainSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Billing", icon: FiCreditCard, href: "/billing" },
    { name: "Settings", icon: FiSettings, href: "#" },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col min-h-screen p-4 select-none shrink-0">
      {/* Top Brand / Logo */}
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

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCurrentRoute =
            item.href !== "#" &&
            (item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href));
          const isActive = activeItem
            ? activeItem === item.name
            : isCurrentRoute;

          const content = (
            <>
              <Icon
                className={`text-base shrink-0 ${
                  isActive ? "text-[#2563eb]" : "text-gray-500"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </>
          );

          const className = `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
            isActive
              ? "bg-[#edf3ff] text-[#2563eb] font-semibold"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`;

          if (item.href !== "#") {
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem?.(item.name)}
                className={className}
                title={item.name}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveItem?.(item.name)}
              className={className}
              title={item.name}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
