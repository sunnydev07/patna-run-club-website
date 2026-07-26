"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/ui/split-text";
import BlurText from "@/components/ui/blur-text";
import DotField from "@/components/ui/dot-field";

const word = "PATNA";

const sideImages = [
  {
    src: "/images/prc-warmup-girl.jpg",
    alt: "Member leading an energetic warm-up at a Patna Run Club event",
    position: "left",
    span: 1,
  },
  {
    src: "/images/prc-yoga-girl.jpg",
    alt: "Members doing pranayama in front of the Patna Run Club poster",
    position: "left",
    span: 1,
  },
  {
    src: "/images/prc-team.jpg",
    alt: "Patna Run Club members posing together at an event",
    position: "right",
    span: 1,
  },
  {
    src: "/images/prc-club-event.jpg",
    alt: "Patna Run Club members gathered at a Sunday event",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations - More balanced distribution
  const centerWidth = 100 - (imageProgress * 80); // 100% to 20% (same as each side image)
  const centerHeight = 100; // Always 100% height
  const sideWidth = imageProgress * 40; // 0% to 40% (20% per image, 2 images = 40%)
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = 0; // No border radius
  const gap = imageProgress * 8; // 0px to 8px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Particle Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <DotField
            dotRadius={1.5}
            dotSpacing={18}
            cursorRadius={350}
            cursorForce={0.2}
            bulgeStrength={60}
            glowRadius={200}
            gradientFrom="rgba(120, 120, 120, 0.3)"
            gradientTo="rgba(120, 120, 120, 0.05)"
            glowColor="rgba(120, 120, 120, 0.1)"
          />
        </div>
        <div className="flex h-full w-full items-center justify-center relative z-10">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* Text Behind - Fades out first */}
              <div 
                className="absolute inset-0 z-20 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: 'translateY(-200px)' }}
              >
                <SplitText
                  text="PATNA"
                  className="whitespace-nowrap text-[35vw] font-bold leading-[0.8] tracking-tighter text-foreground"
                  delay={80}
                  duration={1.2}
                  ease={[0.16, 1, 0.3, 1]}
                  splitType="chars"
                  from={{ opacity: 0, y: 150, filter: 'blur(20px)', scale: 0.8 }}
                  to={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  tag="h1"
                />
              </div>
              
              <Image
                src="/images/prc-group.jpg"
                alt="Patna Run Club members gathered together after a Sunday run"
                fill
                className="absolute inset-0 z-10 object-cover"
                priority
              />
            </div>

            {/* Right Column */}
            <div 
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Tagline Section - Fixed at bottom */}
      <div 
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <BlurText
          text="Run Patna, Run Strong."
          className="mx-auto max-w-2xl text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug justify-center"
          delay={150}
          animateBy="words"
          direction="bottom"
        />
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />
    </section>
  );
}
