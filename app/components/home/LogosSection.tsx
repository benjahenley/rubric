import { useEffect, useRef } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";

const logoRows = [
  [
    { name: "OSDE", file: "osde.png" },
    { name: "Stella Artois", file: "stella.png" },
    { name: "Mondelez International", file: "mondelez.png" },
  ],
  [
    { name: "Molinos", file: "molinos.png" },
    { name: "ADT", file: "adt.png" },
    { name: "McDonald's", file: "mcdonalds.png" },
    { name: "Artro", file: "artro.png" },
  ],
  [
    { name: "Bplay", file: "bplay.png" },
    { name: "SanCor", file: "sancor.png" },
    { name: "Supervielle", file: "supervielle.png" },
  ],
  [
    { name: "SportClub", file: "sportclub.png" },
    { name: "Zurich", file: "zurich.png" },
  ],
];

const agencyLogoRows = [
  [
    { name: "Picnic", file: "picnic.png" },
    { name: "TBWA", file: "tbwa.png" },
    { name: "La Comunidad", file: "la-comunidad.png" },
  ],
  [
    { name: "Quadro Comunicación", file: "quadro.png" },
    { name: "Ogilvy", file: "ogilvy.png" },
    { name: "Ponce", file: "ponce.png" },
    { name: "BBDO", file: "bbdo.png" },
  ],
  [
    { name: "FCB", file: "fcb.png" },
    { name: "Leo Burnett", file: "leo-burnett.png" },
    { name: "McCann Buenos Aires", file: "mccann.png" },
  ],
];

const mobileLogoRows = [
  [
    { name: "OSDE", file: "osde.png" },
    { name: "Stella Artois", file: "stella.png" },
    { name: "Mondelez International", file: "mondelez.png" },
    { name: "SportClub", file: "sportclub.png" },
  ],
  [
    { name: "Molinos", file: "molinos.png" },
    { name: "ADT", file: "adt.png" },
    { name: "McDonald's", file: "mcdonalds.png" },
    { name: "Artro", file: "artro.png" },
  ],
  [
    { name: "Bplay", file: "bplay.png" },
    { name: "SanCor", file: "sancor.png" },
    { name: "Supervielle", file: "supervielle.png" },
    { name: "Zurich", file: "zurich.png" },
  ],
];

