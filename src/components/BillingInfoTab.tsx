"use client";

import React from "react";
import { FiCreditCard } from "react-icons/fi";

export default function BillingInfoTab() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#eef4ff] text-[#2563eb] flex items-center justify-center text-lg shrink-0">
          <FiCreditCard className="stroke-[2]" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 leading-tight">
            Billing Information
          </h3>

          <p className="text-xs text-gray-400 font-normal mt-0.5">
            This information will be used for your invoices and tax purposes.
          </p>
        </div>
      </div>

      {/* Billing Information */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="pr-6">
          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Name</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Business name</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Country</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Tax ID</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3">
            <p className="text-xs text-gray-400 mb-1">Postal code</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>
        </div>

        {/* Right Column */}
        <div className="pl-6 border-l border-gray-100">
          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Phone</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Address line 1</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">City</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>

          <div className="py-3">
            <p className="text-xs text-gray-400 mb-1">Additional email</p>
            <p className="text-xs font-medium text-gray-800"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
