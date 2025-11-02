"use client"

export default function AnimatedLogoBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-1/2 -translate-x-1/2 z-0"
      style={{
        top: "-15px",
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
          opacity: 0.12,
          transform: "translateZ(0)",
          filter: "none",
        }}
      />
    </div>
  )
}
