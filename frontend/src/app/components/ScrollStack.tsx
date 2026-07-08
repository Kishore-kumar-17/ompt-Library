import { useEffect, useRef, type ReactNode } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }: { children: ReactNode; itemClassName?: string }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  stackOffset?: number;
  scaleStep?: number;
  baseScale?: number;
}

const ScrollStack = ({
  children,
  className = '',
  stackOffset = 40,
  scaleStep = 0.04,
  baseScale = 0.92,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    if (!cards.length) return;

    // Each card gets position: sticky with staggered top
    cards.forEach((card, i) => {
      card.style.position = 'sticky';
      card.style.top = `${stackOffset}px`;
      card.style.zIndex = `${i + 1}`;
      card.style.transformOrigin = 'top center';
    });

    const update = () => {
      cards.forEach((card, i) => {
        if (i >= cards.length - 1) {
          card.style.transform = '';
          card.style.filter = '';
          return;
        }

        const cardRect = card.getBoundingClientRect();
        const nextRect = cards[i + 1].getBoundingClientRect();

        // How much the next card overlaps this one from below
        const overlap = cardRect.bottom - nextRect.top;

        if (overlap > 0) {
          const maxOverlap = cardRect.height * 0.6;
          const progress = Math.min(1, Math.max(0, overlap / maxOverlap));
          const targetScale = baseScale - i * scaleStep;
          const scale = 1 - progress * (1 - targetScale);
          const blur = progress * 3;

          card.style.transform = `scale(${scale.toFixed(4)})`;
          card.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : '';
        } else {
          card.style.transform = '';
          card.style.filter = '';
        }
      });
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount + after media loads
    update();
    const t1 = setTimeout(update, 500);
    const t2 = setTimeout(update, 1500);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
      cards.forEach((card) => {
        card.style.position = '';
        card.style.top = '';
        card.style.zIndex = '';
        card.style.transform = '';
        card.style.filter = '';
        card.style.transformOrigin = '';
      });
    };
  }, [stackOffset, scaleStep, baseScale]);

  return (
    <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
      {children}
    </div>
  );
};

export default ScrollStack;
