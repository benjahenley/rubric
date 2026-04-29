export async function loadGsap() {
  const gsapModule = await import("gsap");

  return gsapModule.default;
}

export async function loadGsapWithScrollTrigger() {
  const [gsapModule, scrollTriggerModule] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  const gsap = gsapModule.default;
  const { ScrollTrigger } = scrollTriggerModule;

  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function reportGsapLoadError(error: unknown) {
  if (import.meta.env.DEV) {
    console.error("Failed to load GSAP", error);
  }
}
