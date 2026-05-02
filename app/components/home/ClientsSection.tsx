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
    const cleanups: Array<() => void> = [];
    const flipTimeouts = new Map<number, ReturnType<typeof setTimeout>>();
    const flipCleanups: Array<() => void> = [];

    void loadGsapWithScrollTrigger()
      .then(({ gsap, ScrollTrigger }) => {
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

            const mediaLaughBall =
              container.querySelector<HTMLElement>(".medialaugh-ball");

            gsap.set(inner, { rotationY: 0 });
            let isHovered = false;

            const flipToBack = () => {
              isHovered = true;

              if (flipTimeouts.has(index)) {
                clearTimeout(flipTimeouts.get(index));
                flipTimeouts.delete(index);
              }

              gsap.to(inner, {
                rotationY: 180,
                duration: 0.15,
                ease: "power1.out",
              });

              if (mediaLaughBall) {
                mediaLaughBall.classList.remove("is-rolling");
                void mediaLaughBall.offsetWidth;
                mediaLaughBall.classList.add("is-rolling");
              }

              const timeout = setTimeout(() => {
                if (isHovered) return;

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
              isHovered = false;

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

            const clearMediaLaughBall = (event: AnimationEvent) => {
              if (mediaLaughBall && event.target === mediaLaughBall) {
                mediaLaughBall.classList.remove("is-rolling");
              }
            };

            container.addEventListener("mouseenter", flipToBack);
            container.addEventListener("mouseleave", flipToFront);
            mediaLaughBall?.addEventListener(
              "animationend",
              clearMediaLaughBall,
            );

            flipCleanups.push(() => {
              container.removeEventListener("mouseenter", flipToBack);
              container.removeEventListener("mouseleave", flipToFront);
              mediaLaughBall?.removeEventListener(
                "animationend",
                clearMediaLaughBall,
              );
            });
          });

          const mm = gsap.matchMedia();
          cleanups.push(() => mm.revert());

          mm.add("(min-width: 901px)", () => {
            const strip =
              section.querySelector<HTMLElement>(".nupark-plan-strip");
            const image =
              section.querySelector<HTMLImageElement>(".nupark-plan-image");

            if (!strip || !image) return;

            let maxOffset = 0;
            let scrollTrigger: ScrollTrigger | undefined;

            const setX = gsap.quickSetter(image, "x", "px");
            const applyProgress = (progress: number) => {
              setX(-maxOffset * progress);
            };

            const measure = () => {
              maxOffset = Math.max(0, image.scrollWidth - strip.clientWidth);
              applyProgress(scrollTrigger?.progress ?? 0);
            };

            measure();

            const resizeObserver =
              typeof ResizeObserver === "undefined"
                ? null
                : new ResizeObserver(measure);

            resizeObserver?.observe(strip);
            image.addEventListener("load", measure);

            scrollTrigger = ScrollTrigger.create({
              trigger: strip,
              start: "bottom bottom",
              end: "top top",
              onRefresh: (self) => applyProgress(self.progress),
              onUpdate: (self) => applyProgress(self.progress),
            });

            applyProgress(scrollTrigger.progress);

            return () => {
              resizeObserver?.disconnect();
              image.removeEventListener("load", measure);
              scrollTrigger?.kill();
            };
          });
        }, section);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => cleanup());
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
          const isNupark = caseItem.name === "NÜPARK";
          const isHalfLeftCover = caseItem.coverFit === "halfLeft";
          const faceStyle = {
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: canColor,
            color: "#f5f0e8",
          } as const;
          const frontStyle =
            caseItem.coverImage && !isHalfLeftCover
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
                  className={
                    isHalfLeftCover
                      ? "absolute inset-0 flex flex-col overflow-hidden"
                      : "absolute inset-0 flex flex-col justify-between overflow-hidden px-10 py-14 max-[700px]:px-6 max-[700px]:py-9"
                  }
                  style={frontStyle}>
                  {isHalfLeftCover ? (
                    <div className="flex h-full w-full flex-col px-10 py-10 max-[700px]:px-6 max-[700px]:py-7">
                      <div className="font-display text-[0.85rem] tracking-[0.1em] opacity-70">
                        {caseItem.number}
                      </div>
                      <div className="relative -mx-10 my-6 flex-1 overflow-hidden max-[700px]:-mx-6 max-[700px]:my-4">
                        <img
                          alt=""
                          aria-hidden="true"
                          className="absolute top-0 left-0 h-full w-[200%] max-w-none object-contain object-left"
                          src={caseItem.coverImage}
                        />
                      </div>
                      <div>
                        <div className="max-w-[92%] font-display text-[3rem] leading-[0.95] max-[700px]:text-[2.35rem]">
                          {renderCaseName(caseItem.name)}
                        </div>
                      </div>
                    </div>
                  ) : caseItem.coverImage ? (
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
                  className={
                    isHalfLeftCover
                      ? "absolute inset-0 flex flex-col overflow-hidden"
                      : "absolute inset-0 flex flex-col justify-between overflow-hidden px-10 py-14 max-[700px]:px-6 max-[700px]:py-9"
                  }
                  style={backStyle}>
                  {isHalfLeftCover ? (
                    <div className="flex h-full w-full flex-col px-10 py-10 max-[700px]:px-6 max-[700px]:py-7">
                      <div className="flex justify-end font-display text-[0.85rem] tracking-widest opacity-70">
                        {caseItem.number}
                      </div>
                      <div className="relative -mx-10 my-6 flex-1 overflow-hidden max-[700px]:-mx-6 max-[700px]:my-4">
                        <img
                          alt=""
                          aria-hidden="true"
                          className="absolute top-0 right-15 h-full w-[200%] max-w-none object-contain object-right"
                          src={caseItem.coverImage}
                        />
                      </div>
                      <div className="flex justify-end">
                        <div className="max-w-[92%] text-right font-sans text-[clamp(1.45rem,2.15vw,2.25rem)] leading-[1.1] font-light tracking-[0.01em] uppercase">
                          {caseItem.type}
                        </div>
                      </div>
                    </div>
                  ) : isNupark ? (
                    <>
                      <div className="font-display text-[0.85rem] tracking-[0.1em] opacity-40">
                        {caseItem.number}
                      </div>
                      <div className="flex min-h-[42%] items-center">
                        <div className="max-w-[92%] font-sans text-[clamp(1.45rem,2.15vw,2.25rem)] leading-[1.1] font-light tracking-[0.01em] uppercase">
                          {caseItem.type}
                        </div>
                      </div>
                      <div>
                        <div className="nupark-plan-strip -mx-10 flex overflow-hidden max-[700px]:-mx-6">
                          <img
                            alt="Plano de identidad visual para Nüpark"
                            className="nupark-plan-image"
                            src="/clientes/plano-raiz.png"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-display text-[0.85rem] tracking-[0.1em] opacity-40">
                        {caseItem.number}
                      </div>
                      <div
                        className={`relative flex min-h-[60%] items-center overflow-visible border-t border-current/20 pt-8 ${
                          caseItem.stickerImage ? "medialaugh-copy-line" : ""
                        }`}>
                        {caseItem.stickerImage ? (
                          <div
                            aria-hidden="true"
                            className="medialaugh-ball pointer-events-none absolute select-none">
                            <div className="medialaugh-ball-shadow" />
                            <img
                              alt=""
                              className="relative h-full w-full object-contain drop-shadow-[0_10px_16px_rgba(79,89,2,0.22)]"
                              src={caseItem.stickerImage}
                            />
                          </div>
                        ) : null}
                        <div className="max-w-[92%] font-sans text-[clamp(1.45rem,2.15vw,2.25rem)] leading-[1.1] font-light tracking-[0.01em] uppercase">
                          {caseItem.type}
                        </div>
                      </div>
                      <div className="text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-45">
                        Proyecto
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
