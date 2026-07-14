import { useEffect, useRef, useState, type ReactNode, Children } from 'react';
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
  const isSnapping = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const cardCount = Children.count(children);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    if (!cards.length) return;

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

    const detectActive = () => {
      const containerRect = container.getBoundingClientRect();
      const inView = containerRect.top < window.innerHeight && containerRect.bottom > 0;
      setDotsVisible(inView);

      if (!inView) return;

      for (let i = cards.length - 1; i >= 0; i--) {
        const rect = cards[i].getBoundingClientRect();
        if (rect.top <= stackOffset + 50) {
          setActiveIndex(i);
          break;
        }
      }
    };

    const getCardOffsets = () => {
      const offsets: number[] = [];
      let offset = 0;
      cards.forEach((card, i) => {
        offsets.push(container.offsetTop + offset);
        offset += card.offsetHeight + (i < cards.length - 1 ? 40 : 0);
      });
      return offsets;
    };

    const currentCardIndex = () => {
      let currentIdx = 0;
      for (let i = cards.length - 1; i >= 0; i--) {
        const rect = cards[i].getBoundingClientRect();
        if (rect.top <= stackOffset + 50) {
          currentIdx = i;
          break;
        }
      }
      return currentIdx;
    };

    const inActiveZone = () => {
      const r = container.getBoundingClientRect();
      return r.top <= window.innerHeight * 0.3 && r.bottom >= window.innerHeight * 0.3;
    };

    const snapToDirection = (direction: 1 | -1) => {
      const nextIdx = currentCardIndex() + direction;
      if (nextIdx < 0 || nextIdx >= cards.length) return false;
      isSnapping.current = true;
      const offsets = getCardOffsets();
      window.scrollTo({ top: offsets[nextIdx] - stackOffset + 20, behavior: 'smooth' });
      setTimeout(() => { isSnapping.current = false; }, 600);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!inActiveZone()) return;
      if (isSnapping.current) { e.preventDefault(); return; }
      const direction = e.deltaY > 0 ? 1 : -1;
      if (snapToDirection(direction)) e.preventDefault();
    };

    // Touch: same snap-per-gesture behavior as wheel, so mobile matches desktop
    // instead of scrolling freely through the stack.
    let touchStartY = 0;
    let touchActive = false;
    const TOUCH_THRESHOLD = 32;

    const onTouchStart = (e: TouchEvent) => {
      if (!inActiveZone() || isSnapping.current) { touchActive = false; return; }
      touchStartY = e.touches[0].clientY;
      touchActive = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchActive || isSnapping.current) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < TOUCH_THRESHOLD) return;
      const direction = dy > 0 ? 1 : -1;
      touchActive = false;
      if (snapToDirection(direction)) e.preventDefault();
    };
    const onTouchEnd = () => { touchActive = false; };

    // Store getCardOffsets on container for dot click access
    (container as any).__getCardOffsets = getCardOffsets;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        update();
        detectActive();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    update();
    detectActive();
    const t1 = setTimeout(update, 500);
    const t2 = setTimeout(update, 1500);

    return () => {
      window.removeEventListener('scroll', onScroll);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
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

  const scrollToCard = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const getOffsets = (container as any).__getCardOffsets;
    if (!getOffsets) return;
    const offsets = getOffsets();
    window.scrollTo({ top: offsets[i] - stackOffset + 20, behavior: 'smooth' });
  };

  return (
    <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
      {/* Dot indicators — fixed on right side, only visible when section is in view */}
      <nav className="scroll-stack-dots" aria-label="Section navigation" style={{ opacity: dotsVisible ? 1 : 0, pointerEvents: dotsVisible ? 'auto' : 'none' }}>
        {Array.from({ length: cardCount }).map((_, i) => (
          <button
            key={i}
            className={`scroll-stack-dot ${activeIndex === i ? 'active' : ''}`}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </nav>
      {children}
    </div>
  );
};

export default ScrollStack;
