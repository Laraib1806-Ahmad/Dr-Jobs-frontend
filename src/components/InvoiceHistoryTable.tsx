"use client";

import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { HiOutlineDocumentText, HiOutlineArrowDownTray } from "react-icons/hi2";

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  date: string;
  product: string;
  amount: string;
  tax: string;
  status: "completed" | "cancelled";
  method: string;
  hasInvoiceFile: boolean;
}

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "1",
    invoiceId: "INV-20260910-6a900f8b1aa4ce6590042729",
    date: "Aug 27, 2026",
    product: "Enterprise",
    amount: "$ 899",
    tax: "$ 0",
    status: "completed",
    method: "-",
    hasInvoiceFile: true,
  },
  {
    id: "2",
    invoiceId: "-",
    date: "Aug 24, 2026",
    product: "Starter",
    amount: "$ 199",
    tax: "$ 0",
    status: "cancelled",
    method: "-",
    hasInvoiceFile: true,
  },
  {
    id: "3",
    invoiceId: "INV-20260328-69c71ae9fc5b67cf0f02e486",
    date: "Mar 28, 2026",
    product: "-",
    amount: "$ 0",
    tax: "$ 0",
    status: "cancelled",
    method: "FREE",
    hasInvoiceFile: false,
  },
  {
    id: "4",
    invoiceId: "INV-20260227-69a178450acb57f91b0d4228",
    date: "Feb 27, 2026",
    product: "-",
    amount: "$ 208.95",
    tax: "$ 9.95",
    status: "completed",
    method: "-",
    hasInvoiceFile: true,
  },
  {
    id: "5",
    invoiceId: "-",
    date: "Feb 26, 2026",
    product: "-",
    amount: "$ 0",
    tax: "$ 0",
    status: "cancelled",
    method: "FREE",
    hasInvoiceFile: false,
  },
];

// Custom Illustrated Avatar + Cash Icon matching screenshot
function PaymentTypeGraphic() {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6">
      <svg
        viewBox="0 0 28 28"
        className="w-5 h-5 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hair / Head */}
        <circle cx="12" cy="9" r="4.5" fill="#78350f" />
        <circle cx="12" cy="9.5" r="3.5" fill="#fbcfe8" />
        <path
          d="M8.5 8.5C8.5 6.5 10 5 12 5C14 5 15.5 6.5 15.5 8.5C15.5 9 14.5 9.5 13.5 9.5C12 9.5 11 8.5 8.5 8.5Z"
          fill="#451a03"
        />

        {/* Torso / Clothes in Coral / Red */}
        <path
          d="M6 21C6 16.5 8.5 15 12 15C13.5 15 15 15.4 16 16"
          stroke="#e11d48"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Banknote / Card with $ badge */}
        <g transform="translate(11, 13)">
          <rect
            x="0"
            y="0"
            width="12"
            height="8"
            rx="1.5"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="0.8"
          />
          <circle cx="6" cy="4" r="2" fill="#ecfdf5" />
          <text
            x="6"
            y="5.3"
            fontSize="3.8"
            fontWeight="bold"
            textAnchor="middle"
            fill="#065f46"
            fontFamily="sans-serif"
          >
            $
          </text>
        </g>
      </svg>
    </div>
  );
}

function InvoiceDocIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer rounded-sm group"
      title="Download invoice document"
    >
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 stroke-current fill-none stroke-[1.4]"
      >
        <path
          d="M6 3h5.5l3.5 3.5V16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
          strokeLinejoin="round"
        />
        <polyline points="11 3 11 7 15 7" />
        <line x1="7.5" y1="10" x2="12.5" y2="10" strokeLinecap="round" />
        <line x1="7.5" y1="13" x2="10.5" y2="13" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function InvoiceHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "cancelled"
  >("all");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const copyToClipboard = (text: string) => {
    if (text === "-") return;
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    showToast(`Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredInvoices = useMemo(() => {
    return INITIAL_INVOICES.filter((inv) => {
      // Status filter
      if (statusFilter !== "all" && inv.status !== statusFilter) {
        return false;
      }
      // Search filter
      if (searchTerm.trim() !== "") {
        const q = searchTerm.toLowerCase();
        const matchId = inv.invoiceId.toLowerCase().includes(q);
        const matchProduct = inv.product.toLowerCase().includes(q);
        const matchDate = inv.date.toLowerCase().includes(q);
        const matchAmount = inv.amount.toLowerCase().includes(q);
        return matchId || matchProduct || matchDate || matchAmount;
      }
      return true;
    });
  }, [searchTerm, statusFilter]);

  const handleDownloadAll = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(filteredInvoices, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "drjob-invoices-2026.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded all invoices (JSON export)");
  };

  const handleDownloadSingle = (inv: InvoiceItem) => {
    showToast(
      `Downloading invoice for ${inv.product !== "-" ? inv.product : inv.date} (${inv.amount})`,
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 relative">
      {/* Optional Toast Notification */}
      {notification && (
        <div className="absolute top-4 right-6 bg-gray-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg z-50 animate-fade-in flex items-center gap-2">
          <FiCheck className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header with Icon, Title, and Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4">
        {/* Left: Icon & Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#eef4ff] text-[#3b82f6] flex items-center justify-center shrink-0">
            <HiOutlineDocumentText className="text-xl stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight leading-tight">
              Invoice History
            </h2>
            <p className="text-xs text-gray-400 font-normal mt-0.5">
              Review past payments, download invoices and track billing status.
            </p>
          </div>
        </div>

        {/* Right: Search, Filter, Download All */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search invoice ID"
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 w-52 sm:w-60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all bg-white"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-normal flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="capitalize">
                {statusFilter === "all" ? "All status" : statusFilter}
              </span>
              <FiChevronDown
                className={`text-gray-400 text-xs transition-transform duration-150 ${
                  statusDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {statusDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-30">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("all");
                    setStatusDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                    statusFilter === "all"
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  All status
                  {statusFilter === "all" && (
                    <FiCheck className="text-blue-600 text-xs" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("completed");
                    setStatusDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                    statusFilter === "completed"
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  Completed
                  {statusFilter === "completed" && (
                    <FiCheck className="text-emerald-600 text-xs" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("cancelled");
                    setStatusDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 cursor-pointer flex items-center justify-between ${
                    statusFilter === "cancelled"
                      ? "text-rose-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  Cancelled
                  {statusFilter === "cancelled" && (
                    <FiCheck className="text-rose-600 text-xs" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Download all button */}
          <button
            type="button"
            onClick={handleDownloadAll}
            className="border border-[#2563eb] hover:bg-blue-50/70 text-[#2563eb] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HiOutlineArrowDownTray className="text-sm stroke-[2]" />
            <span>Download all</span>
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="overflow-x-auto w-full mt-2">
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-600">
              <th className="py-3 px-2 font-medium">Invoice ID</th>
              <th className="py-3 px-2 font-medium">Date (GMT+4)</th>
              <th className="py-3 px-2 font-medium">Product</th>
              <th className="py-3 px-2 font-medium">Transaction amount</th>
              <th className="py-3 px-2 font-medium">Tax amount</th>
              <th className="py-3 px-2 font-medium">Status</th>
              <th className="py-3 px-2 font-medium">Method</th>
              <th className="py-3 px-2 font-medium text-center">Type</th>
              <th className="py-3 px-2 font-medium text-center">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-8 text-center text-gray-400 text-xs"
                >
                  No invoices match your search criteria.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-[#fbfcfd] transition-colors group"
                >
                  {/* Invoice ID */}
                  <td className="py-4 px-2 max-w-[260px]">
                    {inv.invoiceId !== "-" ? (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-sans text-gray-800 tracking-tight truncate cursor-pointer hover:text-blue-600"
                          title={inv.invoiceId}
                          onClick={() => copyToClipboard(inv.invoiceId)}
                        >
                          {inv.invoiceId}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(inv.invoiceId)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-opacity p-0.5 cursor-pointer"
                          title="Copy Invoice ID"
                        >
                          {copiedId === inv.invoiceId ? (
                            <FiCheck className="text-emerald-500 text-xs" />
                          ) : (
                            <FiCopy className="text-xs" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-normal pl-1">-</span>
                    )}
                  </td>

                  {/* Date (GMT+4) */}
                  <td className="py-4 px-2 whitespace-nowrap text-gray-700">
                    {inv.date}
                  </td>

                  {/* Product */}
                  <td className="py-4 px-2 whitespace-nowrap font-medium text-gray-800">
                    {inv.product !== "-" ? (
                      <span>{inv.product}</span>
                    ) : (
                      <span className="text-gray-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Transaction amount */}
                  <td className="py-4 px-2 whitespace-nowrap text-gray-800">
                    {inv.amount}
                  </td>

                  {/* Tax amount */}
                  <td className="py-4 px-2 whitespace-nowrap text-gray-800">
                    {inv.tax}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-2 whitespace-nowrap">
                    {inv.status === "completed" ? (
                      <span className="bg-[#e8f8ef] text-[#10b981] px-3 py-0.5 rounded-full text-[11px] font-medium inline-block">
                        completed
                      </span>
                    ) : (
                      <span className="bg-[#feecec] text-[#f43f5e] px-3 py-0.5 rounded-full text-[11px] font-medium inline-block">
                        cancelled
                      </span>
                    )}
                  </td>

                  {/* Method */}
                  <td className="py-4 px-2 whitespace-nowrap text-gray-700">
                    {inv.method !== "-" ? (
                      <span className="font-semibold text-gray-700">
                        {inv.method}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Type */}
                  <td className="py-4 px-2 whitespace-nowrap text-center">
                    <PaymentTypeGraphic />
                  </td>

                  {/* Invoice */}
                  <td className="py-4 px-2 whitespace-nowrap text-center">
                    {inv.hasInvoiceFile ? (
                      <InvoiceDocIcon
                        onClick={() => handleDownloadSingle(inv)}
                      />
                    ) : (
                      <span className="text-gray-400 font-normal">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer: Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-gray-100 mt-2">
        <span className="text-xs text-gray-400 font-normal">
          Showing {filteredInvoices.length} invoices
        </span>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-[#3b82f6] bg-[#eff6ff] text-[#2563eb] font-semibold flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            1
          </button>

          <button
            type="button"
            disabled
            className="w-7 h-7 rounded-lg border border-gray-200 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-colors"
            aria-label="Next page"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
