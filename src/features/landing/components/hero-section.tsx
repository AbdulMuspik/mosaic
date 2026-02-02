"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f5ddb8]">
      {/* Corner Decorations - Stick to corners */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
        <Image
          src="/Landing/Hero/corner-circular-design.svg"
          alt=""
          fill
          className="object-contain object-top-left"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
        <Image
          src="/Landing/Hero/corner-circular-design.svg"
          alt=""
          fill
          className="object-contain object-top-right scale-x-[-1]"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-20 flex flex-col items-center text-center">
        {/* Title with Rose replacing I */}
        <div className="relative mb-4 flex items-center justify-center">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-irish-grover text-red-700 tracking-wide flex items-center gap-0">
            <span>MOSA</span>
            <span className="relative inline-flex items-center justify-center w-16 h-24 md:w-20 md:h-32 lg:w-28 lg:h-40 mx-0">
              <Image
                src="/Landing/Hero/rose.png"
                alt="Rose"
                width={100}
                height={120}
                className="object-contain w-full h-full"
                priority
              />
            </span>
            <span>C</span>
          </h1>
        </div>

        {/* Decorative Flowers and Year with Animation */}
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-8">
          <div className="relative w-20 h-20 md:w-28 md:h-28 animate-spin-slow">
            <Image
              src="/Landing/Hero/flower-circle.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#1a8b9d] font-irish-grover">
            26
          </span>
          <div className="relative w-20 h-20 md:w-28 md:h-28 animate-spin-slow">
            <Image
              src="/Landing/Hero/flower-circle.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="relative mb-6 max-w-3xl">
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="hidden sm:block w-12 md:w-20 h-px bg-linear-to-r from-transparent via-[#c41e3a] to-[#c41e3a]" />
            <p className="text-base md:text-lg lg:text-xl text-gray-800 font-medium tracking-wide px-4 py-2 border-2 border-[#c41e3a]/30 rounded-lg bg-white/40 backdrop-blur-sm shadow-sm">
              IILM University Greater Noida's Cultural Festival
            </p>
            <div className="hidden sm:block w-12 md:w-20 h-px bg-linear-to-l from-transparent via-[#c41e3a] to-[#c41e3a]" />
          </div>
        </div>
      </div>

      {/* Skyline at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-56 md:h-72 lg:h-70 z-10">
        <Image
          src="/Landing/Hero/skyline.png"
          alt="Cultural skyline"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </section>
  );
}
