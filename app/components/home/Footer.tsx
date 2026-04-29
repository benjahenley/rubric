import { useEffect, useRef } from "react";

import {
  loadGsapWithScrollTrigger,
  prefersReducedMotion,
  reportGsapLoadError,
} from "./animations";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void loadGsapWithScrollTrigger()
      .then(({ gsap }) => {
        if (cancelled || !footerRef.current || prefersReducedMotion()) return;

        const footer = footerRef.current;

        ctx = gsap.context(() => {
          gsap.from(footer.querySelectorAll(":scope > *"), {
            y: 20,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: footer, start: "top 95%" },
          });
        }, footer);
      })
      .catch(reportGsapLoadError);

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="flex items-center justify-between border-t border-[rgba(245,240,232,0.08)] bg-rubric-black px-16 py-8 max-[900px]:flex-col max-[900px]:gap-6 max-[900px]:px-8 max-[900px]:text-center">
      <span className="text-[0.78rem] tracking-[0.05em] text-[rgba(245,240,232,0.3)]">
        © 2025 Rubric — Agencia de publicidad colaborativa
      </span>
      <div className="flex gap-6">
        <a
          className="text-[0.78rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)] uppercase no-underline transition-colors duration-200 hover:text-rubric-red"
          href="https://instagram.com/rubric.ar"
          rel="noreferrer"
          target="_blank">
          Instagram
        </a>
        <a
          className="text-[0.78rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)] uppercase no-underline transition-colors duration-200 hover:text-rubric-red"
          href="https://linkedin.com/company/rubric-ar"
          rel="noreferrer"
          target="_blank">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
