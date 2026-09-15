"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import MetricCards from "@/components/MetricCards";
import InvoiceHistoryTable from "@/components/InvoiceHistoryTable";
import BillingInfoTab from "@/components/BillingInfoTab";
import Footer from "@/components/Footer";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "billing-info">(
    "invoices",
  );
  const [activeNav, setActiveNav] = useState("Billing");

  return (
    <div className="min-h-screen bg-[#f8fafc] flex antialiased selection:bg-blue-100 selection:text-blue-900">
      <Sidebar activeItem={activeNav} setActiveItem={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />

        <main className="flex-1 px-6 sm:px-8 lg:px-10 pb-4 max-w-[1440px] w-full mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 font-sans">
                Billing
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
                Manage your billing information, payment method and view your
                invoices.
              </p>
            </div>

            <div className="mt-1">
              <div className="inline-flex p-1 bg-[#f1f3f6] rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("invoices")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "invoices"
                      ? "bg-white text-[#2563eb] shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Invoices
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("billing-info")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "billing-info"
                      ? "bg-white text-[#2563eb] shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Billing info
                </button>
              </div>
            </div>
          </div>

          <MetricCards />

          {activeTab === "invoices" ? (
            <InvoiceHistoryTable />
          ) : (
            <BillingInfoTab />
          )}

          <div className="mt-auto pt-6">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
