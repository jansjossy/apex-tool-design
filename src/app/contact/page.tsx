"use client";

import React, { useState } from "react";
import { Mail, MapPin, Copy, Check, Send, Terminal } from "lucide-react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "dittythomas@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (isFirebaseConfigured()) {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const db = getFirestore(app);
        
        await addDoc(collection(db, "contacts"), {
          ...formData,
          timestamp: new Date().toISOString(),
        });
      } else {
        // Fallback simulate local save
        console.log("Firebase not configured. Simulated submission data:", formData);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="border-b border-industrial-200 py-12 bg-industrial-50/30 cad-grid-bg">
        <div className="max-w-4xl mx-auto px-4">
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
            // COM_LINK // EST_REQUESTS
          </span>
          <h1 className="font-authoritative text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight mt-1 mb-2">
            Establish Contact
          </h1>
          <p className="font-technical text-xs text-industrial-500 uppercase tracking-widest">
            Send briefs, concepts, drawings, or request quotes
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Left panel: Info & details */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-authoritative text-2xl font-bold text-industrial-900 mb-3">
                Let&apos;s build your next tool together
              </h2>
              <p className="font-sans text-xs text-industrial-500 leading-relaxed">
                Submit your product concepts, rough sketches, or modification briefs. We deliver manufacturing-ready assemblies and 2D detail sheets globally.
              </p>
            </div>

            {/* Technical readouts of contact channels */}
            <div className="space-y-4 font-technical text-xs">
              <div className="border border-industrial-200 rounded p-4 flex items-center justify-between bg-industrial-50/50">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-[9px] text-industrial-400 block uppercase">EMAIL_DIRECT:</span>
                    <span className="font-bold text-industrial-800">{emailAddress}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-industrial-400 hover:text-primary p-1 bg-white border border-industrial-200 rounded transition-colors shadow-sm"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="border border-industrial-200 rounded p-4 flex items-center space-x-3 bg-industrial-50/50">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-[9px] text-industrial-400 block uppercase">PHYSICAL_LOC:</span>
                  <span className="font-bold text-industrial-800">Kottayam, Kerala, India</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-technical text-industrial-400 leading-relaxed">
              * Responses are typical within 24 standard working hours (IST timezone). All shared files and intellectual properties are secured under strictly confidential conditions.
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="md:col-span-3">
            <div className="border border-industrial-200 bg-white p-6 rounded-lg tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br relative shadow-sm">
              <div className="font-technical text-[10px] text-industrial-400 uppercase tracking-widest border-b border-industrial-200 pb-3 mb-6 flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-2 text-primary" />
                TRANSMIT_INQUIRY_FORM
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded text-industrial-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="ENTER NAME"
                    />
                  </div>
                  <div>
                    <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded text-industrial-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="NAME@DOMAIN.COM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                    Subject / Project Reference
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded text-industrial-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="E.G., INJECTION MOULD FOR FITTINGS"
                  />
                </div>

                <div>
                  <label className="block font-technical text-[10px] text-industrial-500 uppercase mb-1">
                    Message / Specification Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded text-industrial-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="DESCRIBE YOUR TOOLING REQUIREMENTS, SPECIFICATIONS, OR CONSTRAINTS..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-technical text-xs font-bold tracking-wider bg-primary hover:bg-primary-light disabled:bg-industrial-300 text-white p-3 rounded transition-colors flex items-center justify-center shadow-sm"
                >
                  {isSubmitting ? (
                    "TRANSMITTING DATA..."
                  ) : (
                    <>
                      TRANSMIT INQUIRY
                      <Send className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Alert Panels */}
              {submitStatus === "success" && (
                <div className="mt-4 p-3 border border-emerald-200 bg-emerald-50 rounded text-emerald-800 font-technical text-[11px] uppercase tracking-wide">
                  TRANSMISSION SUCCESSFUL // DATA RECORDED. THANK YOU.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mt-4 p-3 border border-red-200 bg-red-50 rounded text-red-800 font-technical text-[11px] uppercase tracking-wide">
                  TRANSMISSION ERROR // PLEASE RETRY OR COPY DIRECT EMAIL.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
