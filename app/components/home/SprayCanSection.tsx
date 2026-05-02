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
    x: "6%",
    y: "10%",
    width: "33vw",
    rotate: "-3deg",
    zIndex: 6,
    light: 1,
    lift: "-90px",
    mobileX: "10%",
    mobileY: "37%",
    mobileWidth: "40vw",
    mobileLift: "-55px",
  },
  branding: {
    x: "25%",
    y: "8%",
    width: "28vw",
    rotate: "-1deg",
    zIndex: 5,
    light: 0.82,
    lift: "-68px",
    mobileX: "40%",
    mobileY: "44%",
    mobileWidth: "40vw",
    mobileLift: "-42px",
  },
  estrategia: {
    x: "43%",
    y: "14%",
    width: "23vw",
    rotate: "1deg",
    zIndex: 4,
    light: 0.65,
    lift: "-48px",
    mobileX: "70%",
    mobileY: "38%",
    mobileWidth: "36vw",
    mobileLift: "-30px",
  },
  diseno: {
    x: "58%",
    y: "14%",
    width: "19vw",
    rotate: "3deg",
    zIndex: 3,
    light: 0.5,
    lift: "-32px",
    mobileX: "-8%",
    mobileY: "16%",
    mobileWidth: "33vw",
    mobileLift: "-20px",
  },
  activaciones: {
    x: "72%",
    y: "15%",
    width: "16vw",
    rotate: "5deg",
    zIndex: 2,
    light: 0.38,
    lift: "-18px",
    mobileX: "30%",
    mobileY: "11%",
    mobileWidth: "30vw",
    mobileLift: "-12px",
  },
  contenido: {
    x: "85%",
    y: "16%",
    width: "13vw",
    rotate: "6deg",
    zIndex: 1,
    light: 0.28,
    lift: "-8px",
    mobileX: "68%",
    mobileY: "9%",
    mobileWidth: "21vw",
    mobileLift: "-5px",
  },
};

export function SprayCanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeService = services.find((service) => service.slug === activeSlug);

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
      className="bg-rubric-black px-16 pt-32 pb-0 max-[900px]:px-8 max-[900px]:pt-20">
      <div
        data-services-header
        className="relative z-10 mb-8 flex items-end justify-between gap-8 max-[900px]:mb-4 max-[900px]:flex-col max-[900px]:items-start">
        <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-none">
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

        <div
          className="spray-service-copy"
          data-visible={activeService ? "true" : undefined}
          aria-live="polite">
          {activeService ? <p>{activeService.description}</p> : null}
        </div>
      </div>
    </section>
  );
}
