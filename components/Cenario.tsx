"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { Cenario as CenarioT } from "@/data/scenarios";

interface Props {
  cenario: CenarioT;
  children: React.ReactNode;
}

export function Cenario({ cenario, children }: Props) {
  return (
    <div
      className={clsx(
        "relative min-h-screen overflow-hidden bg-gradient-to-b",
        cenario.fundo
      )}
    >
      {/* Decorações flutuantes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {cenario.decoracoes.map((d, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl md:text-5xl opacity-70 select-none"
            style={{
              left: `${(i * 23 + 7) % 92}%`,
              top: `${(i * 37 + 15) % 80}%`,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 6, -4, 0],
            }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            {d}
          </motion.span>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
