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
  { value: 20, label: "Años de experiencia combinada", prefix: "+" },
  { value: 30, label: "Marcas atendidas", prefix: "+" },
  { value: 100, label: "Talento senior para cada proyecto", suffix: "%" },
  {
    value: 1,
    label: "Propósito: ayudar a las marcas a encontrar su marca",
    padStart: 2,
  },
];

export type Service = {
  number: string;
  name: string;
  description: string;
  slug: string;
  canImage: string;
  color: string;
};

export const services: Service[] = [
  {
    number: "01",
    name: "Publicidad",
    description:
      "Campañas con ideas que traccionan. Creatividad al servicio de objetivos reales.",
    slug: "publicidad",
    canImage: "/images/cans/publicidad.webp",
    color: "#C8341A",
  },
  {
    number: "02",
    name: "Branding",
    description:
      "Desde la estrategia hasta la ejecución. Identidades y narrativa desde adentro. Marcas con propósito, con voz y con valor.",
    slug: "branding",
    canImage: "/images/cans/branding.webp",
    color: "#E05A1A",
  },
  {
    number: "03",
    name: "Estrategia",
    description:
      "Redes, email marketing, copywriting y narrativa de marca. Todo lo que las marcas dicen, bien dicho.",
    slug: "estrategia",
    canImage: "/images/cans/estrategia.webp",
    color: "#4A5E3A",
  },
  {
    number: "04",
    name: "Diseño",
    description:
      "Piezas que no se olvidan. De brand books a assets digitales y todo lo que está en el medio.",
    slug: "diseno",
    canImage: "/images/cans/diseno.webp",
    color: "#3D3530",
  },
  {
    number: "05",
    name: "Activaciones",
    description:
      "Experiencias que conectan marcas con personas. Del concepto a la producción.",
    slug: "activaciones",
    canImage: "/images/cans/activaciones.webp",
    color: "#2A4A6B",
  },
  {
    number: "06",
    name: "Contenido",
    description:
      "Redes, email marketing, copywriting y narrativa de marca. Todo lo que las marcas dicen, bien dicho.",
    slug: "contenido",
    canImage: "/images/cans/contenido.webp",
    color: "#5E2A35",
  },
];

export const cases = [
  {
    number: "001",
    name: ["WILOBANK ", "BANCO DIGITAL"],
    type: "MKT DIGITAL, CONTENIDO Y REDES",
    initials: "WB",
    variant: "dark",
    coverImage: "/clientes/willobank.jpg",
  },
  {
    number: "002",
    name: ["BPLAY ", "APUESTAS ONLINE"],
    type: "BRANDING - LANZAMIENTO",
    initials: "BP",
    variant: "accent",
  },
  {
    number: "003",
    name: ["ARTRO ", "MEDICINA DEPORTIVA"],
    type: "ATENCIÓN INTEGRAL",
    initials: "AR",
    variant: "light",
  },
  {
    number: "004",
    name: "NÜPARK",
    type: "NAMING Y BRANDBOOK",
    initials: "NP",
    variant: "light",
  },
  {
    number: "005",
    name: "GRUPO BOLDT ",
    type: "RE BRANDING Y ARQUITECTURA DE MARCAS",
    initials: "GB",
    variant: "dark",
    coverImage: "/clientes/grupoboldt.png",
  },
  {
    number: "006",
    name: "MEDIALAUGH",
    type: "RE BRANDING ESTRATEGICO Y ASSETS DIGITALES",
    initials: "ML",
    variant: "accent",
    stickerImage: "/clientes/sticker-mediaLaugh.svg",
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
    value: "agencia@rubric.com.ar",
    href: "mailto:agencia@rubric.com.ar",
  },
  {
    label: "WhatsApp",
    value: "+54 9 11 4023-3522",
    href: "https://wa.me/5491140233522",
  },
  {
    label: "Instagram",
    value: "@rubric_agencia",
    href: "https://www.instagram.com/rubric_agencia",
  },
  {
    label: "LinkedIn",
    value: "Rubric Argentina",
    href: "https://www.linkedin.com/company/rubric-agencia/",
  },
  {
    label: "Sede",
    value: "Buenos Aires, Argentina",
  },
];
