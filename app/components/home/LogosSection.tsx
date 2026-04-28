import { partnerLogos } from "./data";

export function LogosSection() {
  return (
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
  );
}
