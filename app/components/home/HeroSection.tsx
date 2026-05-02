import { useEffect, useRef } from "react";

import {
  loadGsap,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void loadGsap()
      .then((gsap) => {
        if (
          cancelled ||
          !sectionRef.current ||
          !cursorRef.current ||
          !ctaRef.current
        ) {
          return;
        }

        const hero = sectionRef.current;
        const cursor = cursorRef.current;
        const cta = ctaRef.current;

        ctx = gsap.context(() => {
          gsap.set(cursor, { autoAlpha: 0, xPercent: -50, yPercent: -50 });

          if (prefersReducedMotion()) {
            hero.style.cursor = "auto";
            cleanups.push(() => {
              hero.style.cursor = "";
            });
            return;
          }

          const xTo = gsap.quickTo(cursor, "x", {
            duration: 0.35,
            ease: "power3",
          });
          const yTo = gsap.quickTo(cursor, "y", {
            duration: 0.35,
            ease: "power3",
          });
          const ctaXTo = gsap.quickTo(cta, "x", {
            duration: 0.55,
            ease: "power3",
          });
          const ctaYTo = gsap.quickTo(cta, "y", {
            duration: 0.55,
            ease: "power3",
          });

          const onMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
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
          const onEnter = () =>
            gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.3 });
          const onLeave = () => {
            gsap.to(cursor, { autoAlpha: 0, scale: 0.4, duration: 0.3 });
            ctaXTo(0);
            ctaYTo(0);
          };

          hero.addEventListener("mousemove", onMove);
          hero.addEventListener("mouseenter", onEnter);
          hero.addEventListener("mouseleave", onLeave);

          cleanups.push(() => {
            hero.removeEventListener("mousemove", onMove);
            hero.removeEventListener("mouseenter", onEnter);
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
      className="relative flex min-h-screen cursor-none flex-col justify-end overflow-hidden px-16 pt-32 pb-20 max-[900px]:px-8 max-[900px]:pt-28 max-[900px]:pb-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          src="/banner.webp"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-1 bg-rubric-black/55" />
      <div
        ref={cursorRef}
        className="hero-cursor pointer-events-none fixed top-0 left-0 z-[150] h-3 w-3 rounded-full bg-rubric-white opacity-0 max-[900px]:hidden"
        style={{ mixBlendMode: "difference" }}
      />
      <div className="absolute top-0 left-16 z-10 h-screen w-px bg-[rgba(245,240,232,0.08)]" />
      <div
        className="hero-glass-word pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(14rem,28vw,30rem)] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgba(245,240,232,0.1)]"
        data-text="RUBRIC">
        RUBRIC
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
      <div className="relative z-10 flex items-end justify-between gap-8 overflow-hidden max-[900px]:flex-col max-[900px]:items-start">
        <div className="max-w-[600px]">
          <p className="hero-tag mb-4 text-[0.75rem] font-medium tracking-[0.2em] text-rubric-red uppercase">
            Agencia de publicidad colaborativa — Buenos Aires, Argentina
          </p>
          <p className="hero-tagline text-[clamp(1rem,1.8vw,1.4rem)] leading-[1.6] font-light text-[rgba(245,240,232,0.7)] italic">
            Todo lo que hacen las marcas comunica.
            <br />Y si comunica, nos gusta hacerlo.
          </p>
        </div>
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
