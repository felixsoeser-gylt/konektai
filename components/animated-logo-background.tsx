"use client"

export default function AnimatedLogoBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      style={{
        animation: "floatLogo 10s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      <img
        src="/images/design-mode/Logo%20Text.png"
        alt=""
        style={{
          width: "auto",
          maxWidth: "360px",
          opacity: 0.25,
          transform: "translateZ(0)",
          filter: "none",
        }}
      />
    </div>
  )
}
