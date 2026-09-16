"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  FiBriefcase,
  FiUsers,
  FiSearch,
  FiMapPin,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiPlus,
  FiBookmark,
  FiMoreHorizontal,
  FiMail,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiCheck,
  FiAward,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoLogoWhatsapp } from "react-icons/io5";

interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  experienceYears: number;
  status: "Available now" | "Open to offers" | "Currently employed";
  skills: string[];
  extraSkillsCount?: number;
  avatarUrl: string;
  hasVideoCV?: boolean;
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "A.B.C",
    title: "Product Manager",
    company: "Careem",
    location: "UAE",
    experience: "6 years",
    experienceYears: 6,
    status: "Available now",
    skills: [
      "Product Management",
      "Strategy",
      "Agile",
      "User Research",
      "Roadmap",
    ],
    extraSkillsCount: 1,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgOMEYnNJVN47nuWe6Pmhq4kOemkE1JN9B_LNDn1YBQ&s",
    hasVideoCV: true,
  },
];

export default function CandidateSearch() {
  const [activeNav, setActiveNav] = useState("Candidate Search");

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const [quickAvailableNow, setQuickAvailableNow] = useState(false);
  const [quickHasVideoCV, setQuickHasVideoCV] = useState(false);
  const [quickFivePlusExp, setQuickFivePlusExp] = useState(false);

  const [availability, setAvailability] = useState<string>("Any");
  const [filterJobTitle, setFilterJobTitle] = useState("");
  const [filterSkills, setFilterSkills] = useState("");
  const [minExpYears, setMinExpYears] = useState<number>(0);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterEducation, setFilterEducation] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [gender, setGender] = useState<string>("Any");

  const [accordionOpen, setAccordionOpen] = useState({
    availability: true,
    jobTitle: true,
    skills: true,
    experience: true,
    location: true,
    industry: true,
    education: true,
    nationality: true,
  });

  const toggleAccordion = (key: keyof typeof accordionOpen) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"relevant" | "exp-high" | "name">(
    "relevant",
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleShortlist = (cand: Candidate) => {
    setShortlistedIds((prev) => {
      const isAlready = prev.includes(cand.id);
      if (isAlready) {
        showToast(`Removed ${cand.name} from shortlist.`);
        return prev.filter((id) => id !== cand.id);
      } else {
        showToast(`Added ${cand.name} to shortlist.`);
        return [...prev, cand.id];
      }
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setQuickAvailableNow(false);
    setQuickHasVideoCV(false);
    setQuickFivePlusExp(false);
    setAvailability("Any");
    setFilterJobTitle("");
    setFilterSkills("");
    setMinExpYears(0);
    setFilterLocation("");
    setFilterIndustry("");
    setFilterEducation("");
    setFilterNationality("");
    setGender("Any");
    showToast("Filters have been reset.");
  };

  const filteredCandidates = useMemo(() => {
    return INITIAL_CANDIDATES.filter((c) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchSkills = c.skills.some((s) => s.toLowerCase().includes(q));
        const matchCompany = c.company.toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchSkills && !matchCompany)
          return false;
      }

      if (locationQuery.trim() !== "") {
        const loc = locationQuery.toLowerCase();
        if (!c.location.toLowerCase().includes(loc)) return false;
      }

      if (quickAvailableNow && c.status !== "Available now") return false;
      if (quickHasVideoCV && !c.hasVideoCV) return false;
      if (quickFivePlusExp && c.experienceYears < 5) return false;

      if (availability !== "Any" && c.status !== availability) return false;

      if (filterJobTitle.trim() !== "") {
        if (!c.title.toLowerCase().includes(filterJobTitle.toLowerCase()))
          return false;
      }

      if (filterSkills.trim() !== "") {
        const sFilter = filterSkills.toLowerCase();
        const hasSkill = c.skills.some((s) =>
          s.toLowerCase().includes(sFilter),
        );
        if (!hasSkill) return false;
      }

      if (minExpYears > 0 && c.experienceYears < minExpYears) return false;

      if (filterLocation.trim() !== "") {
        if (!c.location.toLowerCase().includes(filterLocation.toLowerCase()))
          return false;
      }

      if (filterIndustry.trim() !== "") {
        if (!c.company.toLowerCase().includes(filterIndustry.toLowerCase()))
          return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "exp-high") return b.experienceYears - a.experienceYears;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [
    searchQuery,
    locationQuery,
    quickAvailableNow,
    quickHasVideoCV,
    quickFivePlusExp,
    availability,
    filterJobTitle,
    filterSkills,
    minExpYears,
    filterLocation,
    filterIndustry,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex antialiased selection:bg-blue-100 selection:text-blue-900">
      <Sidebar activeItem={activeNav} setActiveItem={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />

        {toastMessage && (
          <div className="fixed top-5 right-8 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-fade-in">
            <FiCheck className="text-emerald-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 px-8 lg:px-10 pb-12 max-w-[1440px] w-full mx-auto flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 font-sans leading-tight">
              Candidate Search
            </h1>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Search and filter verified candidates across the region.
            </p>
          </div>

          {/* TOP SEARCH CARD */}
          <div className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Job title, skills, or keywords
                </label>
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-3.5 text-gray-400 text-sm pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Sales Manager, React, Accountant..."
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Location
                </label>
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-3.5 text-gray-400 text-sm pointer-events-none" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="e.g. Dubai, United Arab Emirates..."
                    className="w-full text-xs border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 bg-white"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => showToast("Search applied.")}
                  className="w-full bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs h-[38px]"
                >
                  <FiSearch className="text-xs stroke-[2.5]" />
                  <span>Search Candidates</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-gray-400 font-normal mr-1">
                Quick filters:
              </span>

              <button
                type="button"
                onClick={() => setQuickAvailableNow(!quickAvailableNow)}
                className={`text-xs font-medium px-3.5 py-1 rounded-full transition-all cursor-pointer border ${
                  quickAvailableNow
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-[#edf5ff] text-[#2563eb] border-[#dbeafe] hover:bg-blue-100/70"
                }`}
              >
                Available now
              </button>

              <button
                type="button"
                onClick={() => setQuickHasVideoCV(!quickHasVideoCV)}
                className={`text-xs font-medium px-3.5 py-1 rounded-full transition-all cursor-pointer border ${
                  quickHasVideoCV
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-[#edf5ff] text-[#2563eb] border-[#dbeafe] hover:bg-blue-100/70"
                }`}
              >
                Has video CV
              </button>

              <button
                type="button"
                onClick={() => setQuickFivePlusExp(!quickFivePlusExp)}
                className={`text-xs font-medium px-3.5 py-1 rounded-full transition-all cursor-pointer border ${
                  quickFivePlusExp
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-[#edf5ff] text-[#2563eb] border-[#dbeafe] hover:bg-blue-100/70"
                }`}
              >
                5+ Years Exp
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-medium px-3.5 py-1 rounded-full border border-rose-200 bg-rose-50/70 text-rose-500 hover:bg-rose-100/70 transition-all cursor-pointer ml-auto sm:ml-0"
              >
                Reset filters
              </button>
            </div>
          </div>

          {/* MAIN CONTENT: FILTERS & RESULTS */}
          <div className="flex flex-col lg:flex-row gap-5 items-start mt-1">
            {/* LEFT FILTER PANEL */}
            <div className="w-full lg:w-[270px] bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 shrink-0 flex flex-col gap-4 select-none">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FiFilter className="text-gray-700 text-sm stroke-[2.2]" />
                  <span className="text-xs font-bold text-gray-900">
                    Filters
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-[#2563eb] font-semibold hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("availability")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-blue-600" />
                    </span>
                    <span>Availability</span>
                  </div>
                  {accordionOpen.availability ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.availability && (
                  <div className="flex flex-col gap-2 mt-3 pl-1">
                    {[
                      "Any",
                      "Available now",
                      "Open to offers",
                      "Currently employed",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                      >
                        <input
                          type="radio"
                          name="availability"
                          checked={availability === opt}
                          onChange={() => setAvailability(opt)}
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("jobTitle")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiBriefcase className="text-gray-500 text-xs" />
                    <span>Job title</span>
                  </div>
                  {accordionOpen.jobTitle ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.jobTitle && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={filterJobTitle}
                      onChange={(e) => setFilterJobTitle(e.target.value)}
                      placeholder="Search job titles..."
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("skills")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiCode className="text-gray-500 text-xs" />
                    <span>Skills</span>
                  </div>
                  {accordionOpen.skills ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.skills && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={filterSkills}
                      onChange={(e) => setFilterSkills(e.target.value)}
                      placeholder="Search skills..."
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("experience")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-500 text-xs" />
                    <span>Years of experience</span>
                  </div>
                  {accordionOpen.experience ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.experience && (
                  <div className="mt-3 space-y-2">
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={minExpYears}
                      onChange={(e) => setMinExpYears(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>
                        {minExpYears > 0 ? `${minExpYears} years` : "0 years"}
                      </span>
                      <span>15+ years</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("location")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-gray-500 text-xs" />
                    <span>Location</span>
                  </div>
                  {accordionOpen.location ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.location && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      placeholder="Search location..."
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("industry")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HiOutlineBuildingOffice2 className="text-gray-500 text-xs" />
                    <span>Industry</span>
                  </div>
                  {accordionOpen.industry ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.industry && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={filterIndustry}
                      onChange={(e) => setFilterIndustry(e.target.value)}
                      placeholder="Search industry..."
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("education")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiAward className="text-gray-500 text-xs" />
                    <span>Education level</span>
                  </div>
                  {accordionOpen.education ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.education && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={filterEducation}
                      onChange={(e) => setFilterEducation(e.target.value)}
                      placeholder="Search education..."
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100 pb-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion("nationality")}
                  className="w-full flex items-center justify-between text-xs font-bold text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FiGlobe className="text-gray-500 text-xs" />
                    <span>Nationality</span>
                  </div>
                  {accordionOpen.nationality ? (
                    <FiChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xs" />
                  )}
                </button>

                {accordionOpen.nationality && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={filterNationality}
                      onChange={(e) => setFilterNationality(e.target.value)}
                      placeholder="Search nationality..."
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                  <FiUser className="text-gray-500 text-xs" />
                  <span>Gender</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pl-1">
                  {["Any", "Male", "Female", "Other"].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT RESULTS */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                <div>
                  <h2 className="text-lg font-bold text-gray-950 tracking-tight leading-tight">
                    {filteredCandidates.length} candidates found
                  </h2>
                  <p className="text-xs text-gray-400 font-normal mt-0.5">
                    Showing the most relevant candidates for your search
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-normal">
                      Sort by
                    </span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="border border-gray-200 bg-white rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-gray-700 appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
                      >
                        <option value="relevant">Most relevant</option>
                        <option value="exp-high">
                          Experience: High to Low
                        </option>
                        <option value="name">Name: A to Z</option>
                      </select>
                      <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                {filteredCandidates.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-xs">
                    No candidates match your current search filters.
                  </div>
                ) : (
                  filteredCandidates.map((cand) => {
                    const isSelected = selectedIds.includes(cand.id);
                    const isShortlisted = shortlistedIds.includes(cand.id);

                    return (
                      <div
                        key={cand.id}
                        className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all flex flex-col gap-3.5 group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                              <img
                                src={cand.avatarUrl}
                                alt={cand.name}
                                className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-2xs"
                              />
                            </div>

                            <div>
                              <h3 className="text-base font-bold text-gray-900 tracking-tight leading-tight">
                                {cand.name}
                              </h3>
                              <p className="text-xs text-[#2563eb] font-semibold mt-0.5">
                                {cand.title}
                              </p>

                              <div className="flex flex-wrap items-center gap-3.5 text-xs text-gray-500 mt-1.5 font-normal">
                                <span className="flex items-center gap-1.5">
                                  <FiBriefcase className="text-gray-400 text-xs" />
                                  <span>{cand.company}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <FiMapPin className="text-gray-400 text-xs" />
                                  <span>{cand.location}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <FiUser className="text-gray-400 text-xs" />
                                  <span>{cand.experience}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {cand.status === "Available now" && (
                              <span className="bg-[#ecfdf5] text-[#059669] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                <span>Available now</span>
                              </span>
                            )}
                            {cand.status === "Open to offers" && (
                              <span className="bg-[#eff6ff] text-[#2563eb] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                                <span>Open to offers</span>
                              </span>
                            )}
                            {cand.status === "Currently employed" && (
                              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                                Currently employed
                              </span>
                            )}

                            {/* <button
                              type="button"
                              className="text-gray-400 hover:text-gray-700 p-1 rounded-lg transition-colors cursor-pointer"
                              title="More options"
                            >
                              <FiMoreHorizontal className="text-base" />
                            </button> */}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                          <div className="flex flex-wrap items-center gap-1.5 pl-8 md:pl-8">
                            {cand.skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-[#f3f4f6] text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                            {cand.extraSkillsCount && (
                              <span className="bg-[#f3f4f6] text-gray-500 text-[11px] font-medium px-2 py-1 rounded-md">
                                +{cand.extraSkillsCount}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
                            <button
                              type="button"
                              onClick={() => toggleShortlist(cand)}
                              className={`border text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                                isShortlisted
                                  ? "border-blue-500 bg-blue-50 text-blue-600"
                                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <FiBookmark
                                className={`text-xs ${
                                  isShortlisted
                                    ? "text-blue-600 fill-blue-600"
                                    : "text-gray-400"
                                }`}
                              />
                              <span>Shortlist</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                showToast(`Opening chat with ${cand.name}`)
                              }
                              className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <FiMail className="text-xs text-gray-400" />
                              <span>Message</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                showToast(`Opening WhatsApp for ${cand.name}`)
                              }
                              className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <IoLogoWhatsapp className="text-xs text-emerald-500" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                showToast(`Viewing profile of ${cand.name}`)
                              }
                              className="border border-[#2563eb] hover:bg-blue-50/70 text-[#2563eb] text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>View Profile</span>
                              <FiArrowRight className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-gray-100 mt-2">
                <span className="text-xs text-gray-500 font-normal">
                  Showing 1–10 of {filteredCandidates.length} candidates
                </span>
                <span className="text-xs text-gray-400 font-normal">
                  Showing {filteredCandidates.length} candidates
                </span>

                {/* Pagination */}
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
          </div>
        </main>
      </div>
    </div>
  );
}
