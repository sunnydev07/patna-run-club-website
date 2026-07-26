"use client";

import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";
import GlareHover from "@/components/ui/glare-hover";

const images = [
  { src: "/images/prc-group.jpg", alt: "Patna Run Club full group photo" },
  { src: "/images/prc-yoga-wide.jpg", alt: "Outdoor pranayama session" },
  { src: "/images/prc-club-event.jpg", alt: "Club gathered at a Sunday event" },
  { src: "/images/prc-yoga-girl.jpg", alt: "Members in front of the club poster" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="bg-black py-20 relative z-10 scroll-mt-28">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Club Moments
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            A glimpse into our weekly runs, outdoor sessions, and community celebrations.
          </p>
        </div>

        {/* Scroll Stack Gallery */}
        <div className="relative">
          <ScrollStack
            useWindowScroll={true}
            className="!h-auto !overflow-visible"
            itemDistance={60}
            itemScale={0.05}
            itemStackDistance={20}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.9}
            rotationAmount={2}
            blurAmount={1.5}
          >
            {images.map((image, index) => (
              <ScrollStackItem
                key={index}
                itemClassName="!h-[50vh] sm:!h-[60vh] md:!h-[70vh] bg-transparent shadow-none border-none p-0 !my-16"
              >
                <GlareHover
                  className="w-full h-full rounded-3xl overflow-hidden border border-white/10"
                  glareColor="#ffffff"
                  glareOpacity={0.25}
                  glareAngle={-45}
                  glareSize={150}
                  transitionDuration={700}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover pointer-events-none select-none"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      loading="lazy"
                    />
                  </div>
                </GlareHover>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
