import React from "react";
import Image from "next/image";
import { getPortfolioData } from "@/lib/db";
import { User, Compass, PenTool, FileCheck } from "lucide-react";

export default async function AboutPage() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="border-b border-industrial-200 py-12 bg-industrial-50/30 cad-grid-bg">
        <div className="max-w-4xl mx-auto px-4">
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
            // METADATA // DESIGNER_PROFILE
          </span>
          <h1 className="font-authoritative text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight mt-1 mb-2">
            About Lead Designer
          </h1>
          <p className="font-technical text-xs text-industrial-500 uppercase tracking-widest">
            Freelance Mould &amp; Product Engineering Expert
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* Core Profile section */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 space-y-6">
            <h2 className="font-authoritative text-2xl font-bold text-industrial-900">
              Ditty Thomas
            </h2>
            <div className="font-technical text-xs text-primary uppercase tracking-wider">
              // FREELANCE MOULD &amp; PRODUCT DESIGNER
            </div>
            
            <p className="font-sans text-sm text-industrial-600 leading-relaxed">
              Based in the industrial hub of <strong>Kottayam, Kerala, India</strong>, I operate as an independent tool design consultant. I provide high-precision injection mould design and product development support to manufacturing clients globally.
            </p>

            <p className="font-sans text-sm text-industrial-600 leading-relaxed">
              With over a decade of hands-on expertise in the field, I specialize in transforming product concepts into production-ready mould assemblies. My design methodologies prioritize optimal flow simulation parameters (runner and gate systems), robust mechanical reliability (slider/core-pull mechanisms), and highly efficient cycle times (conforming cooling layouts).
            </p>

            <p className="font-sans text-sm text-industrial-600 leading-relaxed">
              I collaborate closely with tool rooms, product managers, and manufacturers to troubleshoot existing tooling failures, execute design updates, and supply detailed 2D detail drawings with standard tolerance stack analyses.
            </p>
          </div>

          {/* Designer Card Info */}
          <div className="md:col-span-2 border border-industrial-200 bg-industrial-50/50 p-6 rounded-lg tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br relative space-y-4 shadow-sm">
            <div className="font-technical text-[10px] text-industrial-500 tracking-widest uppercase border-b border-industrial-200 pb-2 flex items-center">
              <User className="w-3.5 h-3.5 mr-2 text-primary" />
              ENGINEERING CREDENTIALS
            </div>
            
            <div className="space-y-4 font-technical text-xs">
              <div>
                <span className="text-industrial-400 block uppercase">CAD Specialization:</span>
                <span className="font-bold text-industrial-800">Injection Moulds, Core-Pull Mechanisms, Cooling balancing</span>
              </div>
              <div>
                <span className="text-industrial-400 block uppercase">Primary Software:</span>
                <span className="font-bold text-industrial-800">Unigraphics NX, SolidWorks, AutoCAD</span>
              </div>
              <div>
                <span className="text-industrial-400 block uppercase">Location:</span>
                <span className="font-bold text-industrial-800">Kottayam, Kerala, India</span>
              </div>
              <div>
                <span className="text-industrial-400 block uppercase">Experience:</span>
                <span className="font-bold text-industrial-800">Active since 2012</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-industrial-200" />

        {/* Design Philosophy */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
              // DESIGN PRINCIPLES
            </span>
            <h2 className="font-authoritative text-2xl sm:text-3xl font-bold text-industrial-900 mt-1">
              Methodology &amp; Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-industrial-200 p-5 rounded hover:border-primary/50 transition-colors">
              <Compass className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-technical text-sm font-bold text-industrial-800 uppercase mb-2">
                1. Precision Tolerance
              </h3>
              <p className="font-sans text-xs text-industrial-500 leading-relaxed">
                Every drawing is double-checked for tolerance stackups. Fits, clearances, and tapers are precisely calculated to ensure seamless tool assembly.
              </p>
            </div>

            <div className="border border-industrial-200 p-5 rounded hover:border-primary/50 transition-colors">
              <PenTool className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-technical text-sm font-bold text-industrial-800 uppercase mb-2">
                2. Design for Manufacturing
              </h3>
              <p className="font-sans text-xs text-industrial-500 leading-relaxed">
                DFM is baked in from day one. Wall thickness analysis, draft angles, and slider requirements are optimized to prevent manufacturing defects.
              </p>
            </div>

            <div className="border border-industrial-200 p-5 rounded hover:border-primary/50 transition-colors">
              <FileCheck className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-technical text-sm font-bold text-industrial-800 uppercase mb-2">
                3. Fast Cycles
              </h3>
              <p className="font-sans text-xs text-industrial-500 leading-relaxed">
                Optimized gate positions and engineered cooling channels achieve rapid cooling rates, yielding fast cycle times and maximum output.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
