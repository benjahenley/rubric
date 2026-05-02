import { useEffect, useRef, type CSSProperties } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { cases, services } from "./data";

const caseCardAspectRatio = "85.82 / 141.73";

function renderCaseName(name: string | string[]) {
  if (typeof name === "string") return name;

  return name.map((line, index) => (
    <span className="block" key={`${line}-${index}`}>
      {line.trim()}
    </span>
  ));
}

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

          const cardContainers = section.querySelectorAll<HTMLElement>(
            ".case-card-container",
          );

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
      <div className="mx-auto grid max-w-[1300px] grid-cols-3 gap-[2px] max-[900px]:max-w-[740px] max-[900px]:grid-cols-2 max-[640px]:max-w-[360px] max-[640px]:grid-cols-1">
        {cases.map((caseItem, index) => {
          const canColor = services[index % services.length].color;
          const isMediaLaugh = caseItem.stickerImage;
          const faceStyle = {
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: canColor,
            color: "#f5f0e8",
          } as const;
          const frontStyle = caseItem.coverImage
            ? ({
                ...faceStyle,
                backgroundColor: "#000",
                backgroundImage: `url(${caseItem.coverImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              } satisfies CSSProperties)
            : faceStyle;
          const backStyle = isMediaLaugh
            ? ({
                ...faceStyle,
                backgroundColor: "#000",
                color: "#d6f20c",
                transform: "rotateY(180deg)",
              } satisfies CSSProperties)
            : ({
                ...faceStyle,
                transform: "rotateY(180deg)",
              } satisfies CSSProperties);

          return (
            <div
              className="case-card-container relative z-0 [perspective:1000px] hover:z-[1]"
              data-reveal
              key={caseItem.number}
              style={{ aspectRatio: caseCardAspectRatio }}>
              <div
                className="case-card-inner relative h-full w-full transition-transform duration-700"
                style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden px-10 py-14 max-[700px]:px-6 max-[700px]:py-9"
                  style={frontStyle}>
                  {caseItem.coverImage ? (
                    <>
                      <div className="font-display text-[0.85rem] tracking-[0.1em] text-white opacity-70">
                        {caseItem.number}
                      </div>
                      <div>
                        <div className="max-w-[92%] font-display text-[3rem] leading-[0.95] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] max-[700px]:text-[2.35rem]">
                          {renderCaseName(caseItem.name)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-auto font-display text-[0.85rem] tracking-[0.1em] opacity-40">
                        {caseItem.number}
                      </div>
                      <div>
                        <div className="font-display text-[3rem] leading-[0.95] max-[700px]:text-[2.35rem]">
                          {renderCaseName(caseItem.name)}
                        </div>
                      </div>
                      <div className="pointer-events-none absolute right-[-1rem] bottom-[-1rem] select-none font-display text-[8rem] leading-none opacity-[0.04]">
                        {caseItem.initials}
                      </div>
                    </>
                  )}
                </div>

                <div
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden px-10 py-14 max-[700px]:px-6 max-[700px]:py-9"
                  style={backStyle}>
                  {caseItem.stickerImage ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-6 right-5 h-24 w-24 select-none max-[700px]:top-4 max-[700px]:right-3 max-[700px]:h-20 max-[700px]:w-20">
                      <div className="absolute right-[14%] bottom-[2%] left-[14%] h-[18%] rounded-full bg-[#9faf0a]/35 blur-md" />
                      <img
                        alt=""
                        className="relative h-full w-full object-contain drop-shadow-[0_10px_16px_rgba(79,89,2,0.22)]"
                        src={caseItem.stickerImage}
                      />
                    </div>
                  ) : null}
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
