"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Scroll progress helpers.
 *
 * Every section used to attach its own `scroll` listener that called `setState`
 * synchronously on each event. Mobile browsers fire scroll events far more
 * often than they paint, so each swipe queued dozens of React re-renders of
 * large image trees -- that was the source of the scroll jank.
 *
 * These hooks coalesce all of that into a single rAF-throttled read per frame
 * and drop updates too small to be visible.
 */

// Quantising kills re-renders caused by imperceptible sub-pixel deltas.
const STEP = 1 / 512;

function quantize(value: number) {
  return Math.round(value / STEP) * STEP;
}

/**
 * Progress (0..1) of an element travelling through a sticky scroll region.
 *
 * `distanceRatio` is the scroll distance the animation spans, expressed in
 * viewport heights, and must match the spacer height rendered in the section.
 * We measure against the element's own height where possible so that mobile
 * URL-bar show/hide (which changes `window.innerHeight` mid-scroll, but not
 * CSS `vh` units) can't make progress jump and feel like it "scrolls too fast".
 */
export function useStickyScrollProgress(
  ref: RefObject<HTMLElement | null>,
  distanceRatio: number,
) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const lastRef = useRef(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const read = () => {
      frameRef.current = null;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();

      // Prefer the element's real scrollable height over `innerHeight * n`:
      // it is stable while the mobile browser chrome collapses.
      const measured = node.offsetHeight - window.innerHeight;
      const fallback = window.innerHeight * distanceRatio;
      const distance = measured > 0 ? measured : fallback;
      if (distance <= 0) return;

      const next = quantize(Math.min(1, Math.max(0, -rect.top / distance)));
      if (next === lastRef.current) return;
      lastRef.current = next;
      setProgress(next);
    };

    // Collapse bursts of scroll events into one read per animation frame.
    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [ref, distanceRatio]);

  return progress;
}

/**
 * Progress (0..1) of an element crossing the viewport, used for text reveals.
 */
export function useViewportProgress(
  ref: RefObject<HTMLElement | null>,
  { start = 0.9, end = 0.1 }: { start?: number; end?: number } = {},
) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const lastRef = useRef(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const read = () => {
      frameRef.current = null;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const distance = vh * start - vh * end;
      if (distance <= 0) return;

      const next = quantize(
        Math.min(1, Math.max(0, (vh * start - rect.top) / distance)),
      );
      if (next === lastRef.current) return;
      lastRef.current = next;
      setProgress(next);
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [ref, start, end]);

  return progress;
}

/**
 * True once the page has scrolled past `offset`. Only re-renders on the
 * threshold crossing rather than on every scroll event.
 */
export function useScrolledPast(offset = 50) {
  const [scrolled, setScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const read = () => {
      frameRef.current = null;
      setScrolled(window.scrollY > offset);
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [offset]);

  return scrolled;
}

/**
 * Detects devices that should not run expensive pointer-driven effects:
 * touch-only devices and users who asked for reduced motion.
 */
export function useSupportsHeavyMotion() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Exclude coarse (touch) pointers rather than requiring a fine one, since
    // some environments report `pointer: none` and should still get the effect.
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Width and touch-point checks are the dependable signals: a cursor-driven
    // decoration has no purpose on a small or touch screen, and those are
    // exactly the devices where the extra repaints hurt.
    const wide = window.matchMedia("(min-width: 1024px)");

    const update = () =>
      setSupported(
        wide.matches &&
          !coarse.matches &&
          !reduced.matches &&
          (navigator.maxTouchPoints ?? 0) === 0,
      );

    update();
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);
    wide.addEventListener("change", update);

    return () => {
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  return supported;
}
