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

export function LogosSection() {
  return (
    <section className="logos-section bg-white py-16 max-[900px]:py-12">
      <div className="logos-collage mx-auto flex flex-col items-center">
        {logoRows.map((row, rowIndex) => (
          <div className="logos-collage-row flex justify-center" key={rowIndex}>
            {row.map((logo) => (
              <img
                alt={logo.name}
                className="logos-collage-image block shrink-0 object-contain"
                height={400}
                key={logo.file}
                loading="lazy"
                src={`/images/cans/logos-empresas/${logo.file}`}
                width={1000}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
