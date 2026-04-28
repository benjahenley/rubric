import { useEffect, useRef, useState, type FormEvent } from "react";

import { AboutSection } from "~/components/home/AboutSection";
import { ClientsSection } from "~/components/home/ClientsSection";
import { ContactSection } from "~/components/home/ContactSection";
import { Footer } from "~/components/home/Footer";
import { HeroSection } from "~/components/home/HeroSection";
import { IntroOverlay } from "~/components/home/IntroOverlay";
import { LogosSection } from "~/components/home/LogosSection";
import { NavBar } from "~/components/home/NavBar";
import { ProjectsSection } from "~/components/home/ProjectsSection";
import { ServicesSection } from "~/components/home/ServicesSection";
import { formatStatValue } from "~/components/home/data";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RUBRIC — Agencia de Publicidad Colaborativa" },
    {
      name: "description",
      content: "Agencia de publicidad colaborativa en Buenos Aires, Argentina.",
    },
  ];
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  // GSAP Animations.
  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;

          if (reduced) {
            gsap.set(".intro-overlay", { autoAlpha: 0, display: "none" });
          } else {
            gsap.set(".nav-item", { autoAlpha: 0, y: -20 });
            gsap.set(".hero-tag", { autoAlpha: 0, y: 20 });
            gsap.set(".hero-logo", { yPercent: 110, opacity: 0 });
            gsap.set(".hero-tagline", { autoAlpha: 0, y: 20 });
            gsap.set(".hero-cta", { autoAlpha: 0, xPercent: 120 });
            gsap.set(".intro-logo-wrap", { clipPath: "inset(0 100% 0 0)" });
            gsap.set(".intro-logo", { autoAlpha: 0, scale: 0.94, y: 24 });

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.to(".intro-logo-wrap", {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.8,
            })
              .to(
                ".intro-logo",
                { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 },
                "<0.08",
              )
              .to(
                ".intro-logo",
                { scale: 1.035, duration: 0.55, ease: "power2.inOut" },
                "+=0.2",
              )
              .to(".intro-logo", {
                autoAlpha: 0,
                scale: 1.16,
                duration: 0.5,
                ease: "power3.in",
              })
              .to(
                ".intro-overlay",
                { autoAlpha: 0, duration: 0.45, ease: "power2.out" },
                "-=0.15",
              )
              .to(
                ".nav-item",
                {
                  autoAlpha: 1,
                  y: 0,
                  stagger: 0.08,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.4",
              )
              .to(
                ".hero-tag",
                { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
                "-=0.45",
              )
              .to(
                ".hero-logo",
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 1.1,
                  ease: "power3.out",
                },
                "-=0.3",
              )
              .to(
                ".hero-tagline",
                { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
                "-=0.7",
              )
              .to(
                ".hero-cta",
                {
                  autoAlpha: 1,
                  xPercent: 0,
                  duration: 0.9,
                  ease: "power3.out",
                },
                "-=0.7",
              );
          }

          const stIn = (trigger: string) => ({ trigger, start: "top 78%" });
          const statNumbers =
            gsap.utils.toArray<HTMLElement>("[data-stat-number]");

          if (reduced) {
            statNumbers.forEach((statNumber) => {
              statNumber.textContent =
                statNumber.dataset.statFinal ?? statNumber.textContent;
            });
          } else {
            statNumbers.forEach((statNumber) => {
              statNumber.textContent = formatStatValue(0, {
                prefix: statNumber.dataset.statPrefix,
                suffix: statNumber.dataset.statSuffix,
                padStart: Number(statNumber.dataset.statPadStart ?? 0),
              });
            });

            const statsCounterTrigger = ScrollTrigger.create({
              trigger: "#nosotros",
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
          }

          gsap.from("#nosotros > div:first-of-type > *", {
            y: 50,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: stIn("#nosotros"),
          });
          gsap.from("#nosotros [data-reveal]", {
            x: 80,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: stIn("#nosotros [data-reveal]"),
          });
          gsap.from("#servicios > div:first-of-type > *", {
            y: 50,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: stIn("#servicios"),
          });
          gsap.from("#servicios [data-reveal]", {
            y: 70,
            autoAlpha: 0,
            scale: 0.96,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: stIn("#servicios [data-reveal]"),
          });
          gsap.from("#clientes > div:first-of-type > *", {
            y: 50,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: stIn("#clientes"),
          });
          gsap.from("#clientes [data-reveal]", {
            clipPath: "inset(100% 0 0 0)",
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: stIn("#clientes [data-reveal]"),
          });
          gsap.from(".proyectos-title-block", {
            y: 60,
            autoAlpha: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: stIn(".proyectos-title-block"),
          });
          gsap.to(".proyectos-arrow", {
            rotate: 90,
            ease: "none",
            scrollTrigger: {
              trigger: ".proyectos-title-block",
              start: "bottom bottom",
              end: "bottom 60%",
              scrub: 2,
            },
          });

          const logosTrack =
            document.querySelector<HTMLElement>(".logos-track");
          if (logosTrack) {
            const loop = gsap.to(logosTrack, {
              xPercent: -50,
              duration: 40,
              ease: "none",
              repeat: -1,
            });
            let decay: ReturnType<typeof setTimeout> | null = null;
            const st = ScrollTrigger.create({
              trigger: ".logos-section",
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
          }

          const mm = gsap.matchMedia();
          mm.add("(min-width: 768px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(".project-card");
            if (cards.length < 2) return;

            gsap.set(cards.slice(1), { opacity: 0, yPercent: 100 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ".projects-container",
                pin: ".projects-cards",
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
            gsap.set(".project-card", { clearProps: "all" });
          });
          cleanups.push(() => mm.revert());

          gsap.from("#contacto > div:first-of-type > *", {
            y: 60,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: stIn("#contacto"),
          });
          gsap.from("#contacto [data-reveal]", {
            x: -30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: stIn("#contacto [data-reveal]"),
          });
          gsap.from("#contacto form > *", {
            x: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: stIn("#contacto form"),
          });
          gsap.from("footer > *", {
            y: 20,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: "footer", start: "top 95%" },
          });

          const hero = document.getElementById("inicio");
          const cursor = document.querySelector<HTMLElement>(".hero-cursor");
          const cta = document.querySelector<HTMLElement>(".hero-cta");
          if (!hero || !cursor || !cta || reduced) return;

          gsap.set(cursor, { autoAlpha: 0, xPercent: -50, yPercent: -50 });

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
        }, containerRef);
      })
      .catch((error: unknown) => {
        if (import.meta.env.DEV) {
          console.error("Failed to load GSAP", error);
        }
      });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
      formRef.current?.reset();
    }, 3000);
  }

  return (
    <div ref={containerRef}>
      <IntroOverlay />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <LogosSection />
      <ProjectsSection />
      <ContactSection
        formRef={formRef}
        onSubmit={handleSubmit}
        submitted={submitted}
      />
      <Footer />
    </div>
  );
}
