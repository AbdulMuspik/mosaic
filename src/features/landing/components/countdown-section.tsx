"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 90,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date for the event (adjust as needed)
    const targetDate = new Date("2026-05-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="relative w-full bg-[#8B1538] py-8 md:py-12 overflow-hidden">
      {/* Curved Bottom Edge - Moved Higher */}
      <div className="absolute bottom-0 left-0 right-0 h-56 md:h-84 lg:h-94 bg-[#f5ddb8] rounded-t-[50%]" />

      {/* Decorative Dancer - Left - Bigger */}
      <div className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 w-64 h-80 md:w-80 md:h-112 lg:w-96 lg:h-128 z-20">
        <Image
          src="/Landing/Countdown/dancer.png"
          alt="Traditional dancer"
          fill
          className="object-contain"
        />
      </div>

      {/* Decorative Musician - Right - Bigger */}
      <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-64 h-80 md:w-80 md:h-112 lg:w-96 lg:h-128 z-20">
        <Image
          src="/Landing/Countdown/musician.png"
          alt="Traditional musician"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        {/* Event Starts In Badge */}
        <div className="relative mb-6 md:mb-8">
          <div className="relative inline-block">
            <Image
              src="/Landing/Countdown/button-border.png"
              alt=""
              width={280}
              height={70}
              className="w-64 md:w-80 h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-irish-grover text-[#4A2511]">
                Event starts in
              </h2>
            </div>
          </div>
        </div>

        {/* Countdown Timer with Thailandesa Font */}
        <div className="flex items-center justify-center gap-3 md:gap-6 lg:gap-8 mb-10 md:mb-14">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#f5ddb8] tracking-tight leading-none font-thailandesa">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-sm md:text-base lg:text-lg font-bold text-[#f5ddb8] mt-2 uppercase tracking-[0.3em]">
              DAYS
            </div>
          </div>

          <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#f5ddb8] pb-6 font-thailandesa">
            :
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#f5ddb8] tracking-tight leading-none font-thailandesa">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-sm md:text-base lg:text-lg font-bold text-[#f5ddb8] mt-2 uppercase tracking-[0.3em]">
              HOURS
            </div>
          </div>

          <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#f5ddb8] pb-6 font-thailandesa">
            :
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#f5ddb8] tracking-tight leading-none font-thailandesa">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-sm md:text-base lg:text-lg font-bold text-[#f5ddb8] mt-2 uppercase tracking-[0.3em]">
              MINUTES
            </div>
          </div>
        </div>

        {/* Register Now Button */}
        <div className="relative z-30 mb-6">
          <button
            type="button"
            className="relative group transition-transform hover:scale-105 active:scale-95"
          >
            <div className="relative inline-block">
              <Image
                src="/Landing/Countdown/register-now-button-border.png"
                alt=""
                width={400}
                height={120}
                className="w-80 md:w-96 lg:w-md h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-3xl lg:text-4xl font-irish-grover text-[#4A2511]">
                  Register Now
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
