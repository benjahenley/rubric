import { cases } from "./data";

export function ClientsSection() {
  return (
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
  );
}
