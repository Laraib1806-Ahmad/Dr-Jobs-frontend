"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FiChevronDown, FiCreditCard, FiUser, FiLogOut } from "react-icons/fi";

export default function MainTopHeader() {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const [hasNotification, setHasNotification] = useState(true);

  const languages = ["EN", "AR", "FR", "ES"];

  return (
    <header className="w-full flex items-center justify-end py-3 px-8 gap-4 select-none">
      {/* Notification Bell */}
      <button
        type="button"
        onClick={() => setHasNotification(false)}
        className="relative p-2 text-gray-600 hover:text-gray-950 hover:bg-white rounded-full transition-colors cursor-pointer"
        title="Notifications"
        aria-label="Notifications"
      >
        <IoNotificationsOutline className="text-xl" />
        {hasNotification && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        )}
      </button>

      {/* Messages Chat Icon */}
      <button
        type="button"
        className="p-2 text-gray-600 hover:text-gray-950 hover:bg-white rounded-full transition-colors cursor-pointer"
        title="Messages"
        aria-label="Messages"
      >
        <HiOutlineChatBubbleLeftRight className="text-xl" />
      </button>

      {/* Language Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setLangMenuOpen(!langMenuOpen);
            setProfileMenuOpen(false);
          }}
          className="bg-transparent hover:bg-white text-gray-700 px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>{selectedLang}</span>
          <FiChevronDown
            className={`text-gray-400 text-xs transition-transform duration-150 ${
              langMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {langMenuOpen && (
          <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-40">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setSelectedLang(lang);
                  setLangMenuOpen(false);
                }}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 flex items-center justify-between text-gray-700 cursor-pointer"
              >
                <span>{lang}</span>
                {selectedLang === lang && <span className="text-blue-600">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Profile Block */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setProfileMenuOpen(!profileMenuOpen);
            setLangMenuOpen(false);
          }}
          className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white transition-colors cursor-pointer"
        >
          {/* Circular avatar with SA */}
          <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1e40af] font-bold text-xs flex items-center justify-center shrink-0">
            SA
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-gray-900 leading-tight">
              Sarah Ahmed
            </span>
            <span className="text-[10px] text-gray-400 leading-tight">
              Recruiter
            </span>
          </div>

          <FiChevronDown
            className={`text-gray-400 text-xs ml-1 transition-transform duration-150 ${
              profileMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Profile Dropdown Menu */}
        {profileMenuOpen && (
          <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 z-40">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-900">Sarah Ahmed</p>
              <p className="text-[10px] text-gray-400">sarah.ahmed@dreamcom.ae</p>
            </div>

            <Link
              href="/"
              onClick={() => setProfileMenuOpen(false)}
              className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <FiUser className="text-gray-400" />
              <span>Edit Profile</span>
            </Link>

            <Link
              href="/billing"
              onClick={() => setProfileMenuOpen(false)}
              className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <FiCreditCard className="text-gray-400" />
              <span>Billing & Invoices</span>
            </Link>

            <div className="border-t border-gray-100 my-1" />

            <button
              type="button"
              onClick={() => setProfileMenuOpen(false)}
              className="w-full px-3 py-2 text-xs text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer"
            >
              <FiLogOut className="text-rose-500" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
