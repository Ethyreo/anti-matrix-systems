import { useEffect, useState } from "react";

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Respect reduced motion preference (fixes forced-reflow-insight)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Don't apply parallax if user prefers reduced motion
    }

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      // Use RAF to avoid forced reflows (fixes forced-reflow-insight)
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setOffset(lastScrollY * speed);
          rafId = 0;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speed]);

  return offset;
};
