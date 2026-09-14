"use client";

import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiHelpCircle, FiChevronDown, FiCheck } from "react-icons/fi";

export default function TopHeader() {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const [hasUnread, setHasUnread] = useState(true);

  const languages = ["EN", "AR", "FR", "ES"];

  return (
    <header className="w-full flex items-center justify-end py-3 px-6 gap-3 select-none">
      <div className="relative">
        <button
          type="button"
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          className="border border-gray-200/90 bg-white hover:bg-gray-50 text-gray-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <span>{selectedLang}</span>
          <FiChevronDown
            className={`text-gray-400 text-xs transition-transform duration-150 ${
              langMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {langMenuOpen && (
          <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-30">
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
                {selectedLang === lang && (
                  <FiCheck className="text-blue-600 text-xs" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
