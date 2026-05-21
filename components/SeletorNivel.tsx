"use client";

import clsx from "clsx";
import type { Nivel } from "@/data/vocabulary";

interface Props {
  valor: Nivel;
  onChange: (n: Nivel) => void;
}

const niveis: { n: Nivel; rotulo: string; sub: string; cor: string }[] = [
  { n: 1, rotulo: "1.º/2.º ano", sub: "Iniciante", cor: "bg-menta-300 text-menta-700" },
  { n: 2, rotulo: "3.º ano", sub: "Intermédio", cor: "bg-sol-300 text-ceu-700" },
  { n: 3, rotulo: "4.º ano", sub: "Avançado", cor: "bg-coral-300 text-coral-500" },
];

export function SeletorNivel({ valor, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Escolhe o nível"
      className="grid grid-cols-3 gap-2 sm:gap-3"
    >
      {niveis.map((n) => {
        const ativo = valor === n.n;
        return (
          <button
            key={n.n}
            type="button"
            role="radio"
            aria-checked={ativo}
            onClick={() => onChange(n.n)}
            className={clsx(
              "opcao px-2 py-3 sm:py-4 text-center",
              ativo
                ? `${n.cor} !border-white scale-[1.03]`
                : "bg-white text-ceu-700"
            )}
          >
            <div className="font-extrabold text-base sm:text-lg">{n.rotulo}</div>
            <div className="text-xs sm:text-sm opacity-80">{n.sub}</div>
          </button>
        );
      })}
    </div>
  );
}
