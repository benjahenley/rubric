import { useEffect, useRef, useState, type FormEvent } from "react";

import { AboutSection } from "~/components/home/AboutSection";
import { ClientsSection } from "~/components/home/ClientsSection";
import { ContactSection } from "~/components/home/ContactSection";
import { Footer } from "~/components/home/Footer";
import { HeroSection } from "~/components/home/HeroSection";
import { LogosSection } from "~/components/home/LogosSection";
import { NavBar } from "~/components/home/NavBar";
import { ProjectsSection } from "~/components/home/ProjectsSection";
import { ServicesSection } from "~/components/home/ServicesSection";
import {
  loadGsap,
  prefersReducedMotion,
  reportGsapLoadError,
} from "~/components/home/animations";

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

  // Cross-component intro choreography.
  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void loadGsap()
      .then((gsap) => {
        if (cancelled) return;

        ctx = gsap.context(() => {
          const reduced = prefersReducedMotion();

          if (reduced) {
            gsap.set(".nav-logo-link", { autoAlpha: 1 });
            gsap.set(".hero-glass-word", { autoAlpha: 1 });
          } else {
            let logoToNav = { x: 0, y: 0, scale: 1 };

            const captureLogoToNav = () => {
              const heroLogo =
                document.querySelector<HTMLElement>(".hero-logo-lockup");
              const navLogo =
                document.querySelector<HTMLElement>(".nav-logo");

              if (!heroLogo || !navLogo) return;

              const heroRect = heroLogo.getBoundingClientRect();
              const navRect = navLogo.getBoundingClientRect();

              if (!heroRect.width || !navRect.width) return;

              logoToNav = {
                x:
                  navRect.left +
                  navRect.width / 2 -
                  (heroRect.left + heroRect.width / 2),
                y:
                  navRect.top +
                  navRect.height / 2 -
                  (heroRect.top + heroRect.height / 2),
                scale: navRect.width / heroRect.width,
              };
            };

            gsap.set(".nav-logo-link", { autoAlpha: 0 });
            gsap.set(".nav-link", { autoAlpha: 0, y: -20 });
            gsap.set(".hero-logo-lockup", {
              transformOrigin: "center center",
            });
            gsap.set(".hero-tag", { autoAlpha: 0, y: -18 });
            gsap.set(".hero-logo", { yPercent: 110, opacity: 0 });
            gsap.set(".hero-tagline", { autoAlpha: 0, y: 20 });
            gsap.set(".hero-cta", { autoAlpha: 0, xPercent: 120 });
            gsap.set(".hero-glass-word", {
              autoAlpha: 0,
              scale: 0.94,
              "--hero-word-blur": "18px",
            });

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.to(".hero-tag", {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            })
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
              )
              .add(captureLogoToNav, "+=0.1")
              .to(".hero-logo-lockup", {
                x: () => logoToNav.x,
                y: () => logoToNav.y,
                scale: () => logoToNav.scale,
                duration: 0.9,
                ease: "power3.inOut",
              })
              .set(".nav-logo-link", { autoAlpha: 1 })
              .set(".hero-logo-lockup", { autoAlpha: 0 })
              .to(
                ".nav-link",
                {
                  autoAlpha: 0.7,
                  y: 0,
                  stagger: 0.08,
                  duration: 0.5,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.set(".nav-link", {
                      clearProps: "opacity,visibility,transform",
                    });
                  },
                },
                "-=0.1",
              )
              .to(".hero-glass-word", {
                autoAlpha: 1,
                scale: 1,
                "--hero-word-blur": "0px",
                duration: 1.15,
                ease: "power3.out",
              });
          }
        }, containerRef);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
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
