import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

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
    offset: ["start end", "end center"]
  });

  const words = useMemo(() => {
    return children.split(/(\s+)/);
  }, [children]);

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      <p className={`leading-relaxed flex flex-wrap ${textClassName}`}>
        {words.map((word, idx) => {
          if (word.match(/^\s+$/)) {
            return <span key={idx}>{word}</span>;
          }

          const wordCount = words.length;
          const start = (idx / wordCount) * 0.7;
          const end = Math.min(1, start + 0.3);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [baseOpacity, 1]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const blurVal = useTransform(scrollYProgress, [start, end], [enableBlur ? blurStrength : 0, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const filter = useTransform(blurVal, b => `blur(${b}px)`);

          return (
            <motion.span
              key={idx}
              style={{ opacity, filter, display: 'inline-block' }}
              className="will-change-[opacity,filter]"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};

export default ScrollReveal;
