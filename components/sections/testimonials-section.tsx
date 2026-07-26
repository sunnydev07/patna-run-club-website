"use client";

import CardSwap, { TestimonialItem } from "@/components/ui/card-swap";

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    quote: "Sunday runs at Shiv Puri Park are now the highlight of my week. The energy, the people, the music — it's addictive. Best ₹149 I ever spent!",
    name: "Dr. Shweta Singh",
    role: "Founder & Runner",
    initials: "SS",
    rating: 5,
    avatarUrl: "/images/prc-yoga-girl.jpg"
  },
  {
    id: 2,
    quote: "I was never a runner, but Patna Run Club changed everything. The community is so welcoming, and there is absolutely no judgment. Everyone runs at their own pace.",
    name: "Amitesh Kumar",
    role: "Marathon Finisher",
    initials: "AK",
    rating: 5,
    avatarUrl: "/images/prc-team.jpg"
  },
  {
    id: 3,
    quote: "Pranayama and yoga in the fresh morning air before our run has done wonders for my breathing and stamina. Dr. Shweta is an amazing mentor!",
    name: "Priyanka Roy",
    role: "Club Member",
    initials: "PR",
    rating: 5,
    avatarUrl: "/images/prc-warmup-girl.jpg"
  },
  {
    id: 4,
    quote: "The Zumba sessions are full of life! Running 5K followed by dance warmup exercises keeps me energized for the entire week. Highly recommend joining us!",
    name: "Rohan Verma",
    role: "Regular Runner",
    initials: "RV",
    rating: 5,
    avatarUrl: "/images/prc-club-event.jpg"
  }
];

export function TestimonialsSection() {
  return (
    <section id="about" className="relative bg-background py-20 md:py-32 overflow-hidden border-t border-border/50 scroll-mt-28">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Runners Say
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-md mx-auto">
            Real stories from members who show up, push boundaries, and run strong together.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="w-full max-w-2xl mx-auto">
          <CardSwap items={testimonials} delay={6500} />
        </div>
      </div>
    </section>
  );
}
