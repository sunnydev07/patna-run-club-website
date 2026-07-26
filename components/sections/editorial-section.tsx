"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import CountUp from "@/components/ui/count-up";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const specs = [
  { label: "Members", value: "200+" },
  { label: "Founded", value: "2026" },
  { label: "Sunday Runs", value: "6 AM" },
  { label: "Join Fee", value: "₹149" },
];

export function EditorialSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    if (!videoRef.current) return;
    
    const rect = videoRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate when video enters and exits viewport
    const videoTop = rect.top;
    const videoBottom = rect.bottom;
    
    // Progress from 0 (entering viewport) to 1 (exiting viewport)
    if (videoBottom > 0 && videoTop < windowHeight) {
      const progress = 1 - (videoTop + rect.height / 2) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateParallax]);

  // Parallax effect: video moves up as you scroll down
  const parallaxY = (scrollProgress - 0.5) * 30; // -15px to +15px range

  return (
    <section id="reserve" className="bg-background scroll-mt-28">
      {/* Newsletter Banner */}
      <div className="max-w-xl mx-auto px-6 py-20 text-center relative z-10">
        <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
          Join the Patna Run Club
        </h3>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Message us on Instagram to get the Sunday 6 AM route, event updates,
          and your ₹149 membership sorted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto sm:justify-center">
          <Button
            asChild
            className="rounded-full bg-foreground text-background px-8 py-6 font-medium hover:opacity-90 transition-opacity"
          >
            <a
              href="https://www.instagram.com/patnarunclub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" aria-hidden="true" />
              Message us on Instagram
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border bg-transparent px-8 py-6 font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            <a href="#accessories">See upcoming runs</a>
          </Button>
        </div>
      </div>

      {/* Full-width Hero Video with Parallax */}
      <div ref={videoRef} className="relative aspect-[16/9] w-full md:aspect-[21/9] overflow-hidden">
        <video
          src="/videos/marathon.mp4"
          poster="/images/prc-yoga-wide.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: 'center 75%',
            transform: `scale(1.15) translate3d(0, ${parallaxY}px, 0) translateZ(0)`,
            WebkitTransform: `scale(1.15) translate3d(0, ${parallaxY}px, 0) translateZ(0)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4 max-w-7xl mx-auto md:p-12 relative z-10 -mt-16">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="relative overflow-hidden rounded-2xl bg-card/45 backdrop-blur-md border border-border/50 p-8 text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl duration-300"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {spec.label}
            </p>
            <p className="font-bold text-foreground text-5xl tracking-tight flex items-center justify-center">
              {spec.label === "Members" && (
                <>
                  <CountUp from={0} to={200} duration={2} />+
                </>
              )}
              {spec.label === "Founded" && (
                <CountUp from={2020} to={2026} duration={1.5} separator="" />
              )}
              {spec.label === "Sunday Runs" && (
                <>
                  <CountUp from={0} to={6} duration={1.5} /> AM
                </>
              )}
              {spec.label === "Join Fee" && (
                <>
                  ₹<CountUp from={0} to={149} duration={2} />
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
