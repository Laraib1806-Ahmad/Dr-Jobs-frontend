"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginSignup() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPass, setShowSignupPass] = useState(false);

  const switchMode = (next: "login" | "signup") => {
    setMode(next);
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    router.replace("/billing");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    setError("");
    router.replace("/billing");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 antialiased selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black tracking-tight text-gray-950 font-sans leading-none">
            Dr.Job
          </h1>
          <span className="text-[11px] text-gray-400 font-medium block mt-1 tracking-normal">
            AI Recruiter
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6">
          <div className="flex p-1 bg-[#f1f3f6] rounded-xl gap-1 w-full mb-6">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-[#2563eb] shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`flex-1 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-[#2563eb] shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>

            <p className="text-xs text-gray-400 font-normal mt-0.5">
              {mode === "login"
                ? "Log in to your account."
                : "Create a new account. It only takes a minute."}
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-600 text-xs font-medium px-3.5 py-2.5 rounded-xl mb-4">
              {error}
            </div>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative flex items-center">
                  <FiMail className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[11px] text-[#2563eb] font-semibold hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative flex items-center">
                  <FiLock className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

                  <input
                    type={showLoginPass ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                    title={showLoginPass ? "Hide password" : "Show password"}
                  >
                    {showLoginPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs mt-2"
              >
                Log In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative flex items-center">
                  <FiUser className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative flex items-center">
                  <FiMail className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative flex items-center">
                  <FiLock className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

                  <input
                    type={showSignupPass ? "text" : "password"}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowSignupPass(!showSignupPass)}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                    title={showSignupPass ? "Hide password" : "Show password"}
                  >
                    {showSignupPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative flex items-center">
                  <FiLock className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs mt-2"
              >
                Create Account
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-5">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="text-[#2563eb] font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-[#2563eb] font-semibold hover:underline cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