export function LogosSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !sectionRef.current || prefersReducedMotion()) return;

        const section = sectionRef.current;

        ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          mm.add("(min-width: 901px)", () => {
            const logos = Array.from(
              section.querySelectorAll<HTMLElement>(".logos-collage-image"),
            );
            const maxTug = 18;
            const pullRadius = 620;
            const setters = logos.map((logo) => ({
              x: gsap.quickTo(logo, "x", {
                duration: 0.55,
                ease: "elastic.out(1, 0.55)",
                overwrite: true,
              }),
              y: gsap.quickTo(logo, "y", {
                duration: 0.55,
                ease: "elastic.out(1, 0.55)",
                overwrite: true,
              }),
              rotate: gsap.quickTo(logo, "rotation", {
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
              }),
              skewX: gsap.quickTo(logo, "skewX", {
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
              }),
            }));

            const tugLogo = (event: PointerEvent) => {
              logos.forEach((logo, index) => {
                const rect = logo.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = event.clientX - centerX;
                const deltaY = event.clientY - centerY;
                const distance = Math.hypot(deltaX, deltaY) || 1;
                const influence = Math.max(0, 1 - distance / pullRadius);
                const tug = maxTug * influence;
                const x = (deltaX / distance) * tug;
                const y = (deltaY / distance) * tug;

                setters[index].x(x);
                setters[index].y(y);
                setters[index].rotate(gsap.utils.clamp(-4, 4, x * 0.18));
                setters[index].skewX(gsap.utils.clamp(-5, 5, y * -0.16));
              });
            };

            const resetLogos = () => {
              setters.forEach((setter) => {
                setter.x(0);
                setter.y(0);
                setter.rotate(0);
                setter.skewX(0);
              });
            };

            section.addEventListener("pointermove", tugLogo);
            section.addEventListener("pointerleave", resetLogos);

            return () => {
              section.removeEventListener("pointermove", tugLogo);
              section.removeEventListener("pointerleave", resetLogos);
              resetLogos();
            };
          });

          mm.add("(max-width: 900px)", () => {
            const tracks = section.querySelectorAll<HTMLElement>(
              ".logos-mobile-track",
            );
            const offsets = Array.from(tracks, () => 0);
            const setWidths = Array.from(tracks, () => 1);
            const quickSetters = Array.from(tracks, (track) =>
              gsap.quickTo(track, "x", {
                duration: 0.45,
                ease: "power3.out",
                overwrite: true,
              }),
            );
            let previousScroll = window.scrollY;

            const measure = () => {
              tracks.forEach((track, index) => {
                setWidths[index] = Math.max(1, track.scrollWidth / 4);
                offsets[index] = -setWidths[index];
                gsap.set(track, { x: offsets[index] });
              });
            };

            measure();

            const resizeObserver =
              typeof ResizeObserver === "undefined"
                ? null
                : new ResizeObserver(measure);

            resizeObserver?.observe(section);

            const scrollTrigger = ScrollTrigger.create({
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                const currentScroll = window.scrollY;
                const delta = currentScroll - previousScroll;
                previousScroll = currentScroll;

                if (Math.abs(delta) < 0.5) return;

                tracks.forEach((_, index) => {
                  const rowDirection = index % 2 === 0 ? -1 : 1;
                  const rowMovement = delta * 0.55 * rowDirection;
                  offsets[index] = gsap.utils.wrap(
                    -setWidths[index] * 2,
                    -setWidths[index],
                    offsets[index] + rowMovement,
                  );
                  quickSetters[index](offsets[index]);
                });
              },
            });

            return () => {
              resizeObserver?.disconnect();
              scrollTrigger.kill();
            };
          });

          return () => mm.revert();
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
      ref={sectionRef}
      className="logos-section flex flex-col bg-white py-20 max-[900px]:items-center max-[900px]:py-10"
      id="logos">
      <div className="logos-desktop-groups logos-collage-desktop flex flex-col">
        <div className="logos-section-row logos-section-row-clients flex flex-row items-start justify-between">
          <div className="logos-collage-title flex h-full w-full px-20 max-[900px]:justify-center max-[900px]:px-6">
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-none">
              EN PROYECTOS
              <br />
              PARA TODO TIPO
              <br />
              DE CLIENTES<span className="text-rubric-red">.</span>
            </h2>
          </div>
          <div className="logos-collage flex flex-col items-center">
            {logoRows.map((row, rowIndex) => (
              <div
                className="logos-collage-row flex justify-center"
                key={rowIndex}>
                {row.map((logo) => (
                  <img
                    alt={logo.name}
                    className="logos-collage-image block shrink-0 object-contain"
                    height={200}
                    key={logo.file}
                    loading="lazy"
                    src={`/images/cans/logos-empresas/${logo.file}`}
                    width={500}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="logos-section-row logos-section-row-agencies flex flex-row items-center justify-between">
          <div className="logos-collage logos-collage-agencies flex flex-col items-center">
            {agencyLogoRows.map((row, rowIndex) => (
              <div
                className="logos-collage-row flex justify-center"
                key={rowIndex}>
                {row.map((logo) => (
                  <img
                    alt={logo.name}
                    className="logos-collage-image block shrink-0 object-contain"
                    height={200}
                    key={logo.file}
                    loading="lazy"
                    src={`/clientes/marcas/${logo.file}`}
                    width={500}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="logos-agencies-copy">
            <p className="font-display text-[clamp(2.7rem,5.2vw,5.8rem)] leading-none">
              LOS COLABORADORES DE RUBRIC TRABAJAN O TRABAJARON EN CARGOS
              DIRECTIVOS DE ESTAS AGENCIAS
              <span className="text-rubric-red">.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="logos-mobile-sections">
        {[
          {
            copy: (
              <h2 className="font-display text-[clamp(2.4rem,13vw,4.75rem)] leading-none">
                MARCAS
                <br />
                QUE NOS
                <br />
                ELIGEN<span className="text-rubric-red">.</span>
              </h2>
            ),
            path: "/images/cans/logos-empresas",
            rows: mobileLogoRows,
          },
          {
            copy: (
              <p className="font-display text-[clamp(2.1rem,10vw,3.5rem)] leading-none">
                LOS COLABORADORES DE RUBRIC TRABAJAN O TRABAJARON EN CARGOS
                DIRECTIVOS DE ESTAS AGENCIAS
                <span className="text-rubric-red">.</span>
              </p>
            ),
            path: "/clientes/marcas",
            rows: agencyLogoRows,
          },
        ].map((group, groupIndex) => (
          <div className="logos-mobile-section" key={group.path}>
            <div className="logos-mobile-copy px-6">{group.copy}</div>
            <div className="logos-mobile-marquee">
              {group.rows.map((row, rowIndex) => (
                <div
                  className="logos-mobile-row"
                  key={`${group.path}-${rowIndex}`}>
                  <div className="logos-mobile-track">
                    {Array.from({ length: 4 }).flatMap((_, copyIndex) =>
                      row.map((logo) => (
                        <img
                          alt={logo.name}
                          className="logos-mobile-image"
                          height={200}
                          key={`${groupIndex}-${logo.file}-${copyIndex}`}
                          loading="lazy"
                          src={`${group.path}/${logo.file}`}
                          width={500}
                        />
                      )),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
