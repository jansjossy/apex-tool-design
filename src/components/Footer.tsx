import React from "react";
import Link from "next/link";
import { Shield, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-industrial-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-industrial-100 pb-6">
          {/* Logo / Title */}
          <div className="flex items-center space-x-2">
            <span className="font-technical text-xs font-bold tracking-widest text-industrial-800 uppercase">
              APEX TOOL DESIGN // PRECISION ENG
            </span>
          </div>

          {/* Quick links */}
          <div className="flex space-x-6 text-[11px] font-technical text-industrial-400">
            <span className="flex items-center">
              <Shield className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              STATUS: SYSTEM_SECURE
            </span>
            <span className="flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1 text-primary" />
              DWG_VER: 2026.6
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Copyright information */}
          <div>
            <p className="font-technical text-[10px] text-industrial-500 uppercase tracking-wider">
              © {new Date().getFullYear()} APEX TOOL DESIGN. ALL RIGHTS RESERVED. DO NOT COPY.
            </p>
            <p className="font-technical text-[9px] text-industrial-400 mt-1">
              ATTENTION: Documents screen visible and invisible watermarks. All rights reserved. Intellectual property of Apex Tool Design &amp; clients.
            </p>
          </div>

          <div className="text-[10px] font-technical text-industrial-400 bg-industrial-50 border border-industrial-200 px-3 py-1.5 rounded">
            SYS_REF: APX_DSGN_2026 // LOC: 9.5916° N, 76.5222° E
          </div>
        </div>
      </div>
    </footer>
  );
}
