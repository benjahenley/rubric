export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  padStart?: number;
};

export function formatStatValue(
  value: number,
  {
    prefix = "",
    suffix = "",
    padStart = 0,
  }: Pick<Stat, "prefix" | "suffix" | "padStart">,
) {
  return `${prefix}${Math.round(value).toString().padStart(padStart, "0")}${suffix}`;
}

export const stats: Stat[] = [
  { value: 15, label: "Años de experiencia combinada", prefix: "+" },
  { value: 30, label: "Marcas acompañadas", prefix: "+" },
  { value: 100, label: "Talento senior para cada proyecto", suffix: "%" },
  {
    value: 1,
    label: "Propósito: ayudar a las marcas a encontrar su marca",
    padStart: 2,
  },
];

export const services = [
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

export const cases = [
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

export const projects = [
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

export const partnerLogos = [
  "bbdo logo.png",
  "kisspng-mondelez-international-kraft-foods-cadbury-snack-c-5b11401897fd64.0648095415278571766226.jpg",
  "logo sancor .png",
  "logo_FB.png",
  "png-clipart-logo-india-stella-artois-brand-font-india-label-text.png",
  "png-clipart-logo-nikon-camera-nikon-logo-text-logo.png",
  "png-transparent-beer-logo-stella-artois-lager-brahma-beer-stella-artois-lager-duvel-corporate-identity.png",
];

export const contactItems = [
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
