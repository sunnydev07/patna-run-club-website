import { motion, useInView, Variants } from 'framer-motion';
import React, { useRef } from 'react';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay in ms between elements
  duration?: number; // duration of animation in seconds
  ease?: any; // easing function
  splitType?: 'chars' | 'words';
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = [0.25, 0.1, 0.25, 1],
  splitType = 'chars',
  from = { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.9 },
  to = { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
  threshold = 0.1,
  rootMargin = '0px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin as any,
  });

  const elements = splitType === 'words' ? text.split(' ') : text.split('');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const childVariants: Variants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration,
        ease,
      },
    },
  };

  const Tag = tag as any;

  return (
    <Tag
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ textAlign }}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onAnimationComplete={() => {
          if (isInView && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }}
        className="flex flex-wrap items-center justify-center whitespace-pre-wrap"
      >
        {elements.map((element, idx) => (
          <motion.span
            key={idx}
            variants={childVariants}
            className="inline-block will-change-[transform,opacity,filter]"
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
            }}
          >
            {element === ' ' ? '\u00A0' : element}
            {splitType === 'words' && idx < elements.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
