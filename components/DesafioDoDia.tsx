"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarHeart, Check } from "lucide-react";
import { carregarProgresso } from "@/lib/storage";
import { jaFezDesafioHoje } from "@/lib/daily";

interface Props {
  nivel: 1 | 2 | 3;
}

export function DesafioDoDia({ nivel }: Props) {
  const [feito, setFeito] = useState(false);

  useEffect(() => {
    const p = carregarProgresso();
    setFeito(jaFezDesafioHoje(p.ultimoDesafio));
    const f = () => setFeito(jaFezDesafioHoje(carregarProgresso().ultimoDesafio));
    window.addEventListener("progresso-atualizado", f);
    return () => window.removeEventListener("progresso-atualizado", f);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Link
        href={`/desafio?nivel=${nivel}`}
        className="opcao flex items-center gap-4 p-4 bg-gradient-to-r from-coral-200 to-sol-200"
        aria-label={
          feito
            ? "Desafio do dia já concluído"
            : "Joga o desafio do dia para pontos extra"
        }
      >
        <div className="text-5xl" aria-hidden="true">
          {feito ? "✅" : "🎯"}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-ceu-700 font-extrabold text-lg">
            <CalendarHeart className="w-5 h-5" />
            Desafio do dia
          </div>
          <div className="text-sm text-ceu-700/80">
            {feito
              ? "Já completaste o desafio de hoje. Volta amanhã!"
              : "5 palavras especiais — pontos a dobrar!"}
          </div>
        </div>
        {feito && (
          <div className="text-menta-500">
            <Check className="w-7 h-7" />
          </div>
        )}
      </Link>
    </motion.div>
  );
}
