const navItems = [
  ["Nosotros", "#nosotros"],
  ["Servicios", "#servicios"],
  ["Clientes", "#clientes"],
  ["Proyectos", "#trabajos"],
  ["Contacto", "#contacto"],
];

export function NavBar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-16 py-6 mix-blend-difference max-[900px]:px-8">
      <a
        className="nav-logo-link inline-flex items-center no-underline"
        href="#inicio">
        <img
          alt="Rubric"
          className="nav-logo h-9 w-auto max-[640px]:h-7"
          src="/logo-rubric.png"
        />
      </a>
      <ul className="flex list-none gap-10 max-[640px]:hidden">
        {navItems.map(([label, href]) => (
          <li key={href}>
            <a
              className="nav-link text-[0.8rem] tracking-[0.15em] text-rubric-white uppercase no-underline opacity-70 transition-opacity duration-200 hover:opacity-100"
              href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
