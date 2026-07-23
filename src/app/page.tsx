export const dynamic = 'force-dynamic';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPortfolioData } from "@/lib/db";
import { ArrowRight, Compass, Cpu, Layers, Disc, Hammer, FileCheck } from "lucide-react";

export default async function Home() {
  const data = await getPortfolioData();

  // Map service icons
  const getServiceIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-5 h-5 text-primary" />;
      case 1:
        return <Compass className="w-5 h-5 text-primary" />;
      case 2:
        return <Disc className="w-5 h-5 text-primary" />;
      case 3:
        return <Layers className="w-5 h-5 text-primary" />;
      case 4:
        return <Hammer className="w-5 h-5 text-primary" />;
      default:
        return <FileCheck className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION WITH CAD GRID */}
      <section className="relative w-full border-b border-industrial-200 py-16 sm:py-24 cad-grid-bg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border border-industrial-300 bg-white/95 p-6 sm:p-10 rounded-lg tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br relative shadow-md">
            {/* Main Hero Header */}
            <span className="font-technical text-xs font-bold tracking-widest text-primary uppercase">
              // {data.hero.subtitle.toUpperCase()}
            </span>
            <h1 className="font-authoritative text-4xl sm:text-5xl font-extrabold text-industrial-900 tracking-tight mt-2 mb-3">
              {data.hero.name}
            </h1>
            <p className="font-technical text-sm sm:text-base text-industrial-500 uppercase tracking-widest border-l-2 border-primary pl-4 py-1 mb-6">
              {data.hero.tagline}
            </p>

            <p className="font-sans text-sm text-industrial-600 leading-relaxed max-w-xl mb-8">
              {data.hero.leadDesigner}. Delivering high-tolerance injection moulds, runner &amp; gate optimizations, and full product drafting solutions globally from India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="font-technical text-xs font-bold tracking-wider bg-primary hover:bg-primary-light text-white px-5 py-3 rounded transition-colors inline-flex items-center shadow-sm"
              >
                VIEW PORTFOLIO
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="font-technical text-xs font-bold tracking-wider border border-industrial-300 hover:border-primary text-industrial-700 hover:text-primary px-5 py-3 rounded transition-colors inline-flex items-center bg-white"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-20">
        {/* 2. SOFTWARE PROFICIENCY BADGES */}
        <section className="w-full">
          <div className="border border-industrial-200 bg-industrial-50/50 p-6 rounded-lg tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-industrial-200">
              {/* Badge 1: Siemens NX */}
              <div className="flex flex-col items-center p-3 group">
                <div className="w-14 h-14 flex items-center justify-center rounded border border-industrial-200 bg-white group-hover:border-primary/50 transition-colors shadow-sm mb-2">
                  <img src="/assets/1.jpeg" alt="Unigraphics NX" className="w-10 h-10 object-contain" />
                </div>
                <span className="font-technical text-xs text-industrial-800 font-bold tracking-tight">Unigraphics NX</span>
                <span className="font-technical text-[9px] text-industrial-400 mt-0.5">3D modeling and assembly</span>
              </div>

              {/* Badge 2: SolidWorks */}
              <div className="flex flex-col items-center p-3 group">
                <div className="w-14 h-14 flex items-center justify-center rounded border border-industrial-200 bg-white group-hover:border-red-500/50 transition-colors shadow-sm mb-2">
                  <img src="/assets/2.jpeg" alt="SolidWorks" className="w-10 h-10 object-contain" />
                </div>
                <span className="font-technical text-xs text-industrial-800 font-bold tracking-tight">SolidWorks</span>
                <span className="font-technical text-[9px] text-industrial-400 mt-0.5">3D modeling and assembly</span>
              </div>

              {/* Badge 3: AutoCAD */}
              <div className="flex flex-col items-center p-3 group">
                <div className="w-14 h-14 flex items-center justify-center rounded border border-industrial-200 bg-white group-hover:border-amber-600/50 transition-colors shadow-sm mb-2">
                  <img src="/assets/3.jpeg" alt="AutoCAD" className="w-10 h-10 object-contain" />
                </div>
                <span className="font-technical text-xs text-industrial-800 font-bold tracking-tight">AutoCAD</span>
                <span className="font-technical text-[9px] text-industrial-400 mt-0.5">mould design</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROFILE / HIGHLIGHTS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-industrial-200 pb-6 md:pb-0 md:pr-8">
            <span className="font-technical text-[10px] text-industrial-400 uppercase tracking-widest">
              DOC_NO: {data.profile.dwgNo}
            </span>
            <h2 className="font-authoritative text-2xl font-bold text-industrial-900 tracking-tight mt-1 mb-4">
              {data.profile.title}
            </h2>
            <div className="space-y-2 text-[11px] font-technical text-industrial-500">
              <p>REVISION_DATE: {data.profile.date}</p>
              <p>DESIGNER: APEX TOOL</p>
              <p>LOC_CODE: KTM_KL_IN</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <ul className="space-y-3.5">
              {data.profile.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start text-sm text-industrial-600 leading-relaxed">
                  <span className="font-technical text-primary mr-3 text-xs select-none">
                    [{(index + 1).toString().padStart(2, "0")}]
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="border-industrial-200" />

        {/* 4. SERVICES OFFERED */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
              // DESIGN SERVICE CATALOG
            </span>
            <h2 className="font-authoritative text-3xl font-bold text-industrial-900 mt-1">
              Engineering Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.services.map((service, index) => (
              <div
                key={service.code}
                className="tech-card rounded p-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    {getServiceIcon(index)}
                  </div>
                  <h3 className="font-technical text-sm font-bold text-industrial-800 uppercase tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-industrial-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-industrial-200" />

        {/* 5. FEATURED PORTFOLIO ITEM */}
        {data.projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-industrial-200 pb-4">
              <div>
                <span className="font-technical text-[10px] text-industrial-400 uppercase tracking-widest">
                  FEATURED WORK // ARCHIVE_01
                </span>
                <h2 className="font-authoritative text-2xl font-bold text-industrial-900 mt-1">
                  PVC / Multi-Cavity Mould Design
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="font-technical text-xs font-bold text-primary hover:text-primary-light flex items-center transition-colors pb-1"
              >
                VIEW PORTFOLIO
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 space-y-4">
                <div className="border border-industrial-200 bg-white rounded p-4 cad-crosshair-container group shadow-sm">
                  {/* CAD Crosshairs */}
                  <div className="cad-crosshair-h top-[50%]"></div>
                  <div className="cad-crosshair-v left-[50%]"></div>

                  <div className="relative w-full aspect-[4/3] bg-industrial-50 rounded overflow-hidden flex items-center justify-center border border-industrial-100">
                    <Image
                      src={data.projects[0].image}
                      alt={data.projects[0].title}
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center font-technical text-[10px] text-industrial-500 mt-3 uppercase tracking-wider">
                    Fig. 01 // {data.projects[0].title} ({data.projects[0].client})
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-5">
                <div className="space-y-2">
                  <span className="font-technical text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                    {data.projects[0].tag}
                  </span>
                  <h3 className="font-technical text-base font-bold text-industrial-800 uppercase mt-2">
                    {data.projects[0].client}
                  </h3>
                  <p className="font-sans text-xs text-industrial-500 leading-relaxed">
                    {data.projects[0].description}
                  </p>
                </div>

                <div className="border-t border-industrial-100 pt-4 space-y-1.5 font-technical text-[10px] text-industrial-500">
                  <p>SCALE: {data.projects[0].scale}</p>
                  <p className="truncate">DWG: {data.projects[0].dwg}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. CLIENT TESTIMONIALS */}
        {data.testimonials && data.testimonials.length > 0 && (
          <>
            <hr className="border-industrial-200" />
            <section className="space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
                  // CLIENT FEEDBACK
                </span>
                <h2 className="font-authoritative text-3xl font-bold text-industrial-900 mt-1">
                  Testimonials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {data.testimonials.map((testimony, index) => (
                  <div
                    key={testimony.id || index}
                    className="border border-industrial-200 bg-industrial-50/50 p-6 rounded-lg tech-corner-tl tech-corner-br relative shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-4 text-primary/40">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="font-sans text-sm text-industrial-700 leading-relaxed mb-6 italic">
                        "{testimony.feedback}"
                      </p>
                    </div>
                    <div className="border-t border-industrial-200 pt-4 mt-auto">
                      <h4 className="font-technical text-xs font-bold text-industrial-900 uppercase">
                        {testimony.clientName}
                      </h4>
                      <span className="font-technical text-[10px] text-industrial-500 uppercase tracking-widest">
                        {testimony.company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}