import { useEffect, useRef } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { partnerLogos } from "./data";

export function LogosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap, ScrollTrigger }) => {
        if (
          cancelled ||
          !sectionRef.current ||
          !trackRef.current ||
          prefersReducedMotion()
        ) {
          return;
        }

        const section = sectionRef.current;
        const track = trackRef.current;

        ctx = gsap.context(() => {
          const loop = gsap.to(track, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
          let decay: ReturnType<typeof setTimeout> | null = null;
          const st = ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const v = self.getVelocity();
              const sign = v < 0 ? -1 : 1;
              const factor = gsap.utils.clamp(1, 8, 1 + Math.abs(v) / 600);
              gsap.to(loop, {
                timeScale: factor * sign,
                duration: 0.3,
                overwrite: true,
              });
              if (decay) clearTimeout(decay);
              decay = setTimeout(() => {
                gsap.to(loop, { timeScale: sign, duration: 0.9 });
              }, 180);
            },
          });
          cleanups.push(() => {
            if (decay) clearTimeout(decay);
            loop.kill();
            st.kill();
          });
        }, section);
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
      ref={sectionRef}
      className="logos-section overflow-hidden border-y border-rubric-black/10 bg-white py-12 max-[900px]:py-8">
      <div
        ref={trackRef}
        className="logos-track flex w-max items-center gap-20 will-change-transform max-[900px]:gap-12">
        {[...partnerLogos, ...partnerLogos].map((logo, i) => (
          <div
            className="flex h-10 shrink-0 items-center justify-center max-[900px]:h-7"
            key={i}>
            <img
              alt=""
              className="h-full w-auto object-contain opacity-80"
              loading="lazy"
              src={`/companyLogos/${encodeURIComponent(logo)}`}
              style={{
                filter: "grayscale(1) contrast(1.1)",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
