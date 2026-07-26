import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

interface RevealWordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  baseOpacity: number;
  blurStrength: number;
}

/**
 * Rendered as its own component so the hooks below are called from a stable
 * component instance instead of inside a `.map()` callback.
 */
const RevealWord: React.FC<RevealWordProps> = ({
  word,
  progress,
  start,
  end,
  baseOpacity,
  blurStrength,
}) => {
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  const blurVal = useTransform(progress, [start, end], [blurStrength, 0]);
  const filter = useTransform(blurVal, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, filter, display: 'inline-block', whiteSpace: 'pre' }}
      className="will-change-[opacity,filter]"
    >
      {word}
    </motion.span>
  );
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.15,
  blurStrength = 15,
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  });

  // Keep the trailing space attached to each word. Whitespace-only flex items
  // are collapsed by the flexbox algorithm, which previously ran every word
  // together ("PatnaRunClubwasborn...").
  const words = useMemo(() => children.trim().split(/\s+/), [children]);

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      <p className={`leading-relaxed flex flex-wrap ${textClassName}`}>
        {words.map((word, idx) => {
          const start = (idx / words.length) * 0.7;
          const end = Math.min(1, start + 0.3);

          return (
            <RevealWord
              key={`${word}-${idx}`}
              word={idx === words.length - 1 ? word : `${word} `}
              progress={scrollYProgress}
              start={start}
              end={end}
              baseOpacity={baseOpacity}
              blurStrength={enableBlur ? blurStrength : 0}
            />
          );
        })}
      </p>
    </div>
  );
};

export default ScrollReveal;
