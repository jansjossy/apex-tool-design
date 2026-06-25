"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/db";
import { X, Search, FileText, Maximize2, Compass } from "lucide-react";

interface PortfolioGalleryProps {
  initialProjects: Project[];
}

export default function PortfolioGallery({ initialProjects }: PortfolioGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Get unique categories/tags
  const categories = ["ALL", ...Array.from(new Set(initialProjects.map((p) => p.tag.toUpperCase())))];

  // Filter projects
  const filteredProjects =
    activeFilter === "ALL"
      ? initialProjects
      : initialProjects.filter((p) => p.tag.toUpperCase() === activeFilter);

  return (
    <div className="space-y-12">
      {/* 1. FILTER TABS */}
      <div className="flex flex-wrap gap-2 border-b border-industrial-200 pb-4 font-technical text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 border rounded transition-all duration-200 ${
              activeFilter === cat
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-industrial-600 border-industrial-200 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. GALLERY GRID */}
      {filteredProjects.length === 0 ? (
        <div className="border border-dashed border-industrial-300 rounded p-12 text-center text-industrial-400 font-technical text-xs">
          NO ARCHIVED MODELS FOUND FOR SELECTION: &quot;{activeFilter}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="border border-industrial-200 bg-white rounded p-4 shadow-sm hover:border-primary/50 transition-all duration-300 cursor-pointer group relative flex flex-col justify-between"
            >
              {/* Card Header Info */}
              <div className="flex justify-between items-start mb-3 font-technical text-[9px] text-industrial-400">
                <span>ID: {project.id.toUpperCase()}</span>
                <span className="bg-industrial-100 px-2 py-0.5 rounded text-industrial-600">
                  {project.tag}
                </span>
              </div>

              {/* Render Image Box */}
              <div className="relative w-full aspect-[4/3] bg-industrial-50 border border-industrial-100 rounded overflow-hidden flex items-center justify-center cad-crosshair-container">
                {/* CAD Crosshairs */}
                <div className="cad-crosshair-h top-[50%]"></div>
                <div className="cad-crosshair-v left-[50%]"></div>

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-industrial-950/0 group-hover:bg-industrial-950/5 flex items-center justify-center transition-colors">
                  <Maximize2 className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                </div>
              </div>

              {/* Center Caption beneath the image */}
              <div className="mt-4 text-center border-t border-industrial-100 pt-3">
                <h3 className="font-technical text-xs font-bold text-industrial-800 uppercase tracking-wider">
                  {project.title}
                </h3>
                <p className="font-technical text-[10px] text-industrial-400 mt-1 uppercase">
                  {project.client}
                </p>
              </div>

              {/* Card Footer Technical Meta */}
              <div className="mt-4 pt-3 border-t border-dashed border-industrial-100 flex justify-between items-center text-[9px] font-technical text-industrial-400">
                <span className="flex items-center">
                  <Compass className="w-3 h-3 mr-1 text-primary" />
                  SCALE {project.scale}
                </span>
                <span className="truncate max-w-[150px]">DWG: {project.dwg}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. MODAL VIEWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-industrial-950/40 backdrop-blur-sm"
          ></div>

          {/* Modal Panel */}
          <div className="relative w-full max-w-3xl bg-white border border-industrial-300 rounded-lg shadow-2xl p-5 sm:p-6 overflow-y-auto max-h-[90vh] z-10 tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-industrial-200 pb-3 mb-5 font-technical text-[10px] text-industrial-500">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>SPEC_SHEET // {selectedProject.id.toUpperCase()}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-industrial-400 hover:text-industrial-800 transition-colors p-1"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Image Frame */}
              <div className="md:col-span-3 border border-industrial-200 bg-industrial-50 p-2 rounded relative flex items-center justify-center aspect-[4/3]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-w-768px) 100vw, 40vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Meta Info */}
              <div className="md:col-span-2 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="font-technical text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                    {selectedProject.tag}
                  </span>
                  <h2 className="font-technical text-base font-bold text-industrial-800 uppercase tracking-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="font-technical text-xs font-bold text-industrial-500 uppercase">
                    {selectedProject.client}
                  </p>
                  <hr className="border-industrial-100" />
                  <p className="font-sans text-xs text-industrial-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="border-t border-industrial-100 pt-4 space-y-2 font-technical text-[10px] text-industrial-400">
                  <div className="flex justify-between">
                    <span>CAD SCALE:</span>
                    <span className="font-bold text-industrial-700">{selectedProject.scale}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SOURCE FILE:</span>
                    <span className="font-bold text-industrial-700 truncate max-w-[150px]">
                      {selectedProject.dwg}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="font-bold text-emerald-500 uppercase">RELEASED // READY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-6 border-t border-industrial-200 pt-3 text-right">
              <button
                onClick={() => setSelectedProject(null)}
                className="font-technical text-xs font-bold tracking-wider bg-industrial-900 hover:bg-industrial-700 text-white px-4 py-2 rounded transition-colors"
              >
                CLOSE CAD VIEWER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
