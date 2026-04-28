export function HeroSection() {
  return (
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
  );
}
