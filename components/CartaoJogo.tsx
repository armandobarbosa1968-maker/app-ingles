"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  href: string;
  emoji: string;
  titulo: string;
  descricao: string;
  cor: "ceu" | "sol" | "menta" | "coral";
  delay?: number;
}

const cores: Record<Props["cor"], string> = {
  ceu: "bg-ceu-200 hover:bg-ceu-300",
  sol: "bg-sol-200 hover:bg-sol-300",
  menta: "bg-menta-200 hover:bg-menta-300",
  coral: "bg-coral-200 hover:bg-coral-300",
};

export function CartaoJogo({ href, emoji, titulo, descricao, cor, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 18 }}
    >
      <Link
        href={href}
        className={clsx(
          "block opcao p-5 sm:p-6 text-left",
          cores[cor]
        )}
      >
        <div className="text-6xl mb-2" aria-hidden="true">
          {emoji}
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-ceu-700">
          {titulo}
        </h3>
        <p className="text-sm sm:text-base text-ceu-700/80">{descricao}</p>
      </Link>
    </motion.div>
  );
}
