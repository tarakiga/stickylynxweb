"use client";
import PremiumButton from "./PremiumButton";
import React from "react";

type HomeButtonVariant = "header" | "hero" | "cta";

export default function HomeButtons({ variant }: { variant: HomeButtonVariant }) {
  let label = "Get Started";
  if (variant === "hero") label = "Start Creating";

  return (
    <PremiumButton as="a" href="/dashboard" variant="primary">
      {label}
    </PremiumButton>
  );
} 