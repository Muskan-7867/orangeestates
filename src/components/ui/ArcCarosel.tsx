'use client';

import * as React from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '#/lib/utils';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const GLIDE = { stiffness: 170, damping: 26, mass: 1 } as const;
const TILT = { stiffness: 110, damping: 16 } as const;

const EASE_CSS = '[transition-timing-function:cubic-bezier(0.23,1,0.32,1)]';

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const DEG = Math.PI / 180;

export type ArcCarouselItem = {
  src: string;
  alt: string;
  label?: string;
};

export type ArcCarouselProps = {
  items: ArcCarouselItem[];
  defaultIndex?: number;
  accent?: string;
  ratio?: string;
  spread?: number;
  radius?: number;
  label?: string;
  className?: string;
};

export function ArcCarousel({
  items,
  defaultIndex = 0,
  accent = '#f0883e',
  ratio = '4 / 3',
  spread = 20,
  radius = 640,
  label = 'Arc carousel',
  className,
}: ArcCarouselProps) {
  const reduce = useReducedMotion();
  const count = items.length;
  const last = count - 1;

  const [active, setActive] = React.useState(() =>
    clamp(defaultIndex, 0, Math.max(0, last)),
  );

  const target = useMotionValue(active);
  const progress = useSpring(target, GLIDE);

  const tiltX = useSpring(0, TILT);
  const tiltY = useSpring(0, TILT);
  const sceneTransform = useMotionTemplate`rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

  const [finePointer, setFinePointer] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const stageRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{
    id: number;
    startX: number;
    base: number;
    lastX: number;
    lastT: number;
    velocity: number;
    moved: number;
  } | null>(null);
  const suppressClick = React.useRef(false);
const wrap = (index: number) => {
  return ((index % count) + count) % count;
};

const goTo = React.useCallback(
  (i: number) => {
    // Compute the wrapped destination
    const dest = wrap(i);
    // Find the current continuous position and take the shortest arc
    const cur = target.get();
    const curWrapped = wrap(Math.round(cur));
    let delta = dest - curWrapped;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    const continuous = cur + delta;
    setActive(dest);
    target.set(continuous);
  },
  [count, target],
);

  const onPointerDown = (e: React.PointerEvent) => {
    if (drag.current) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      base: target.get(),
      lastX: e.clientX,
      lastT: e.timeStamp,
      velocity: 0,
      moved: 0,
    };
    suppressClick.current = false;
    stageRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (finePointer && !reduce && !drag.current) {
      const rect = stageRef.current?.getBoundingClientRect();
      if (rect) {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        tiltX.set(nx * 5);
        tiltY.set(ny * -3);
      }
    }

    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 6) suppressClick.current = true;

    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;

    const step = (stageRef.current?.offsetWidth ?? 640) * 0.42;
    let raw = d.base - dx / step;
    // if (raw < 0) raw *= 0.35;
    // else if (raw > last) raw = last + (raw - last) * 0.35;
    target.jump(raw);
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    stageRef.current?.releasePointerCapture(d.id);

    const current = target.get();
    // Snap to nearest integer along the continuous axis, then goTo handles wrapping
    let next: number;
    if (Math.abs(d.velocity) > 0.35 && d.moved > 12) {
      next = d.velocity < 0 ? Math.ceil(current) : Math.floor(current);
    } else {
      next = Math.round(current);
    }
    // Use the continuous next directly so we don't jump
    const dest = wrap(next);
    setActive(dest);
    target.set(next);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(last);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      style={{ '--arc-accent': accent } as React.CSSProperties}
      className={cn(
        'relative w-full max-w-full  text-neutral-900 dark:text-white',
        className,
      )}
    >
      <div
        ref={stageRef}
        role="group"
        tabIndex={0}
        aria-label={`Card ${active + 1} of ${count}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={onPointerLeave}
        onKeyDown={onKeyDown}
        className={cn(
          'relative h-[500px] touch-pan-y select-none rounded-[18px]',
          'cursor-grab active:cursor-grabbing',
          'focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:[outline-color:var(--arc-accent)]',
        )}
        style={{ perspective: 1300 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-[62%] left-1/2 h-14 w-[46%] -translate-x-1/2 rounded-[100%] bg-black/15 blur-2xl dark:bg-black/50"
        />

        <motion.div
          style={{
            transform: reduce ? undefined : sceneTransform,
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        >
          {items.map((item, i) => (
            <ArcCard
              key={i}
              item={item}
              index={i}
              count={count}
              progress={progress}
              ratio={ratio}
              spread={spread}
              radius={radius}
              active={i === active}
              reduce={!!reduce}
              onSelect={() => {
                if (!suppressClick.current) goTo(i);
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* <div className="mt-1 flex items-center justify-center gap-5 mb-4">
        <ArcArrow
          dir="prev"
          disabled={active <= 0}
          onClick={() => goTo(active - 1)}
        />

        <div
          aria-hidden
          className="flex items-baseline gap-1 text-[13px] font-medium tabular-nums tracking-[-0.01em]"
        >
          <span style={{ color: 'var(--arc-accent)' }}>
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="text-neutral-400 dark:text-neutral-600">/</span>
          <span className="text-neutral-400 dark:text-neutral-500">
            {String(count).padStart(2, '0')}
          </span>
        </div>

        <ArcArrow
          dir="next"
          disabled={active >= last}
          onClick={() => goTo(active + 1)}
        />
      </div> */}

      <span aria-live="polite" className="sr-only">
        Card {active + 1} of {count}: {items[active]?.alt}
      </span>
    </section>
  );
}

function ArcArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  const Chevron = dir === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous card' : 'Next card'}
      disabled={disabled}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onClick}
      className={cn(
        'bloom-edge group grid size-9 shrink-0 place-items-center rounded-full',
        'bg-gradient-to-b from-white to-[#f1f1f2] dark:from-[#272727] dark:to-[#1c1c1c]',
        'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_1px_2px_0_rgba(0,0,0,0.5),0_8px_20px_-10px_rgba(0,0,0,0.7)]',
        `transition-[transform,opacity] duration-150 ${EASE_CSS}`,
        'hover:-translate-y-px active:scale-[0.94] active:translate-y-0',
        'motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
        'disabled:pointer-events-none disabled:opacity-35',
        'focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:[outline-color:var(--arc-accent)]',
      )}
    >
      <Chevron
        size={17}
        strokeWidth={2}
        aria-hidden
        className={cn(
          'text-neutral-600 dark:text-neutral-300',
          `transition-transform duration-200 ${EASE_CSS}`,
          dir === 'prev'
            ? 'group-hover:-translate-x-0.5'
            : 'group-hover:translate-x-0.5',
          'motion-reduce:transition-none motion-reduce:group-hover:translate-x-0',
        )}
      />
    </button>
  );
}

function ArcCard({
  item,
  index,
  count,
  progress,
  ratio,
  spread,
  radius,
  active,
  reduce,
  onSelect,
}: {
  item: ArcCarouselItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
  ratio: string;
  spread: number;
  radius: number;
  active: boolean;
  reduce: boolean;
  onSelect: () => void;
}) {

const d = useTransform(progress, (v) => {
  let diff = index - v;

  while (diff > count / 2) diff -= count;
  while (diff < -count / 2) diff += count;

  return diff;
});
  const transform = useTransform(d, (t) => {
    if (reduce) return 'translate(-50%, -50%)';
    const c = clamp(t, -4, 4);
    const a = Math.abs(c);
    const phi = c * spread * DEG;
    const x = radius * Math.sin(phi);
    const y = radius * (1 - Math.cos(phi)) * 0.78;
    const z = -a * 130;
    const scale = 1 - Math.min(a * 0.04, 0.28);
    const rot = c * spread;
    return `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateZ(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });

  const opacity = useTransform(d, (t) => {
    const a = Math.abs(t);
    if (reduce) return a < 0.5 ? 1 : 0;
    if (a <= 1) return 1;
    return Math.max(0, 1 - (a - 1) * 0.4);
  });

  const filter = useTransform(d, (t) =>
    reduce ? 'none' : `blur(${Math.min(Math.abs(t) * 1.3, 4.5).toFixed(2)}px)`,
  );

  const zIndex = useTransform(d, (t) => 100 - Math.round(Math.abs(t) * 10));

  const pointerEvents = useTransform(d, (t) =>
    Math.abs(t) > 3.2 ? ('none' as const) : ('auto' as const),
  );

  return (
    <motion.div
      aria-hidden={!active}
      style={{
        transform,
        opacity,
        filter,
        zIndex,
        pointerEvents,
        aspectRatio: ratio,
      }}
      onClick={onSelect}
      className={cn(
        'absolute top-[38%] left-1/2 w-[min(54%,350px)] overflow-hidden rounded-[13px]',
        'bloom-edge bg-neutral-200 dark:bg-[#242424]',
        'shadow-[0_1px_2px_0_rgba(0,0,0,0.08),0_16px_34px_-14px_rgba(0,0,0,0.28)]',
        'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_1px_2px_0_rgba(0,0,0,0.4),0_20px_48px_-14px_rgba(0,0,0,0.72)]',
        !active && 'cursor-pointer',
      )}
    >
      <img
        src={item.src}
        alt={active ? item.alt : ''}
        draggable={false}
        decoding="async"
        className="pointer-events-none block size-full object-cover"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[13px] bg-gradient-to-b from-white/12 to-transparent to-35% dark:from-white/[0.08]"
      />

      {item.label && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-3 pt-10',
            'bg-gradient-to-t from-black/60 via-black/15 to-transparent',
            `transition-opacity duration-300 ${EASE_CSS}`,
            active ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span className="truncate text-[12.5px] font-medium tracking-[-0.01em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {item.label}
          </span>
        </div>
      )}

      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[13px] bg-black/20',
          `transition-opacity duration-300 ${EASE_CSS}`,
          active ? 'opacity-0' : 'opacity-100',
        )}
      />
    </motion.div>
  );
}