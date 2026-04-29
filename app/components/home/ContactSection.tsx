import {
  useEffect,
  useRef,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";
import { contactItems } from "./data";

type ContactSectionProps = {
  formRef: RefObject<HTMLFormElement | null>;
  submitted: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const inputClass =
  "resize-none rounded-none border border-[rgba(245,240,232,0.12)] bg-[rgba(245,240,232,0.05)] px-4 py-[0.9rem] font-sans text-[0.95rem] font-light text-rubric-white outline-none transition-[border-color,background] duration-200 focus:border-rubric-red focus:bg-[rgba(200,52,26,0.05)]";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-[0.72rem] font-medium tracking-[0.15em] text-[rgba(245,240,232,0.4)] uppercase">
      {children}
    </label>
  );
}

export function ContactSection({
  formRef,
  submitted,
  onSubmit,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap }) => {
        if (cancelled || !sectionRef.current || prefersReducedMotion()) return;

        const section = sectionRef.current;
        const form = formRef.current;

        ctx = gsap.context(() => {
          gsap.from(
            section.querySelectorAll(":scope > div:first-of-type > *"),
            {
              y: 60,
              autoAlpha: 0,
              stagger: 0.12,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 78%" },
            },
          );

          const revealItems =
            section.querySelectorAll<HTMLElement>("[data-reveal]");
          gsap.from(revealItems, {
            x: -30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: revealItems[0] ?? section,
              start: "top 78%",
            },
          });

          if (form) {
            gsap.from(form.querySelectorAll(":scope > *"), {
              x: 30,
              autoAlpha: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: form, start: "top 78%" },
            });
          }
        }, section);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [formRef]);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-between bg-rubric-black px-16 py-32 max-[900px]:px-8 max-[900px]:py-20">
      <div className="mb-24">
        <p className="mb-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase opacity-50">
          Contacto
        </p>
        <h2 className="mb-8 font-display text-[clamp(4rem,12vw,13rem)] leading-[0.9]">
          DEJEMOS
          <br />
          UNA <span className="text-rubric-red">marca.</span>
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
        <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={formRef}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <FieldLabel>Nombre</FieldLabel>
              <input
                className={inputClass}
                placeholder="Tu nombre"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Empresa</FieldLabel>
              <input
                className={inputClass}
                placeholder="Tu empresa"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>Email</FieldLabel>
            <input
              className={inputClass}
              placeholder="tu@email.com"
              required
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>¿En qué podemos ayudarte?</FieldLabel>
            <select className={inputClass}>
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
            <FieldLabel>Mensaje</FieldLabel>
            <textarea
              className={inputClass}
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
  );
}
