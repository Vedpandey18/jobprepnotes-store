"use client";

import { usePathname } from "next/navigation";
import { MovingTopBanner } from "@/components/home/MovingTopBanner";

export function ConditionalTopBanner() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <MovingTopBanner />;
}
