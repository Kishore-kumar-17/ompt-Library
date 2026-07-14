import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

// Recursively wrap every text word in a <span class="sr-word">
function wrapWords(node: React.ReactNode, keyPrefix = "w"): React.ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((tok, i) => {
      if (/^\s+$/.test(tok)) return tok;
      return <span className="sr-word" style={{ display: "inline-block" }} key={`${keyPrefix}-${i}`}>{tok}</span>;
    });
  }
  if (Array.isArray(node)) {
    return node.map((n, i) => (
      <React.Fragment key={`${keyPrefix}-${i}`}>{wrapWords(n, `${keyPrefix}-${i}`)}</React.Fragment>
    ));
  }
  if (React.isValidElement(node)) {
    const kids = (node.props as { children?: React.ReactNode }).children;
    if (kids == null) return node;
    return React.cloneElement(node, undefined, wrapWords(kids, keyPrefix));
  }
  return node;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const wrapped = useMemo(() => wrapWords(children), [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect the user's motion preference: skip the scroll-linked
    // rotate/opacity/blur animation and just show the content normally.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const scroller =
      scrollContainerRef?.current ?? window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true,
          },
        }
      );

      const wordElements = el.querySelectorAll('.sr-word');

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      }
    }, el);

    // Images/fonts loading after mount can shift layout and invalidate the
    // trigger positions ScrollTrigger measured on mount — recalculate once
    // everything has actually loaded so above-the-fold content doesn't
    // flash from visible to dimmed.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={containerClassName}>
      {wrapped}
    </div>
  );
}
