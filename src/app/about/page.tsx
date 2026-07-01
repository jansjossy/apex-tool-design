import { getAboutData } from "@/lib/db";

// Fix the Next.js cache so updates show instantly
export const dynamic = 'force-dynamic'; 

export default async function AboutPage() {
  // Fetch the text from Firebase
  const aboutContent = await getAboutData();

  return (
    <div className="min-h-screen bg-white px-4 py-24 cad-grid-bg">
      <div className="max-w-4xl mx-auto border border-industrial-200 bg-white p-8 rounded-lg shadow-sm">
        <span className="font-technical text-[10px] text-primary uppercase tracking-widest font-bold block mb-4">
          // APEX_TOOL_DESIGN_OVERVIEW
        </span>
        <h1 className="font-authoritative text-3xl font-bold text-industrial-900 tracking-tight mb-8 border-b border-industrial-100 pb-4">
          About
        </h1>
        
        {/* whitespace-pre-wrap ensures paragraph breaks typed in the admin dashboard are respected on the live site */}
        <p className="whitespace-pre-wrap font-sans text-sm text-industrial-700 leading-relaxed">
          {aboutContent}
        </p>
      </div>
    </div>
  );
}