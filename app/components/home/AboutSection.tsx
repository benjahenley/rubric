import { useEffect, useRef } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { formatStatValue, stats } from "./data";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !sectionRef.current) return;

        const section = sectionRef.current;

        ctx = gsap.context(() => {
          const statNumbers = Array.from(
            section.querySelectorAll<HTMLElement>("[data-stat-number]"),
          );

          if (prefersReducedMotion()) {
            statNumbers.forEach((statNumber) => {
              statNumber.textContent =
                statNumber.dataset.statFinal ?? statNumber.textContent;
            });
            return;
          }

          statNumbers.forEach((statNumber) => {
            statNumber.textContent = formatStatValue(0, {
              prefix: statNumber.dataset.statPrefix,
              suffix: statNumber.dataset.statSuffix,
              padStart: Number(statNumber.dataset.statPadStart ?? 0),
            });
          });

          const statsCounterTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top 78%",
            once: true,
            onEnter: () => {
              statNumbers.forEach((statNumber, index) => {
                const target = Number(statNumber.dataset.statTarget ?? 0);
                const counter = { value: 0 };

                gsap.to(counter, {
                  value: target,
                  delay: index * 0.08,
                  duration: 1.5,
                  ease: "power2.out",
                  onUpdate: () => {
                    statNumber.textContent = formatStatValue(counter.value, {
                      prefix: statNumber.dataset.statPrefix,
                      suffix: statNumber.dataset.statSuffix,
                      padStart: Number(statNumber.dataset.statPadStart ?? 0),
                    });
                  },
                  onComplete: () => {
                    statNumber.textContent =
                      statNumber.dataset.statFinal ?? statNumber.textContent;
                  },
                });
              });
            },
          });
          cleanups.push(() => statsCounterTrigger.kill());

          gsap.from(
            section.querySelectorAll(":scope > div:first-of-type > *"),
            {
              y: 50,
              autoAlpha: 0,
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 78%" },
            },
          );

          const revealItems =
            section.querySelectorAll<HTMLElement>("[data-reveal]");
          gsap.from(revealItems, {
            x: 80,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: revealItems[0] ?? section,
              start: "top 78%",
            },
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
      id="nosotros"
      ref={sectionRef}
      className="grid grid-cols-2 items-center gap-24 bg-rubric-cream px-16 py-32 text-rubric-black max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[900px]:px-8 max-[900px]:py-20">
      <div>
        <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-50">
          Quiénes somos
        </p>
        <h2 className="mb-8 font-display text-[clamp(3rem,6vw,6rem)] leading-none tracking-[0.01em]">
          Talento Senior
          <br />
          al <em className="not-italic text-rubric-red">servicio</em>
          <br />
          de tu marca.
        </h2>
        <p className="mb-8 text-[1.1rem] leading-[1.8] font-light text-[rgba(10,10,10,0.75)]">
          En Rubric reunimos al mejor talento publicitario para hacer fit con
          los proyectos de nuestros clientes. Una agencia colaborativa con
          talento senior especialmente convocado para cada proyecto.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {stats.map((stat) => (
          <div
            className="border-t border-[rgba(10,10,10,0.12)] pt-6"
            data-reveal
            key={stat.label}>
            <div
              className="mb-1 font-display text-[4rem] leading-none text-rubric-red"
              data-stat-final={formatStatValue(stat.value, stat)}
              data-stat-number
              data-stat-pad-start={stat.padStart ?? 0}
              data-stat-prefix={stat.prefix ?? ""}
              data-stat-suffix={stat.suffix ?? ""}
              data-stat-target={stat.value}>
              {formatStatValue(stat.value, stat)}
            </div>
            <div className="text-[0.85rem] font-light tracking-[0.05em] opacity-60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
