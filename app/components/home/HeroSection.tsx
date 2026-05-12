import { useEffect, useRef } from "react";

import {
  loadGsap,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void loadGsap()
      .then((gsap) => {
        if (cancelled || !sectionRef.current || !ctaRef.current) {
          return;
        }

        const hero = sectionRef.current;
        const cta = ctaRef.current;

        ctx = gsap.context(() => {
          if (prefersReducedMotion()) {
            return;
          }

          const ctaXTo = gsap.quickTo(cta, "x", {
            duration: 0.55,
            ease: "power3",
          });
          const ctaYTo = gsap.quickTo(cta, "y", {
            duration: 0.55,
            ease: "power3",
          });

          const onMove = (e: MouseEvent) => {
            const r = cta.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const radius = 180;
            if (dist < radius) {
              const k = 0.4 * (1 - dist / radius);
              ctaXTo(dx * k);
              ctaYTo(dy * k);
            } else {
              ctaXTo(0);
              ctaYTo(0);
            }
          };
          const onLeave = () => {
            ctaXTo(0);
            ctaYTo(0);
          };

          hero.addEventListener("mousemove", onMove);
          hero.addEventListener("mouseleave", onLeave);

          cleanups.push(() => {
            hero.removeEventListener("mousemove", onMove);
            hero.removeEventListener("mouseleave", onLeave);
          });
        }, hero);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-16 pt-32 pb-20 max-[900px]:px-8 max-[900px]:pt-28 max-[900px]:pb-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          src="/recorte%201.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-1 bg-rubric-black/55" />
      <div className="absolute top-0 left-16 z-10 h-screen w-px bg-[rgba(245,240,232,0.08)]" />
      <div
        className="hero-glass-word pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(14rem,28vw,30rem)] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgba(245,240,232,0.1)]"
        data-text="RUBRIC"></div>
      <div className="pointer-events-none absolute inset-x-16 top-1/2 z-20 -translate-y-1/2 max-[900px]:inset-x-8">
        <p className="hero-tagline pointer-events-auto max-w-[1400px] font-display text-[clamp(1.6rem,4vw,4rem)] leading-[1.05] font-bold text-rubric-white italic uppercase">
          Todo lo que hacen las
          <br />marcas comunica.
          <br />Y si comunica, nos gusta
          <br />hacerlo.
        </p>
      </div>
      <h1 className="relative z-10 mb-10 leading-none">
        <span className="hero-logo-lockup inline-block will-change-transform">
          <span className="block overflow-hidden">
            <img
              alt="Rubric"
              className="hero-logo h-[clamp(4rem,12vw,12rem)] w-auto"
              src="/logo-rubric.png"
            />
          </span>
        </span>
      </h1>
      <div className="relative z-10 flex items-end justify-end gap-8 max-[900px]:flex-col max-[900px]:items-start">
        <a
          ref={ctaRef}
          className="hero-cta inline-flex shrink-0 items-center gap-3 bg-rubric-red px-8 py-4 text-[0.85rem] font-medium tracking-[0.12em] whitespace-nowrap text-rubric-white uppercase no-underline transition-colors duration-200 hover:bg-rubric-red-dark"
          href="#contacto">
          Hablemos
        </a>
      </div>
    </section>
  );
}
