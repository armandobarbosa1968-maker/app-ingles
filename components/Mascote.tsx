"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  emoji: string;
  tamanho?: "sm" | "md" | "lg" | "xl";
  flutuar?: boolean;
  className?: string;
}

const tamanhos = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-8xl",
  xl: "text-9xl",
};

export function Mascote({
  emoji,
  tamanho = "lg",
  flutuar = true,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={clsx(
        "inline-block select-none",
        tamanhos[tamanho],
        flutuar && "animate-floaty",
        className
      )}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  );
}
