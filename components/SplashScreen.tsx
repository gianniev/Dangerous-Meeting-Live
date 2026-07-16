"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SplashPhase = "entering" | "leaving";

const SPLASH_LOGO_SRC = "/icons/Logotransparentelargo.png";
const HOLD_DURATION_MS = 950;
const EXIT_DURATION_MS = 350;
const REDUCED_HOLD_DURATION_MS = 80;
const REDUCED_EXIT_DURATION_MS = 120;

export function SplashScreen() {
  const [phase, setPhase] = useState<SplashPhase>("entering");
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const holdDuration = prefersReducedMotion ? REDUCED_HOLD_DURATION_MS : HOLD_DURATION_MS;
    const exitDuration = prefersReducedMotion ? REDUCED_EXIT_DURATION_MS : EXIT_DURATION_MS;

    const exitTimer = window.setTimeout(() => {
      setPhase("leaving");
    }, holdDuration);

    const unmountTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, holdDuration + exitDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`splash-screen splash-screen-${phase}`} aria-hidden="true">
      <Image
        className="splash-screen-logo"
        src={SPLASH_LOGO_SRC}
        alt=""
        width={720}
        height={210}
        priority
        sizes="(max-width: 768px) 78vw, 520px"
      />
    </div>
  );
}
