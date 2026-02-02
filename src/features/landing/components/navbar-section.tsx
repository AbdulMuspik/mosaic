"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NavbarSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#events", label: "Events" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#8B1538] shadow-lg">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-9 md:h-9">
              <Image
                src="/Landing/Hero/flower-circle.png"
                alt="Mosaic Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl md:text-2xl font-irish-grover text-[#f5ddb8] group-hover:text-white transition-colors">
              Mosaic
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-[#f5ddb8] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              size="sm"
              className="bg-[#f5ddb8] text-[#8B1538] hover:bg-white font-semibold text-sm"
            >
              <a href="#register">Register Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 text-white hover:text-[#f5ddb8] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/20">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors text-sm font-medium py-1.5"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                size="sm"
                className="bg-[#f5ddb8] text-[#8B1538] hover:bg-white font-semibold w-full"
              >
                <Link href="#register" onClick={() => setIsMenuOpen(false)}>
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
