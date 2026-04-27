import { useEffect, useRef, useState, type FormEvent } from "react";

import type { Route } from "./+types/home";

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  padStart?: number;
};

const stats: Stat[] = [
  { value: 15, label: "Años de experiencia combinada", prefix: "+" },
  { value: 30, label: "Marcas acompañadas", prefix: "+" },
  { value: 100, label: "Talento senior para cada proyecto", suffix: "%" },
  {
    value: 1,
    label: "Propósito: ayudar a las marcas a encontrar su marca",
    padStart: 2,
  },
];

function formatStatValue(
  value: number,
  {
    prefix = "",
    suffix = "",
    padStart = 0,
  }: Pick<Stat, "prefix" | "suffix" | "padStart">,
) {
  return `${prefix}${Math.round(value).toString().padStart(padStart, "0")}${suffix}`;
}

const services = [
  [
    "01",
    "Publicidad",
    "Campañas con ideas que traccionan. Creatividad al servicio de objetivos reales.",
  ],
  [
    "02",
    "Branding",
    "Identidades que comunican desde adentro. Marcas con propósito, con voz y con carácter.",
  ],
  [
    "03",
    "Estrategia",
    "Pensamiento antes de ejecución. Diagnóstico, posicionamiento y hoja de ruta.",
  ],
  [
    "04",
    "Diseño",
    "Piezas que no se olvidan. De brand books a assets digitales y todo lo que está en el medio.",
  ],
  [
    "05",
    "Activaciones",
    "Experiencias que conectan marcas con personas. Del concepto a la producción.",
  ],
  [
    "06",
    "Contenido",
    "Redes, email marketing, copywriting y narrativa de marca. Todo lo que tu marca dice, bien dicho.",
  ],
];

const cases = [
  {
    number: "001",
    name: "WILOBANK",
    type: "Banco digital — Contenido & Redes",
    initials: "WB",
    variant: "dark",
  },
  {
    number: "002",
    name: "BPLAY",
    type: "Apuestas online — Branding & Lanzamiento",
    initials: "BP",
    variant: "accent",
  },
  {
    number: "003",
    name: "ARTRO",
    type: "Salud — Arquitectura de marca & Brand Book",
    initials: "AR",
    variant: "light",
  },
  {
    number: "004",
    name: "NÜPARK",
    type: "Inmobiliario — Branding & Estrategia",
    initials: "NP",
    variant: "light",
  },
  {
    number: "005",
    name: "CACIQUE",
    type: "Retail — Relanzamiento de marca",
    initials: "CA",
    variant: "dark",
  },
  {
    number: "006",
    name: "LAUGH",
    type: "Agencia de medios — Identidad visual & narrativa",
    initials: "LA",
    variant: "accent",
  },
];

const projects = [
  {
    client: "Halloween",
    category: "Wilobank",
    copy: "Bajá la App de #Wilobank y hacé que todas tus operaciones sean un disfrute y no una pesadilla.",
    tags: ["#HalloweenArgentina", "#TrucoOTrato", "#FelizHalloween"],
    image: "/proyectos/proyecto_1.png",
  },
  {
    client: "Experiencias Reales",
    category: "Wilobank",
    copy: "Las mejores decisiones arrancan con un buen desayuno. ¿Acaso regalarte un momento así no te cambia el sabor del día?",
    tags: ["#Wilobank"],
    image: "/proyectos/proyecto_2.png",
  },
  {
    client: "Institucional",
    category: "Wilobank",
    copy: "¡Tu mejor sucursal! Somos el 1er banco 100% digital de la Argentina. Disfrutá de operar 24/7 y todo al alcance de tu mano.",
    tags: [],
    image: "/proyectos/proyecto_3.png",
  },
  {
    client: "Navidad",
    category: "Wilobank",
    copy: "No creemos que en el trineo de Papá Noel esté el regalo que siempre quisiste. Con #Wilobank, no des más vueltas y regalate eso que las Navidades te viene esquivando.",
    tags: ["#FelizNavidad", "#Navidad2022"],
    image: "/proyectos/proyecto_4.png",
  },
  {
    client: "Ser De Wilo",
    category: "Wilobank",
    copy: "#SerDeWilo te ahorra todos los problemas de ir a un banco, porque literalmente no vas. Sumate al club.",
    tags: ["#SerDeWilo"],
    image: "/proyectos/proyecto_5.png",
  },
  {
    client: "Verano",
    category: "Wilobank",
    copy: "Así como #wilobank y tus operaciones van de la mano, estas vacaciones hay cosas que también #BankConTodo. ¿Cuál sumarías?",
    tags: ["#VeranitoWilero"],
    image: "/proyectos/proyecto_6.png",
  },
];

