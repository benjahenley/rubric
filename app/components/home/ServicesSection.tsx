import { services } from "./data";

export function ServicesSection() {
  return (
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
  );
}
