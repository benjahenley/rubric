export function IntroOverlay() {
  return (
    <div className="intro-overlay fixed inset-0 z-[200] flex items-center justify-center bg-rubric-black">
      <div className="intro-logo-wrap overflow-hidden px-8">
        <img
          alt="Rubric"
          className="intro-logo h-[clamp(4.5rem,13vw,13rem)] w-auto max-w-[min(82vw,980px)]"
          src="/logo-rubric.png"
        />
      </div>
    </div>
  );
}
