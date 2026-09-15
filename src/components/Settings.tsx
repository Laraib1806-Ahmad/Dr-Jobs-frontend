"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  FiUser,
  FiLock,
  FiMapPin,
  FiEye,
  FiEyeOff,
  FiCheck,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default function SettingsPage() {
  const [activeNav, setActiveNav] = useState("Settings");

  // Personal Information
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("Human Resources");
  const [location, setLocation] = useState("Abu Dhabi, UAE");
  const [language, setLanguage] = useState("English");
  const [bio, setBio] = useState("");

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      showToast("New Password and Confirm New Password do not match.");
      return;
    }

    showToast("Profile changes saved successfully!");
  };

  const handleReset = () => {
    setFullName("");
    setJobTitle("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDepartment("Human Resources");
    setLocation("Abu Dhabi, UAE");
    setLanguage("English");
    setBio("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    showToast("Form reset.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex antialiased selection:bg-blue-100 selection:text-blue-900">
      <Sidebar activeItem={activeNav} setActiveItem={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />

        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-8 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-fade-in">
            <FiCheck className="text-emerald-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 px-8 lg:px-10 pb-12 max-w-[1380px] w-full mx-auto flex flex-col gap-6">
          {/* Page Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#eef4ff] text-[#2563eb] flex items-center justify-center text-lg shrink-0">
                <FiUser className="stroke-[2]" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900 font-sans leading-tight">
                  Edit Profile
                </h1>

                <p className="text-xs text-gray-400 font-normal mt-0.5">
                  Update your personal information and account settings.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#dbeafe] text-[#1e40af] text-2xl font-bold flex items-center justify-center select-none">
                  {fullName ? fullName.slice(0, 2).toUpperCase() : "?"}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
                  {fullName || "Your Name"}
                </h2>

                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  {jobTitle || "Job Title"}
                  {company ? ` at ${company}` : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Side */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 space-y-5">
                <div className="flex items-center gap-2.5">
                  <HiOutlineDocumentText className="text-[#2563eb] text-lg stroke-[2]" />

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      Personal Information
                    </h3>

                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      This information will be used across the platform.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Full Name <span className="text-rose-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter full name"
                      required
                      className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Job Title <span className="text-rose-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Enter job title"
                      required
                      className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      required
                      className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      required
                      className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Company
                    </label>

                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Enter company"
                      className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Department
                    </label>

                    <div className="relative">
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white cursor-pointer"
                      >
                        <option value="Human Resources">Human Resources</option>
                        <option value="Recruitment">Recruitment</option>
                        <option value="Talent Acquisition">
                          Talent Acquisition
                        </option>
                        <option value="Operations">Operations</option>
                      </select>

                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                        ▾
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Location
                    </label>

                    <div className="relative">
                      <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />

                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-8 py-2.5 text-gray-900 font-medium appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white cursor-pointer"
                      >
                        <option value="Abu Dhabi, UAE">Abu Dhabi, UAE</option>
                        <option value="Dubai, UAE">Dubai, UAE</option>
                        <option value="Sharjah, UAE">Sharjah, UAE</option>
                        <option value="Ajman, UAE">Ajman, UAE</option>
                        <option value="Doha, Qatar">Doha, Qatar</option>
                        <option value="Riyadh, Saudi Arabia">
                          Riyadh, Saudi Arabia
                        </option>
                        <option value="Jeddah, Saudi Arabia">
                          Jeddah, Saudi Arabia
                        </option>
                        <option value="Other">Other</option>
                      </select>

                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                        ▾
                      </span>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Language
                    </label>

                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-medium appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="French">French</option>
                      </select>

                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                        ▾
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About You */}
              <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <HiOutlineDocumentText className="text-[#2563eb] text-lg stroke-[2]" />

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      About You
                    </h3>

                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      Share a short description about yourself (optional).
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Bio
                  </label>

                  <textarea
                    rows={3}
                    maxLength={500}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    className="w-full text-xs border border-gray-200 rounded-xl p-3.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white resize-y"
                  />

                  <div className="flex justify-end">
                    <span className="text-[11px] text-gray-400 font-normal">
                      {bio.length}/500
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <HiOutlineDocumentText className="text-sm stroke-[2]" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Right Side - Change Password */}
            <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FiLock className="text-[#2563eb] text-sm" />

                <h3 className="text-sm font-bold text-gray-900">
                  Change Password
                </h3>
              </div>

              <div className="space-y-3 pt-1">
                {/* Current Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700">
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 pr-9 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                      title={
                        showCurrentPass ? "Hide password" : "Show password"
                      }
                    >
                      {showCurrentPass ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 pr-9 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                      title={showNewPass ? "Hide password" : "Show password"}
                    >
                      {showNewPass ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700">
                    Confirm New Password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 pr-9 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                      title={
                        showConfirmPass ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
