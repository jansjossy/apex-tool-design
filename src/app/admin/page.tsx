"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Lock, Save, Plus, Trash2, LogOut, CheckCircle, Database } from "lucide-react";
import { fetchPortfolioData, updatePortfolioData, verifyAdminPassword } from "./actions";
import { PortfolioData, Project, Service } from "@/lib/db";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  // Load state and checks on load
  useEffect(() => {
    // Check if authenticated in sessionStorage
    const authStatus = sessionStorage.getItem("apex_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadPortfolioData();
    }

    // Check if firebase is configured in environment
    const hasFirebase = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
    setIsFirebaseConfigured(hasFirebase);
  }, []);

  const loadPortfolioData = async () => {
    try {
      const portfolio = await fetchPortfolioData();
      setData(portfolio);
    } catch (error) {
      console.error("Failed to load portfolio:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const isCorrect = await verifyAdminPassword(password);
    if (isCorrect) {
      setIsAuthenticated(true);
      sessionStorage.setItem("apex_admin_auth", "true");
      loadPortfolioData();
    } else {
      setLoginError("INVALID ACCESS CODE");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("apex_admin_auth");
    setPassword("");
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setSaveMessage("");

    try {
      const success = await updatePortfolioData(data);
      if (success) {
        setSaveMessage("CONFIGURATION SAVED SUCCESSFULLY");
      } else {
        if (!isFirebaseConfigured) {
          setSaveMessage("SAVED IN MEMORY (LOCAL FALLBACK MODE - SET FIRESTORE ENVIRONMENT KEYS TO PERSIST REMOTELY)");
        } else {
          setSaveMessage("ERROR SAVING TO DATABASE");
        }
      }
    } catch (error) {
      console.error("Save error:", error);
      setSaveMessage("FATAL SAVE EXCEPTION");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(""), 5000);
    }
  };

  // State handlers for editing
  const handleHeroChange = (field: string, val: string) => {
    if (!data) return;
    setData({
      ...data,
      hero: { ...data.hero, [field]: val },
    });
  };

  const handleProfileChange = (field: string, val: string) => {
    if (!data) return;
    setData({
      ...data,
      profile: { ...data.profile, [field]: val },
    });
  };

  const handleHighlightChange = (index: number, val: string) => {
    if (!data) return;
    const newHighlights = [...data.profile.highlights];
    newHighlights[index] = val;
    setData({
      ...data,
      profile: { ...data.profile, highlights: newHighlights },
    });
  };

  const addHighlight = () => {
    if (!data) return;
    setData({
      ...data,
      profile: {
        ...data.profile,
        highlights: [...data.profile.highlights, "New professional profile highlight bullet"],
      },
    });
  };

  const removeHighlight = (index: number) => {
    if (!data) return;
    const newHighlights = data.profile.highlights.filter((_, i) => i !== index);
    setData({
      ...data,
      profile: { ...data.profile, highlights: newHighlights },
    });
  };

  const handleServiceChange = (index: number, field: keyof Service, val: string) => {
    if (!data) return;
    const newServices = [...data.services];
    newServices[index] = { ...newServices[index], [field]: val };
    setData({ ...data, services: newServices });
  };

  const handleProjectChange = (index: number, field: keyof Project, val: string) => {
    if (!data) return;
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: val };
    setData({ ...data, projects: newProjects });
  };

  const addProject = () => {
    if (!data) return;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "NEW PROJECT TITLE",
      client: "CLIENT NAME / APPLICATION",
      description: "Enter CAD layout details, structural details, and mechanism analysis here.",
      image: "/assets/precision_mould.png",
      scale: "1:1",
      dwg: "CADVIEWER_V1.2_FILENAME.dwg",
      tag: "PRECISION",
    };
    setData({
      ...data,
      projects: [...data.projects, newProj],
    });
  };

  const removeProject = (index: number) => {
    if (!data) return;
    const newProjects = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: newProjects });
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-industrial-50/50 cad-grid-bg p-4">
        <div className="w-full max-w-sm bg-white border border-industrial-300 p-6 rounded-lg tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br relative shadow-md">
          <div className="font-technical text-[10px] text-industrial-400 uppercase tracking-widest border-b border-industrial-200 pb-3 mb-6 flex items-center">
            <Lock className="w-4 h-4 mr-2 text-primary" />
            ADMINISTRATOR_LOGON
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                Enter System Access Code
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded text-industrial-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-center tracking-widest"
                placeholder="••••••••••••••"
              />
            </div>

            {loginError && (
              <p className="font-technical text-[10px] text-red-500 uppercase text-center">
                ** {loginError} **
              </p>
            )}

            <button
              type="submit"
              className="w-full font-technical text-xs font-bold tracking-wider bg-primary hover:bg-primary-light text-white p-2.5 rounded transition-colors flex items-center justify-center shadow-sm"
            >
              AUTHENTICATE_SYSTEM
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center font-technical text-xs text-industrial-400">
        LOADING_SYSTEM_CONFIGURATION_DATA...
      </div>
    );
  }

  // Admin Dashboard Workspace
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header bar */}
      <section className="border-b border-industrial-200 py-6 bg-industrial-50/30 cad-grid-bg">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div>
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
              // CONTROL_PANEL
            </span>
            <h1 className="font-authoritative text-2xl font-bold text-industrial-900 tracking-tight">
              CMS Configuration Editor
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="font-technical text-xs border border-industrial-300 hover:border-red-500 hover:text-red-500 px-3 py-1.5 rounded transition-colors bg-white flex items-center shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            DISCONNECT
          </button>
        </div>
      </section>

      {/* Database connection details banner */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div
          className={`border rounded p-3 flex items-center justify-between font-technical text-[11px] ${
            isFirebaseConfigured
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>
              CMS CONNECTION STATUS:{" "}
              <strong>{isFirebaseConfigured ? "FIRESTORE_LIVE" : "LOCAL_FALLBACK_MODE"}</strong>
            </span>
          </div>
          <span className="text-[9px]">
            {isFirebaseConfigured
              ? "All saves will modify the live Firestore instance."
              : "Running in read-only mode locally. Define Firebase config in environment to enable saves."}
          </span>
        </div>
      </div>

      {/* Form sections */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Save Float action */}
        <div className="flex justify-between items-center border border-industrial-200 p-4 rounded bg-white shadow-sm">
          <span className="font-technical text-[10px] text-industrial-500">
            * Verify modifications before executing system save.
          </span>
          <div className="flex items-center space-x-4">
            {saveMessage && (
              <span className="font-technical text-[10px] text-primary-light font-bold">
                {saveMessage}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="font-technical text-xs font-bold bg-primary hover:bg-primary-light disabled:bg-industrial-300 text-white px-5 py-2.5 rounded transition-colors inline-flex items-center shadow-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "SAVING..." : "SAVE CONFIGURATION"}
            </button>
          </div>
        </div>

        {/* Section 1: Hero Configurations */}
        <section className="border border-industrial-200 rounded-lg p-5 space-y-4">
          <h3 className="font-technical text-xs font-bold text-primary tracking-widest uppercase border-b border-industrial-100 pb-2">
            // 1. BRAND & HERO CONFIGURATION
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={data.hero.name}
                onChange={(e) => handleHeroChange("name", e.target.value)}
                className="w-full p-2 border border-industrial-200 rounded font-technical text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={data.hero.tagline}
                onChange={(e) => handleHeroChange("tagline", e.target.value)}
                className="w-full p-2 border border-industrial-200 rounded font-technical text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={data.hero.subtitle}
                onChange={(e) => handleHeroChange("subtitle", e.target.value)}
                className="w-full p-2 border border-industrial-200 rounded font-technical text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                Lead Designer
              </label>
              <input
                type="text"
                value={data.hero.leadDesigner}
                onChange={(e) => handleHeroChange("leadDesigner", e.target.value)}
                className="w-full p-2 border border-industrial-200 rounded font-technical text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Profile bullets */}
        <section className="border border-industrial-200 rounded-lg p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-industrial-100 pb-2">
            <h3 className="font-technical text-xs font-bold text-primary tracking-widest uppercase">
              // 2. PROFESSIONAL PROFILE BULLETS
            </h3>
            <button
              onClick={addHighlight}
              className="font-technical text-[10px] text-primary hover:text-primary-light flex items-center bg-white border border-industrial-200 px-2 py-1 rounded"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              ADD BULLET
            </button>
          </div>

          <div className="space-y-3">
            {data.profile.highlights.map((bullet, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="font-technical text-xs text-industrial-400">[{idx + 1}]</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleHighlightChange(idx, e.target.value)}
                  className="flex-grow p-2 border border-industrial-200 rounded font-sans text-xs focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => removeHighlight(idx)}
                  className="text-industrial-400 hover:text-red-500 p-2 border border-industrial-200 rounded"
                  title="Remove bullet"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Services Offered */}
        <section className="border border-industrial-200 rounded-lg p-5 space-y-4">
          <h3 className="font-technical text-xs font-bold text-primary tracking-widest uppercase border-b border-industrial-100 pb-2">
            // 3. CAPABILITIES &amp; SERVICES
          </h3>
          <div className="space-y-4 divide-y divide-industrial-100">
            {data.services.map((service, idx) => (
              <div key={service.code} className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 first:pt-0">
                <div className="sm:col-span-1">
                  <span className="font-technical text-[9px] text-industrial-400 block mb-1">
                    SERVICE CODE
                  </span>
                  <input
                    type="text"
                    value={service.code}
                    onChange={(e) => handleServiceChange(idx, "code", e.target.value)}
                    className="w-full p-2 border border-industrial-200 rounded font-technical text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-1">
                  <span className="font-technical text-[9px] text-industrial-400 block mb-1">
                    SERVICE TITLE
                  </span>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(idx, "title", e.target.value)}
                    className="w-full p-2 border border-industrial-200 rounded font-technical text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <span className="font-technical text-[9px] text-industrial-400 block mb-1">
                    SERVICE DESCRIPTION
                  </span>
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) => handleServiceChange(idx, "description", e.target.value)}
                    className="w-full p-2 border border-industrial-200 rounded font-sans text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Projects (3D models renders) */}
        <section className="border border-industrial-200 rounded-lg p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-industrial-100 pb-2">
            <h3 className="font-technical text-xs font-bold text-primary tracking-widest uppercase">
              // 4. PORTFOLIO ARCHIVES (3D PROJECTS)
            </h3>
            <button
              onClick={addProject}
              className="font-technical text-[10px] text-primary hover:text-primary-light flex items-center bg-white border border-industrial-200 px-2.5 py-1 rounded shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              ADD NEW PROJECT
            </button>
          </div>

          <div className="space-y-8 divide-y divide-industrial-200">
            {data.projects.map((project, idx) => (
              <div key={project.id} className="pt-6 first:pt-0 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-technical text-xs text-industrial-800 font-bold bg-industrial-100 px-3 py-1 rounded">
                    PROJECT #{idx + 1} // {project.id.toUpperCase()}
                  </span>
                  <button
                    onClick={() => removeProject(idx)}
                    className="font-technical text-[9px] text-red-500 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 px-2 py-1 rounded transition-colors inline-flex items-center"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    REMOVE PROJECT
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                      className="w-full p-2 border border-industrial-200 rounded font-technical text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                      Client / Application
                    </label>
                    <input
                      type="text"
                      value={project.client}
                      onChange={(e) => handleProjectChange(idx, "client", e.target.value)}
                      className="w-full p-2 border border-industrial-200 rounded font-technical text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={project.tag}
                      onChange={(e) => handleProjectChange(idx, "tag", e.target.value)}
                      className="w-full p-2 border border-industrial-200 rounded font-technical text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                      Drawing File (DWG)
                    </label>
                    <input
                      type="text"
                      value={project.dwg}
                      onChange={(e) => handleProjectChange(idx, "dwg", e.target.value)}
                      className="w-full p-2 border border-industrial-200 rounded font-technical text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                      Drawing Scale
                    </label>
                    <input
                      type="text"
                      value={project.scale}
                      onChange={(e) => handleProjectChange(idx, "scale", e.target.value)}
                      className="w-full p-2 border border-industrial-200 rounded font-technical text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                      Image Path
                    </label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) => handleProjectChange(idx, "image", e.target.value)}
                      className="w-full p-2 border border-industrial-200 rounded font-technical text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-technical text-[9px] text-industrial-400 uppercase mb-1">
                    Project Description
                  </label>
                  <textarea
                    rows={3}
                    value={project.description}
                    onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                    className="w-full p-2 border border-industrial-200 rounded font-sans text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
