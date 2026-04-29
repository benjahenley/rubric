import { useEffect, useRef } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { cases } from "./data";

export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    const flipTimeouts = new Map<number, ReturnType<typeof setTimeout>>();
    const flipCleanups: Array<() => void> = [];

    void loadGsapWithScrollTrigger()
      .then(({ gsap }) => {
        if (cancelled || !sectionRef.current || prefersReducedMotion()) return;

        const section = sectionRef.current;

        ctx = gsap.context(() => {
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
            clipPath: "inset(100% 0 0 0)",
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: revealItems[0] ?? section,
              start: "top 78%",
            },
          });

          const cardContainers =
            section.querySelectorAll<HTMLElement>(".case-card-container");

          cardContainers.forEach((container, index) => {
            const inner =
              container.querySelector<HTMLElement>(".case-card-inner");

            if (!inner) return;

            gsap.set(inner, { rotationY: 0 });

            const flipToBack = () => {
              if (flipTimeouts.has(index)) {
                clearTimeout(flipTimeouts.get(index));
              }

              gsap.to(inner, {
                rotationY: 180,
                duration: 0.15,
                ease: "power1.out",
              });

              const timeout = setTimeout(() => {
                gsap.to(inner, {
                  rotationY: 0,
                  duration: 0.15,
                  ease: "power1.out",
                });
                flipTimeouts.delete(index);
              }, 3000);

              flipTimeouts.set(index, timeout);
            };

            const flipToFront = () => {
              if (flipTimeouts.has(index)) {
                clearTimeout(flipTimeouts.get(index));
                flipTimeouts.delete(index);
              }

              gsap.to(inner, {
                rotationY: 0,
                duration: 0.15,
                ease: "power1.out",
              });
            };

            container.addEventListener("mouseenter", flipToBack);
            container.addEventListener("mouseleave", flipToFront);

            flipCleanups.push(() => {
              container.removeEventListener("mouseenter", flipToBack);
              container.removeEventListener("mouseleave", flipToFront);
            });
          });
        }, section);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
      flipTimeouts.forEach((timeout) => clearTimeout(timeout));
      flipCleanups.forEach((cleanup) => cleanup());
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="clientes"
      ref={sectionRef}
      className="bg-rubric-white px-16 py-32 text-rubric-black max-[900px]:px-8 max-[900px]:py-20">
      <div className="mb-16">
        <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-50">
          Casos & Clientes
        </p>
        <h2 className="mb-4 font-display text-[clamp(3rem,7vw,7rem)] leading-none">
          Marcas que
          <br />
          trabajaron con nosotros.
        </h2>
        <p className="max-w-[500px] text-[0.95rem] leading-[1.7] font-light text-[rgba(10,10,10,0.5)]">
          Trabajamos con marcas que necesitaban algo más que una agencia.
          Necesitaban un socio creativo de verdad.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-[2px] max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
        {cases.map((caseItem) => {
          const toneClass =
            caseItem.variant === "accent"
              ? "bg-rubric-red text-rubric-white"
              : caseItem.variant === "light"
                ? "bg-rubric-cream text-rubric-black"
                : "bg-rubric-black text-rubric-white";

          const faceStyle = {
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          } as const;

          return (
            <div
              className="case-card-container relative z-0 min-h-[320px] [perspective:1000px] hover:z-[1] max-[700px]:min-h-[300px]"
              data-reveal
              key={caseItem.number}>
              <div
                className="case-card-inner relative min-h-[320px] w-full transition-transform duration-700 max-[700px]:min-h-[300px]"
                style={{ transformStyle: "preserve-3d" }}>
                <div
                  className={`absolute inset-0 flex flex-col justify-between overflow-hidden px-10 py-14 max-[700px]:px-6 max-[700px]:py-9 ${toneClass}`}
                  style={faceStyle}>
                  <div className="mb-auto font-display text-[0.85rem] tracking-[0.1em] opacity-40">
                    {caseItem.number}
                  </div>
                  <div>
                    <div className="font-display text-[3rem] leading-[0.95] max-[700px]:text-[2.35rem]">
                      {caseItem.name}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute right-[-1rem] bottom-[-1rem] select-none font-display text-[8rem] leading-none opacity-[0.04]">
                    {caseItem.initials}
                  </div>
                </div>

                <div
                  className={`absolute inset-0 flex flex-col justify-between overflow-hidden px-10 py-14 max-[700px]:px-6 max-[700px]:py-9 ${toneClass}`}
                  style={{
                    ...faceStyle,
                    transform: "rotateY(180deg)",
                  }}>
                  <div className="font-display text-[0.85rem] tracking-[0.1em] opacity-40">
                    {caseItem.number}
                  </div>
                  <div className="flex min-h-[60%] items-center border-t border-current/20 pt-8">
                    <div className="max-w-[92%] font-sans text-[clamp(1.45rem,2.15vw,2.25rem)] leading-[1.1] font-light tracking-[0.01em] uppercase">
                      {caseItem.type}
                    </div>
                  </div>
                  <div className="text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-45">
                    Proyecto
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
