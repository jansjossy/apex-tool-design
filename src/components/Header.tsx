"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Settings } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/", index: "01" },
    { name: "PORTFOLIO", path: "/portfolio", index: "02" },
    { name: "ABOUT", path: "/about", index: "03" },
    { name: "CONTACT", path: "/contact", index: "04" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-industrial-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <img 
              src="/apexdesign.jpeg" 
              alt="Apex Tool Design Logo" 
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105 duration-300" 
            />
            <span className="font-technical text-sm font-black tracking-wider text-industrial-900">
              APEX TOOL DESIGN
            </span>
            <div
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1.5"
              title="System Live"
            ></div>
          </Link>

          {/* Center Scroll Progress (Desktop Only) */}
          <div className="hidden md:block flex-1 mx-8 h-[2px] bg-industrial-100 relative overflow-hidden rounded">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6">
            <span className="hidden sm:inline font-technical text-[10px] text-industrial-400 tracking-tight">
              SYS_VER: 2.0.26 // SCALE: 1:1
            </span>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 text-industrial-600 hover:text-industrial-900 focus:outline-none transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-industrial-900/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white border-l border-industrial-200 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-industrial-100">
              <span className="font-technical text-xs text-industrial-400 tracking-wider">
                NAVIGATION_INDEX
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-industrial-400 hover:text-industrial-900 p-1"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-8 space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block group font-technical text-lg tracking-wide transition-colors flex items-center ${
                      isActive ? "text-primary" : "text-industrial-700 hover:text-primary"
                    }`}
                  >
                    <span
                      className={`text-xs mr-3 transition-colors ${
                        isActive ? "text-primary" : "text-industrial-300 group-hover:text-primary"
                      }`}
                    >
                      {link.index}//
                    </span>
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-6 border-t border-industrial-100 mt-6">
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-technical text-xs flex items-center transition-colors ${
                    pathname === "/admin"
                      ? "text-accent"
                      : "text-industrial-400 hover:text-accent"
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  ADMIN_DASHBOARD
                </Link>
              </div>
            </nav>
          </div>

          <div className="border-t border-industrial-100 pt-6">
            <div className="font-technical text-[10px] text-industrial-400 leading-normal">
              SECURE CONNECTION ENCRYPTED
              <br />
              LOC: KOTTAYAM, KERALA, IN
              <br />
              BRAND: APEX TOOL DESIGN
            </div>
          </div>
        </div>
      </div>
    </>
  );
}