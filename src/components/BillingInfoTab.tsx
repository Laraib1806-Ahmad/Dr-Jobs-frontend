"use client";

import React, { useState } from "react";
import { FiCreditCard, FiCheck, FiMapPin, FiMail } from "react-icons/fi";

export default function BillingInfoTab() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 space-y-6"></div>
  );
}
