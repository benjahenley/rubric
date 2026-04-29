import { useEffect, useRef } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { projects } from "./data";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap }) => {
        if (cancelled || !sectionRef.current || prefersReducedMotion()) return;

        const section = sectionRef.current;

        ctx = gsap.context(() => {
          const titleBlock = section.querySelector<HTMLElement>(
            ".proyectos-title-block",
          );
          const arrow = section.querySelector<HTMLElement>(".proyectos-arrow");
          const projectsContainer = section.querySelector<HTMLElement>(
            ".projects-container",
          );
          const projectsCards =
            section.querySelector<HTMLElement>(".projects-cards");

          if (titleBlock) {
            gsap.from(titleBlock, {
              y: 60,
              autoAlpha: 0,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: { trigger: titleBlock, start: "top 78%" },
            });
          }

          if (titleBlock && arrow) {
            gsap.to(arrow, {
              rotate: 90,
              ease: "none",
              scrollTrigger: {
                trigger: titleBlock,
                start: "bottom bottom",
                end: "bottom 60%",
                scrub: 2,
              },
            });
          }

          if (!projectsContainer || !projectsCards) return;

          const mm = gsap.matchMedia();
          cleanups.push(() => mm.revert());

          mm.add("(min-width: 768px)", () => {
            const cards = Array.from(
              section.querySelectorAll<HTMLElement>(".project-card"),
            );
            if (cards.length < 2) return;

            gsap.set(cards.slice(1), { opacity: 0, yPercent: 100 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: projectsContainer,
                pin: projectsCards,
                pinType: "fixed",
                pinSpacing: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 5,
              },
            });

            tl.to({}, { duration: 10 });
            for (let i = 1; i < cards.length; i++) {
              tl.to(cards[i - 1], {
                scale: 0.7,
                opacity: 0,
                duration: 20,
                ease: "power2.inOut",
              })
                .to(
                  cards[i],
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 20,
                    ease: "power2.inOut",
                  },
                  "<",
                )
                .to({}, { duration: 10 });
            }
            tl.to(cards[cards.length - 1], {
              scale: 0.7,
              opacity: 0,
              duration: 20,
              ease: "power2.inOut",
            });
          });

          mm.add("(max-width: 767px)", () => {
            gsap.set(section.querySelectorAll(".project-card"), {
              clearProps: "all",
            });
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
      id="proyectos"
      ref={sectionRef}
      className="bg-rubric-cream text-rubric-black">
      <div className="proyectos-title-block flex items-end justify-between gap-8 px-16 pt-32 pb-16 max-[900px]:px-8 max-[900px]:pt-20 max-[900px]:pb-10">
        <div>
          <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] text-rubric-red uppercase">
            Proyectos
          </p>
          <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-none">
            ALGUNOS CASOS
            <br />Y TRABAJOS<span className="text-rubric-red">.</span>
          </h2>
        </div>
        <svg
          className="proyectos-arrow shrink-0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="4"
          style={{ width: "clamp(60px, 8vw, 140px)" }}
          viewBox="0 0 100 100">
          <line x1="12" x2="78" y1="50" y2="50" />
          <polyline points="60,28 84,50 60,72" />
        </svg>
      </div>

      <div className="projects-container relative md:h-[600vh]">
        <div className="projects-cards relative flex flex-col gap-24 px-8 pb-24 md:h-screen md:items-center md:justify-center md:gap-0 md:px-16 md:pb-0">
          {projects.map((p, i) => (
            <article
              className="project-card w-full md:absolute md:inset-0 md:flex md:items-center md:justify-center md:px-16"
              key={i}>
              <div className="grid w-full grid-cols-2 gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-6 md:max-w-[1490px]">
                <div className="relative aspect-square w-full overflow-hidden bg-rubric-black/[0.06] ring-1 ring-rubric-black/10">
                  {p.image ? (
                    <img
                      alt={`${p.client} — ${p.category}`}
                      className="h-full w-full object-cover"
                      src={p.image}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center font-display text-[1rem] tracking-[0.25em] text-rubric-black/30 uppercase"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, transparent 0 12px, rgba(10,10,10,0.04) 12px 13px)",
                      }}>
                      Imagen
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="mb-2 font-display text-[0.85rem] tracking-[0.2em] opacity-40">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </p>
                  <p className="mb-4 text-[0.72rem] font-medium tracking-[0.22em] text-rubric-red uppercase">
                    {p.category}
                  </p>
                  <h3 className="mb-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">
                    {p.client}
                    <span className="text-rubric-red">.</span>
                  </h3>
                  <p className="mb-8 max-w-[520px] text-[1.05rem] leading-[1.8] font-light text-[rgba(10,10,10,0.7)]">
                    {p.copy}
                  </p>
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] font-light text-rubric-red">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
