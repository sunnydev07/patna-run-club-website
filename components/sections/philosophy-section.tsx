"use client";

import RotatingText from "@/components/ui/rotating-text";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TiltedCard from "@/components/ui/tilted-card";
import BorderGlow from "@/components/ui/border-glow";

const pillars = [
  {
    title: "Distance",
    description: "Every mile is a milestone. From 5K walk-runs to half marathons, we track our progress together.",
    image: "/images/prc-team.jpg",
    glowColor: "270 80 80" // violet glow
  },
  {
    title: "Strength",
    description: "Built through consistency. We show up every Sunday at 6 AM, rain or shine, building physical and mental resilience.",
    image: "/images/prc-club-event.jpg",
    glowColor: "330 80 80" // pink glow
  },
  {
    title: "Spirit",
    description: "The heartbeat of Patna. Warm-ups, music, yoga, high-fives, and the shared joy of movement.",
    image: "/images/prc-warmup-girl.jpg",
    glowColor: "190 80 80" // blue/cyan glow
  }
];

export function PhilosophySection() {
  const descriptionText = "Patna Run Club was born in 2026 from a simple belief — that running is not just exercise, it's a movement. Founded by Dr. Shweta Singh, we grew from a handful of runners at Shiv Puri Park into Patna's most vibrant fitness community.";

  return (
    <section id="products" className="bg-background py-20 md:py-28 scroll-mt-28">
      {/* 3D Rotating Title */}
      <div className="relative w-full max-w-7xl mx-auto px-4 mb-16 md:mb-24">
        <h2 className="text-[7vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] font-bold leading-tight tracking-tighter text-foreground text-center px-4 min-h-[160px] flex items-center justify-center">
          <RotatingText
            texts={[
              "Run Together.",
              "Stronger Together.",
              "Run. Connect. Celebrate."
            ]}
            mainClassName="text-center justify-center"
            staggerDuration={0.02}
            splitBy="characters"
            rotationInterval={3000}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            initial={{ y: "100%", opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: "-100%", opacity: 0, rotateX: -90 }}
          />
        </h2>
      </div>

      {/* Description with Scroll-triggered Word Reveal */}
      <div className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto mb-20 md:mb-28">
        <ScrollReveal
          enableBlur={true}
          blurStrength={12}
          baseOpacity={0.15}
          textClassName="text-2xl sm:text-3xl leading-relaxed text-muted-foreground text-center justify-center font-medium"
        >
          {descriptionText}
        </ScrollReveal>
      </div>

      {/* Core Pillars Grid with Tilted Cards and Border Glow */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold tracking-tight text-center text-foreground mb-16 md:text-4xl">
          Our Core Pillars
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <BorderGlow
              key={index}
              glowColor={pillar.glowColor}
              borderRadius={20}
              glowRadius={60}
              glowIntensity={0.6}
              backgroundColor="transparent"
              className="p-[1px] rounded-[20px] bg-card border-none overflow-hidden h-[400px]"
            >
              <TiltedCard
                imageSrc={pillar.image}
                altText={`${pillar.title} pillar image`}
                captionText={pillar.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={10}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white flex flex-col justify-end h-full rounded-[15px] pointer-events-none">
                    <h4 className="text-2xl font-bold tracking-tight mb-2 select-none">{pillar.title}</h4>
                    <p className="text-sm text-gray-200 leading-relaxed select-none">{pillar.description}</p>
                  </div>
                }
              />
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
