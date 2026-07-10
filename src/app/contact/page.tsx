"use client";

import React, { useState, useEffect } from "react";
import { Mail, MapPin, Copy, Check, Send, Terminal, Phone } from "lucide-react";
import { getPortfolioData, PortfolioData } from "@/lib/db";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [data, setData] = useState<PortfolioData | null>(null);

  // Fetch the data when the page loads
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await getPortfolioData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  // Set dynamic variables with a fallback if data hasn't loaded yet
  const emailAddress = data?.contact?.email || "yourtooldesign@gmail.com";
  const phoneNumber = data?.contact?.phone || "Update number in admin";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to create the mailto link with form data
  const getMailtoLink = () => {
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
    return `mailto:${emailAddress}?subject=${encodeURIComponent(formData.subject || "New Inquiry")}&body=${encodeURIComponent(body)}`;
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
          {/* Left panel */}
          <div className="md:col-span-2 space-y-8">
            <h2 className="font-authoritative text-2xl font-bold text-industrial-900 mb-3">
              Let&apos;s build your next tool together
            </h2>
            <div className="space-y-4 font-technical text-xs">
              
              {/* EMAIL BLOCK */}
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
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* MOBILE BLOCK */}
              <div className="border border-industrial-200 rounded p-4 flex items-center justify-between bg-industrial-50/50">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-[9px] text-industrial-400 block uppercase">MOBILE_DIRECT:</span>
                    <span className="font-bold text-industrial-800">{phoneNumber}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="text-industrial-400 hover:text-primary p-1 bg-white border border-industrial-200 rounded transition-colors shadow-sm"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="md:col-span-3">
            <div className="border border-industrial-200 bg-white p-6 rounded-lg shadow-sm">
              <div className="font-technical text-[10px] text-industrial-400 uppercase tracking-widest border-b border-industrial-200 pb-3 mb-6 flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-2 text-primary" />
                TRANSMIT_INQUIRY_FORM
              </div>

              <div className="space-y-4">
                <input type="text" name="name" placeholder="YOUR NAME" onChange={handleChange} className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded" />
                <input type="email" name="email" placeholder="YOUR EMAIL" onChange={handleChange} className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded" />
                <input type="text" name="subject" placeholder="SUBJECT" onChange={handleChange} className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded" />
                <textarea name="message" rows={5} placeholder="MESSAGE" onChange={handleChange} className="w-full p-2.5 font-technical text-xs bg-industrial-50 border border-industrial-200 rounded" />

                <a
                  href={getMailtoLink()}
                  className="block text-center w-full font-technical text-xs font-bold tracking-wider bg-primary hover:bg-primary-light text-white p-3 rounded transition-colors shadow-sm"
                >
                  TRANSMIT INQUIRY
                  <Send className="w-3.5 h-3.5 ml-2 inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}