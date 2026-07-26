import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DecryptedText from '@/components/ui/decrypted-text';
import { Star } from 'lucide-react';

export interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  initials: string;
  rating: number;
}

interface CardSwapProps {
  items: TestimonialItem[];
  delay?: number;
}

export default function CardSwap({ items, delay = 6000 }: CardSwapProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, delay);
    return () => clearInterval(timer);
  }, [items.length, delay]);

  const handleCardClick = (cardIndex: number) => {
    if (cardIndex === index) {
      setIndex(prev => (prev + 1) % items.length);
    }
  };

  // We display up to 3 cards in a physical stack
  const stack = [
    index,
    (index + 1) % items.length,
    (index + 2) % items.length
  ];

  return (
    <div className="relative w-full max-w-2xl h-[380px] sm:h-[320px] mx-auto flex items-center justify-center select-none">
      <AnimatePresence mode="popLayout">
        {stack.reverse().map((itemIdx, i) => {
          // i represents physical depth in the reverse array:
          // i = 0 (bottom-most card in the render order)
          // i = 1 (middle card)
          // i = 2 (top-most card, active card)
          const item = items[itemIdx];
          if (!item) return null;

          const isActive = itemIdx === index;
          const position = 2 - i; // 0 for active, 1 for middle, 2 for bottom

          return (
            <motion.div
              key={item.id}
              onClick={() => handleCardClick(itemIdx)}
              style={{
                zIndex: items.length - position,
                transformOrigin: 'bottom center',
              }}
              initial={isActive ? { scale: 0.9, y: 30, opacity: 0 } : false}
              animate={{
                scale: 1 - position * 0.04,
                y: -position * 16,
                x: 0,
                opacity: 1 - position * 0.35,
                rotate: position * 1.5 * (itemIdx % 2 === 0 ? 1 : -1)
              }}
              exit={{
                x: [0, 160, 200, 0],
                y: [0, -30, 60, 10],
                scale: [1, 1.05, 0.9, 0.85],
                rotate: [0, 12, -8, 0],
                opacity: [1, 0.8, 0.2, 0],
                transition: { duration: 0.75, ease: 'easeInOut' }
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 22
              }}
              className={`absolute w-full p-6 sm:p-8 rounded-[24px] border border-white/10 dark:border-white/5 bg-card/65 dark:bg-card/45 backdrop-blur-xl shadow-2xl flex flex-col justify-between cursor-pointer ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mb-3">
                {Array.from({ length: item.rating }).map((_, starIdx) => (
                  <Star key={starIdx} size={16} fill="currentColor" className="stroke-none" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <div className="flex-1 text-foreground font-medium text-lg sm:text-xl leading-relaxed italic mb-6">
                {isActive ? (
                  <>
                    &ldquo;
                    <DecryptedText
                      text={item.quote}
                      animateOn="view"
                      speed={25}
                      sequential={true}
                      className="text-foreground italic"
                      encryptedClassName="text-muted-foreground/30 font-mono"
                    />
                    &rdquo;
                  </>
                ) : (
                  <span>&ldquo;{item.quote}&rdquo;</span>
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-border/40 pt-4 mt-auto">
                <Avatar className="h-12 w-12 border border-border">
                  {item.avatarUrl && <AvatarImage src={item.avatarUrl} alt={item.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground text-sm leading-none">
                    {item.name}
                  </h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