const partnerLogos = [
  "bbdo logo.png",
  "kisspng-mondelez-international-kraft-foods-cadbury-snack-c-5b11401897fd64.0648095415278571766226.jpg",
  "logo sancor .png",
  "logo_FB.png",
  "png-clipart-logo-india-stella-artois-brand-font-india-label-text.png",
  "png-clipart-logo-nikon-camera-nikon-logo-text-logo.png",
  "png-transparent-beer-logo-stella-artois-lager-brahma-beer-stella-artois-lager-duvel-corporate-identity.png",
];

const contactItems = [
  {
    label: "Email",
    value: "hola@rubric.com.ar",
    href: "mailto:hola@rubric.com.ar",
  },
  {
    label: "WhatsApp",
    value: "+54 9 11 0000-0000",
    href: "https://wa.me/5491100000000",
  },
  {
    label: "Instagram",
    value: "@rubric.ar",
    href: "https://instagram.com/rubric.ar",
  },
  {
    label: "LinkedIn",
    value: "Rubric Argentina",
    href: "https://linkedin.com/company/rubric-ar",
  },
  {
    label: "Sede",
    value: "Buenos Aires, Argentina",
  },
];

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

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
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

        const tl = gsap.timeline();

        tl.from(".intro-logo", {
          opacity: 0,
          scale: 0.92,
          duration: 0.8,
          ease: "power3.out",
        })
          .to(
            ".intro-logo",
            { scale: 7, duration: 1.0, ease: "power2.in" },
            "+=0.35",
          )
          .to(
            ".intro-overlay",
            { backgroundColor: "#0a0a0a", duration: 0.5 },
            "<0.45",
          )
          .to(".intro-logo", { opacity: 0, duration: 0.45 }, "<")
          .to(".intro-overlay", { autoAlpha: 0, duration: 0.4 })
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
            { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
            "-=0.3",
          )
          .to(
            ".hero-tagline",
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
            "-=0.7",
          )
          .to(
            ".hero-cta",
            { autoAlpha: 1, xPercent: 0, duration: 0.9, ease: "power3.out" },
            "-=0.7",
          );
      }

      const stIn = (trigger: string) => ({ trigger, start: "top 78%" });
      const statNumbers = gsap.utils.toArray<HTMLElement>("[data-stat-number]");

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

      const logosTrack = document.querySelector<HTMLElement>(".logos-track");
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

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      const ctaXTo = gsap.quickTo(cta, "x", { duration: 0.55, ease: "power3" });
      const ctaYTo = gsap.quickTo(cta, "y", { duration: 0.55, ease: "power3" });

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
      },
    ).catch((error: unknown) => {
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
      <div
        className="intro-overlay fixed inset-0 z-[200] flex items-center justify-center bg-rubric-white"
        style={{
          backgroundImage: NOISE_BG,
          backgroundBlendMode: "multiply",
        }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.12) 100%)",
          }}
        />
        <img
          alt="Rubric"
          className="intro-logo h-[clamp(4rem,12vw,12rem)] w-auto"
          src="/logo-rubric.png"
          style={{ filter: "invert(1)" }}
        />
      </div>

      <nav className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-16 py-6 mix-blend-difference max-[900px]:px-8">
        <a
          className="nav-item inline-flex items-center no-underline"
          href="#inicio">
          <img
            alt="Rubric"
            className="h-9 w-auto max-[640px]:h-7"
            src="/logo-rubric.png"
          />
        </a>
        <ul className="flex list-none gap-10 max-[640px]:hidden">
          {[
            ["Nosotros", "#nosotros"],
            ["Servicios", "#servicios"],
            ["Clientes", "#clientes"],
            ["Proyectos", "#proyectos"],
            ["Contacto", "#contacto"],
          ].map(([label, href]) => (
            <li key={href}>
              <a
                className="nav-item text-[0.8rem] tracking-[0.15em] text-rubric-white uppercase no-underline opacity-70 transition-opacity duration-200 hover:opacity-100"
                href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="inicio"
        className="relative flex min-h-screen cursor-none flex-col justify-end overflow-hidden px-16 pt-32 pb-20 max-[900px]:px-8 max-[900px]:pt-28 max-[900px]:pb-16">
        <div
          className="hero-cursor pointer-events-none fixed top-0 left-0 z-[150] h-12 w-12 rounded-full bg-rubric-white max-[900px]:hidden"
          style={{ mixBlendMode: "difference" }}
        />
        <div className="absolute top-0 left-16 h-screen w-px bg-[rgba(245,240,232,0.08)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(14rem,28vw,30rem)] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgba(245,240,232,0.06)]">
          RUBRIC
        </div>
        <p className="hero-tag mb-6 text-[0.75rem] font-medium tracking-[0.2em] text-rubric-red uppercase">
          Agencia de publicidad colaborativa — Buenos Aires, Argentina
        </p>
        <h1 className="mb-10 overflow-hidden">
          <img
            alt="Rubric"
            className="hero-logo h-[clamp(4rem,12vw,12rem)] w-auto"
            src="/logo-rubric.png"
          />
        </h1>
        <div className="flex items-end justify-between gap-8 overflow-hidden max-[900px]:flex-col max-[900px]:items-start">
          <p className="hero-tagline max-w-[600px] text-[clamp(1rem,1.8vw,1.4rem)] leading-[1.6] font-light text-[rgba(245,240,232,0.7)] italic">
            Todo lo que hace tu marca comunica.
            <br />Y si comunica, nos gusta hacerlo.
          </p>
          <a
            className="hero-cta inline-flex shrink-0 items-center gap-3 bg-rubric-red px-8 py-4 text-[0.85rem] font-medium tracking-[0.12em] whitespace-nowrap text-rubric-white uppercase no-underline transition-colors duration-200 hover:bg-rubric-red-dark"
            href="#contacto">
            Hablemos →
          </a>
        </div>
      </section>

      <section
        id="nosotros"
        className="grid grid-cols-2 items-center gap-24 bg-rubric-cream px-16 py-32 text-rubric-black max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[900px]:px-8 max-[900px]:py-20">
        <div>
          <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-50">
            Quiénes somos
          </p>
          <h2 className="mb-8 font-display text-[clamp(3rem,6vw,6rem)] leading-none tracking-[0.01em]">
            Talento
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
          <p className="mb-8 text-[1.1rem] leading-[1.8] font-light text-[rgba(10,10,10,0.75)]">
            No creemos en estructuras rígidas. Creemos en equipos que se arman a
            medida del desafío — creativos, estrategas y diseñadores que ya
            demostraron lo suyo.
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

      <section
        id="servicios"
        className="bg-rubric-black px-16 py-32 max-[900px]:px-8 max-[900px]:py-20">
        <div className="mb-20 flex items-end justify-between gap-8 max-[900px]:flex-col max-[900px]:items-start">
          <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-none">
            Lo que
            <br />
            hacemos.
          </h2>
          <p className="max-w-[380px] text-right text-[0.95rem] leading-[1.7] font-light text-[rgba(245,240,232,0.5)] max-[900px]:text-left">
            Desde la estrategia hasta la ejecución. Trabajamos en cada dimensión
            de tu marca con el talento justo para cada etapa.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-0 border-t border-[rgba(245,240,232,0.1)] max-[900px]:grid-cols-1">
          {services.map(([number, name, description], index) => (
            <div
              className={`group relative cursor-default overflow-hidden border-b border-[rgba(245,240,232,0.1)] px-10 py-12 transition-[background] duration-300 ${
                (index + 1) % 3 === 0
                  ? ""
                  : "border-r border-r-[rgba(245,240,232,0.1)]"
              } hover:bg-[rgba(200,52,26,0.07)]`}
              data-reveal
              key={number}>
              <div className="mb-6 font-display text-[0.9rem] tracking-[0.1em] text-rubric-red">
                {number}
              </div>
              <div className="mb-4 font-display text-[2.5rem] leading-none">
                {name}
              </div>
              <p className="text-[0.85rem] leading-[1.7] font-light text-[rgba(245,240,232,0.45)]">
                {description}
              </p>
              <span className="absolute right-8 bottom-8 text-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-30">
                ↗
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="clientes"
        className="bg-rubric-white px-16 py-32 text-rubric-black max-[900px]:px-8 max-[900px]:py-20">
        <div className="mb-16">
          <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-50">
            Casos & Clientes
          </p>
          <h2 className="mb-4 font-display text-[clamp(3rem,7vw,7rem)] leading-none">
            Marcas que
            <br />
            encontraron su voz.
          </h2>
          <p className="max-w-[500px] text-[0.95rem] leading-[1.7] font-light text-[rgba(10,10,10,0.5)]">
            Trabajamos con marcas que necesitaban algo más que una agencia.
            Necesitaban un socio creativo de verdad.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-[2px] max-[900px]:grid-cols-2">
          {cases.map((caseItem) => (
            <div
              className={`relative z-0 flex min-h-[280px] flex-col justify-between overflow-hidden px-10 py-14 transition-transform duration-300 ease-[ease] hover:z-[1] hover:scale-[1.01] ${
                caseItem.variant === "accent"
                  ? "bg-rubric-red text-rubric-white"
                  : caseItem.variant === "light"
                    ? "bg-rubric-cream text-rubric-black"
                    : "bg-rubric-black text-rubric-white"
              }`}
              data-reveal
              key={caseItem.number}>
              <div className="mb-auto font-display text-[0.85rem] tracking-[0.1em] opacity-40">
                {caseItem.number}
              </div>
              <div>
                <div className="mb-2 font-display text-[3.5rem] leading-none">
                  {caseItem.name}
                </div>
                <div
                  className={`text-[0.78rem] font-normal tracking-[0.15em] uppercase ${
                    caseItem.variant === "accent" ? "opacity-80" : "opacity-50"
                  }`}>
                  {caseItem.type}
                </div>
              </div>
              <div className="pointer-events-none absolute right-[-1rem] bottom-[-1rem] select-none font-display text-[8rem] leading-none opacity-[0.04]">
                {caseItem.initials}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="logos-section overflow-hidden border-y border-rubric-black/10 bg-white py-12 max-[900px]:py-8">
        <div className="logos-track flex w-max items-center gap-20 will-change-transform max-[900px]:gap-12">
          {[...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div
              className="flex h-10 shrink-0 items-center justify-center max-[900px]:h-7"
              key={i}>
              <img
                alt=""
                className="h-full w-auto object-contain opacity-80"
                loading="lazy"
                src={`/companyLogos/${encodeURIComponent(logo)}`}
                style={{
                  filter: "grayscale(1) contrast(1.1)",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="proyectos" className="bg-rubric-cream text-rubric-black">
        <div className="proyectos-title-block flex items-end justify-between gap-8 px-16 pt-32 pb-16 max-[900px]:px-8 max-[900px]:pt-20 max-[900px]:pb-10">
          <div>
            <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] text-rubric-red uppercase">
              Proyectos
            </p>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-none">
              Trabajos que
              <br />
              hablan por sí solos<span className="text-rubric-red">.</span>
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

      <section
        id="contacto"
        className="flex min-h-screen flex-col justify-between bg-rubric-black px-16 py-32 max-[900px]:px-8 max-[900px]:py-20">
        <div className="mb-24">
          <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-50">
            Contacto
          </p>
          <h2 className="mb-8 font-display text-[clamp(4rem,12vw,13rem)] leading-[0.9]">
            Encontremos
            <br />
            tu <span className="text-rubric-red">marca.</span>
          </h2>
          <p className="max-w-[500px] text-[1.1rem] leading-[1.7] font-light text-[rgba(245,240,232,0.5)] italic">
            Contanos en qué estás, y armamos el equipo ideal para acompañarte.
          </p>
        </div>
        <div className="grid grid-cols-2 items-end gap-16 max-[900px]:grid-cols-1">
          <div className="flex flex-col gap-10">
            {contactItems.map((item) => (
              <div data-reveal key={item.label}>
                <div className="mb-2 text-[0.7rem] font-medium tracking-[0.2em] text-rubric-red uppercase">
                  {item.label}
                </div>
                <div className="text-[1.1rem] font-light text-[rgba(245,240,232,0.8)]">
                  {item.href ? (
                    <a
                      className="text-inherit no-underline transition-colors duration-200 hover:text-rubric-white"
                      href={item.href}
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
            ref={formRef}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[0.72rem] font-medium tracking-[0.15em] text-[rgba(245,240,232,0.4)] uppercase">
                  Nombre
                </label>
                <input
                  className="resize-none rounded-none border border-[rgba(245,240,232,0.12)] bg-[rgba(245,240,232,0.05)] px-4 py-[0.9rem] font-sans text-[0.95rem] font-light text-rubric-white outline-none transition-[border-color,background] duration-200 focus:border-rubric-red focus:bg-[rgba(200,52,26,0.05)]"
                  placeholder="Tu nombre"
                  required
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.72rem] font-medium tracking-[0.15em] text-[rgba(245,240,232,0.4)] uppercase">
                  Empresa
                </label>
                <input
                  className="resize-none rounded-none border border-[rgba(245,240,232,0.12)] bg-[rgba(245,240,232,0.05)] px-4 py-[0.9rem] font-sans text-[0.95rem] font-light text-rubric-white outline-none transition-[border-color,background] duration-200 focus:border-rubric-red focus:bg-[rgba(200,52,26,0.05)]"
                  placeholder="Tu empresa"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.72rem] font-medium tracking-[0.15em] text-[rgba(245,240,232,0.4)] uppercase">
                Email
              </label>
              <input
                className="resize-none rounded-none border border-[rgba(245,240,232,0.12)] bg-[rgba(245,240,232,0.05)] px-4 py-[0.9rem] font-sans text-[0.95rem] font-light text-rubric-white outline-none transition-[border-color,background] duration-200 focus:border-rubric-red focus:bg-[rgba(200,52,26,0.05)]"
                placeholder="tu@email.com"
                required
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.72rem] font-medium tracking-[0.15em] text-[rgba(245,240,232,0.4)] uppercase">
                ¿En qué podemos ayudarte?
              </label>
              <select className="resize-none rounded-none border border-[rgba(245,240,232,0.12)] bg-[rgba(245,240,232,0.05)] px-4 py-[0.9rem] font-sans text-[0.95rem] font-light text-rubric-white outline-none transition-[border-color,background] duration-200 focus:border-rubric-red focus:bg-[rgba(200,52,26,0.05)]">
                <option className="bg-rubric-black" value="">
                  Seleccioná un servicio
                </option>
                <option className="bg-rubric-black">Publicidad</option>
                <option className="bg-rubric-black">Branding</option>
                <option className="bg-rubric-black">Estrategia</option>
                <option className="bg-rubric-black">Diseño</option>
                <option className="bg-rubric-black">Activaciones</option>
                <option className="bg-rubric-black">Contenido</option>
                <option className="bg-rubric-black">
                  No sé bien, quiero hablar
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.72rem] font-medium tracking-[0.15em] text-[rgba(245,240,232,0.4)] uppercase">
                Mensaje
              </label>
              <textarea
                className="resize-none rounded-none border border-[rgba(245,240,232,0.12)] bg-[rgba(245,240,232,0.05)] px-4 py-[0.9rem] font-sans text-[0.95rem] font-light text-rubric-white outline-none transition-[border-color,background] duration-200 focus:border-rubric-red focus:bg-[rgba(200,52,26,0.05)]"
                placeholder="Contanos tu proyecto..."
                rows={4}
              />
            </div>
            <button
              className={`self-start rounded-none border-0 px-10 py-[1.1rem] font-sans text-[0.85rem] font-medium tracking-[0.15em] text-rubric-white uppercase transition-colors duration-200 ${
                submitted
                  ? "bg-[#2c5f2d]"
                  : "bg-rubric-red hover:bg-rubric-red-dark"
              }`}
              type="submit">
              {submitted ? "Mensaje enviado ✓" : "Enviar mensaje →"}
            </button>
          </form>
        </div>
      </section>

      <footer className="flex items-center justify-between border-t border-[rgba(245,240,232,0.08)] bg-rubric-black px-16 py-8 max-[900px]:flex-col max-[900px]:gap-6 max-[900px]:px-8 max-[900px]:text-center">
        <span className="text-[0.78rem] tracking-[0.05em] text-[rgba(245,240,232,0.3)]">
          © 2025 Rubric — Agencia de publicidad colaborativa
        </span>
        <div className="flex gap-6">
          <a
            className="text-[0.78rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)] uppercase no-underline transition-colors duration-200 hover:text-rubric-red"
            href="https://instagram.com/rubric.ar"
            rel="noreferrer"
            target="_blank">
            Instagram
          </a>
          <a
            className="text-[0.78rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)] uppercase no-underline transition-colors duration-200 hover:text-rubric-red"
            href="https://linkedin.com/company/rubric-ar"
            rel="noreferrer"
            target="_blank">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
