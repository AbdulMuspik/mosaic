"use client";

import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="relative w-full bg-[#8B1538] text-white overflow-hidden">
      {/* Decorative Border Top */}
      <div className="absolute top-0 left-0 right-0 h-6 md:h-8 lg:h-10 w-full z-0 rotate-180">
        <Image
          src="/Landing/gallery/Border-design.svg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Left Decorative Circular Design */}
      <div className="absolute -left-16 bottom-10 w-32 h-32 md:w-48 md:h-48 opacity-10 z-0">
        <Image
          src="/Landing/gallery/circular-design.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Right Decorative Circular Design */}
      <div className="absolute -right-16 top-20 w-32 h-32 md:w-48 md:h-48 opacity-10 z-0">
        <Image
          src="/Landing/gallery/circular-design.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 pt-16 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-irish-grover mb-4 text-[#f5ddb8]">
              Mosaic 2026
            </h3>
            <p className="text-white/90 leading-relaxed">
              IILM University Greater Noida's premier cultural festival
              celebrating art, music, dance, and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl md:text-2xl font-irish-grover mb-4 text-[#f5ddb8]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#events"
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl md:text-2xl font-irish-grover mb-4 text-[#f5ddb8]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0-[#f5ddb8]" />
                <span className="text-white/90">
                  IILM University, Greater Noida, Uttar Pradesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-[#f5ddb8]" />
                <a
                  href="mailto:mosaic@iilm.edu"
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors"
                >
                  mosaic@iilm.edu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-[#f5ddb8]" />
                <a
                  href="tel:+918822780244"
                  className="text-white/90 hover:text-[#f5ddb8] transition-colors"
                >
                  +91 8822780244
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm md:text-base">
            © 2026 Mosaic - IILM University. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:mosaic@iilm.edu"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
