"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const galleryImages = [
  { id: "image-1", src: "/Landing/gallery/Images/Image-1.png" },
  { id: "image-2", src: "/Landing/gallery/Images/Image-2.png" },
  { id: "image-3", src: "/Landing/gallery/Images/Image-3.png" },
  { id: "image-4", src: "/Landing/gallery/Images/Image-4.png" },
  { id: "image-5", src: "/Landing/gallery/Images/Image-5.png" },
  { id: "image-6", src: "/Landing/gallery/Images/Image-6.png" },
  { id: "image-7", src: "/Landing/gallery/Images/Image-7.png" },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <section className="relative w-full bg-[#f5ddb8] py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Decorative Border Top */}
      <div className="absolute top-0 left-0 right-0 h-6 md:h-8 lg:h-10 w-full z-0">
        <Image
          src="/Landing/gallery/Border-design.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Left Decorative Circular Design */}
      <div className="absolute -left-8 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 opacity-30 z-0">
        <Image
          src="/Landing/gallery/circular-design.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Right Decorative Circular Design */}
      <div className="absolute -right-8 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 opacity-30 z-0">
        <Image
          src="/Landing/gallery/circular-design.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-12">
        {/* Gallery Title with Banner */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="relative w-64 h-24 md:w-80 md:h-28 lg:w-96 lg:h-32">
            <Image
              src="/Landing/gallery/Gallery-banner.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-irish-grover text-[#8B1538]">
                Gallery
              </h2>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto pb-8">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image.src)}
              className="relative w-full aspect-square overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:ring-offset-2"
            >
              <Image
                src={image.src}
                alt={`Gallery ${image.id}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Image Viewer Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-black/95 border-none">
          <VisuallyHidden>
            <DialogTitle>Gallery Image Viewer</DialogTitle>
          </VisuallyHidden>
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="95vw"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
