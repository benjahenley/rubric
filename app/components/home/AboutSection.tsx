import { formatStatValue, stats } from "./data";

export function AboutSection() {
  return (
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
  );
}
