import { useEffect, useRef, useState } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { SprayCanCard, type SprayCanLayout } from "./SprayCanCard";
import { services } from "./data";

const canLayouts: Record<string, SprayCanLayout> = {
  publicidad: {
    x: "2.5%",
    y: "0%",
    width: "25vw",
    tabletX: "2.5%",
    tabletWidth: "25vw",
    rotate: "0deg",
    zIndex: 1,
    light: 1,
    lift: "0px",
    mobileX: "0%",
    mobileY: "0%",
    mobileWidth: "34vw",
    mobileLift: "0px",
  },
  branding: {
    x: "16.5%",
    y: "0%",
    width: "25vw",
    tabletX: "16.5%",
    tabletWidth: "25vw",
    rotate: "0deg",
    zIndex: 2,
    light: 1,
    lift: "0px",
    mobileX: "12.5%",
    mobileY: "0%",
    mobileWidth: "34vw",
    mobileLift: "0px",
  },
  estrategia: {
    x: "30.5%",
    y: "0%",
    width: "25vw",
    tabletX: "30.5%",
    tabletWidth: "25vw",
    rotate: "0deg",
    zIndex: 3,
    light: 1,
    lift: "0px",
    mobileX: "25%",
    mobileY: "0%",
    mobileWidth: "34vw",
    mobileLift: "0px",
  },
  diseno: {
    x: "44.5%",
    y: "0%",
    width: "25vw",
    tabletX: "44.5%",
    tabletWidth: "25vw",
    rotate: "0deg",
    zIndex: 4,
    light: 1,
    lift: "0px",
    mobileX: "37.5%",
    mobileY: "0%",
    mobileWidth: "34vw",
    mobileLift: "0px",
  },
  activaciones: {
    x: "58.5%",
    y: "0%",
    width: "25vw",
    tabletX: "58.5%",
    tabletWidth: "25vw",
    rotate: "0deg",
    zIndex: 5,
    light: 1,
    lift: "0px",
    mobileX: "50%",
    mobileY: "0%",
    mobileWidth: "34vw",
    mobileLift: "0px",
  },
  contenido: {
    x: "72.5%",
    y: "0%",
    width: "25vw",
    tabletX: "72.5%",
    tabletWidth: "25vw",
    rotate: "0deg",
    zIndex: 6,
    light: 1,
    lift: "0px",
    mobileX: "62.5%",
    mobileY: "0%",
    mobileWidth: "34vw",
    mobileLift: "0px",
  },
};

export function SprayCanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap }) => {
        if (cancelled || !sectionRef.current || prefersReducedMotion()) return;

        const section = sectionRef.current;

        ctx = gsap.context(() => {
          gsap.from(section.querySelectorAll("[data-services-header] > *"), {
            y: 50,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%" },
          });

          const cans = section.querySelectorAll<HTMLElement>("[data-can-card]");
          gsap.from(cans, {
            y: 90,
            autoAlpha: 0,
            scale: 0.88,
            rotate: -8,
            stagger: 0.08,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: section.querySelector("[data-can-stage]") ?? section,
              start: "top 78%",
            },
          });
        }, section);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="bg-rubric-black px-16 pt-32 pb-0 max-[900px]:px-8 max-[900px]:pt-20 max-[768px]:flex max-[768px]:min-h-svh max-[768px]:flex-col">
      <div
        data-services-header
        className="relative z-0 mb-8 flex items-end justify-between gap-8 max-[900px]:mb-4 max-[900px]:flex-col max-[900px]:items-start max-[768px]:mb-16">
        <h2 className="font-display text-[clamp(1.6rem,4vw,4rem)] leading-none uppercase font-semibold">
          Lo que hacemos.
        </h2>
      </div>

      <div
        className="spray-stage"
        data-can-stage
        onPointerLeave={() => setActiveSlug(null)}>
        {services.map((service) => (
          <SprayCanCard
            key={service.slug}
            service={service}
            layout={canLayouts[service.slug]}
            isActive={activeSlug === service.slug}
            isDimmed={activeSlug !== null && activeSlug !== service.slug}
            onActivate={setActiveSlug}
            onDeactivate={() => setActiveSlug(null)}
          />
        ))}
      </div>
    </section>
  );
}
