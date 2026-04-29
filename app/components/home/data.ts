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

export const services = [
  [
    "01",
    "Publicidad",
    "Campañas con ideas que traccionan. Creatividad al servicio de objetivos reales.",
  ],
  [
    "02",
    "Branding",
    "Desde la estrategia hasta la ejecución. Trabajamos en cada dimensión de las marcas con el talento justo para cada etapa. Identidades y narrativa desde adentro. Marcas con propósito, con voz y con valor.",
  ],
  [
    "03",
    "Estrategia",
    "Redes, email marketing, copywriting y narrativa de marca. Todo lo que las marcas dicen, bien dicho.",
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
    "Redes, email marketing, copywriting y narrativa de marca. Todo lo que las marcas dicen, bien dicho.",
  ],
];

export const cases = [
  {
    number: "001",
    name: "WILOBANK - BANCO DIGITAL",
    type: "MKT DIGITAL, CONTENIDO Y REDES",
    initials: "WB",
    variant: "dark",
  },
  {
    number: "002",
    name: "BPLAY . APUESTAS ONLINE",
    type: "BRANDING - LANZAMIENTO",
    initials: "BP",
    variant: "accent",
  },
  {
    number: "003",
    name: "ARTRO - MEDICINA DEPORTIVA",
    type: "ATENCION INTEGRAL",
    initials: "AR",
    variant: "light",
  },
  {
    number: "004",
    name: "CACIQUE - DESARROLLOS",
    type: "RE BRANDING Y ARQUITECTURA DE MARCAS",
    initials: "CA",
    variant: "dark",
  },
  {
    number: "005",
    name: "NÜPARK",
    type: "NAMING Y BRANDBOOK",
    initials: "NP",
    variant: "light",
  },
  {
    number: "006",
    name: "MEDIALAUGH",
    type: "RE BRANDING ESTRATEGICO Y ASSETS DIGITALES",
    initials: "ML",
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
