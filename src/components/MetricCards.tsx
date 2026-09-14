"use client";

import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FaCrown } from "react-icons/fa6";

export default function MetricCards() {
  const cards = [
    {
      id: "total-billed",
      label: "Total billed this year",
      value: "$1,406.95",
      icon: HiOutlineDocumentText,
      iconBg: "bg-[#eef4ff]",
      iconColor: "text-[#3b82f6]",
    },
    {
      id: "successful-payments",
      label: "Successful payments",
      value: "3",
      icon: FiCheckCircle,
      iconBg: "bg-[#ebfbf3]",
      iconColor: "text-[#10b981]",
    },
    {
      id: "cancelled-invoices",
      label: "Cancelled invoices",
      value: "2",
      icon: FiXCircle,
      iconBg: "bg-[#fef2f2]",
      iconColor: "text-[#ef4444]",
    },
    {
      id: "active-plan",
      label: "Active plan",
      value: "Enterprise",
      icon: FaCrown,
      iconBg: "bg-[#f5f3ff]",
      iconColor: "text-[#8b5cf6]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:shadow-[0_3px_8px_rgba(0,0,0,0.04)] transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${card.iconBg} ${card.iconColor}`}
            >
              <Icon className="text-xl stroke-[1.8]" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-500 font-medium tracking-normal truncate">
                {card.label}
              </span>
              <span className="text-2xl font-bold text-gray-900 tracking-tight mt-0.5 truncate">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
