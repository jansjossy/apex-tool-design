import React from "react";
import { getPortfolioData } from "@/lib/db";
import PortfolioGallery from "@/components/PortfolioGallery";

// Forces dynamic rendering to fetch fresh Firestore data
export const revalidate = 0;

export default async function PortfolioPage() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="border-b border-industrial-200 py-12 bg-industrial-50/30 cad-grid-bg">
        <div className="max-w-4xl mx-auto px-4">
          <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold">
            // DRAWING ARCHIVES
          </span>
          <h1 className="font-authoritative text-3xl sm:text-4xl font-extrabold text-industrial-900 tracking-tight mt-1 mb-2">
            FEW OF OUR PROJECTS
          </h1>
          <p className="font-technical text-xs text-industrial-500 uppercase tracking-widest">
            3D CAD Models, Assembly Drawings &amp; Tooling Specifications
          </p>
        </div>
      </section>

      {/* Main Gallery Container */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <PortfolioGallery initialProjects={data.projects} />
      </main>
    </div>
  );
}
