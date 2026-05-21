"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Home, Sparkles, Star } from "lucide-react";
import {
  aleatoria,
  autocolantes,
  fimDeRonda,
  mascoteAtual,
} from "@/data/rewards";
import {
  adicionarAutocolante,
  carregarProgresso,
} from "@/lib/storage";
import {
  getUltimaFraseIncentivo,
  setUltimaFraseIncentivo,
} from "@/lib/session";
import { tocarVitoria } from "@/lib/sounds";
import { Mascote } from "./Mascote";

interface Props {
  pontosGanhos: number;
  acertos: number;
  total: number;
  /** Caminho para "jogar novamente" — mesmo jogo. */
  onJogarOutraVez: () => void;
}

export function FimRonda({
  pontosGanhos,
  acertos,
  total,
  onJogarOutraVez,
}: Props) {
  const [frase] = useState(() => {
    const f = aleatoria(fimDeRonda, getUltimaFraseIncentivo());
    setUltimaFraseIncentivo(f);
    return f;
  });

  const novoAutocolante = useMemo(() => {
    const prog = carregarProgresso();
    const novos = autocolantes.filter((a) => !prog.autocolantes.includes(a.id));
    if (novos.length === 0) return null;
    // probabilidade ~50% por ronda completa, sempre na 1.ª ronda
    if (prog.autocolantes.length === 0 || Math.random() < 0.5) {
      const escolhido = novos[Math.floor(Math.random() * novos.length)];
      adicionarAutocolante(escolhido.id);
      return escolhido;
    }
    return null;
  }, []);

  const mascote = useMemo(() => {
    return mascoteAtual(carregarProgresso().pontos);
  }, []);

  useEffect(() => {
    tocarVitoria();
  }, []);

  const estrelas = Math.max(1, Math.min(3, Math.round((acertos / total) * 3)));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cartao max-w-md mx-auto text-center"
    >
      <Mascote emoji={mascote.emoji} tamanho="xl" />
      <h2 className="mt-2 text-3xl sm:text-4xl font-black text-ceu-700">
        {frase}
      </h2>

      <div
        className="mt-4 flex justify-center gap-1"
        aria-label={`${estrelas} estrelas de 3`}
      >
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            className={`w-10 h-10 ${
              i <= estrelas
                ? "fill-sol-300 text-sol-400 animate-pop"
                : "text-ceu-100"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <p className="mt-4 text-lg text-ceu-700">
        Acertaste em <strong>{acertos}</strong> de <strong>{total}</strong>!
      </p>
      <p className="text-coral-500 font-extrabold text-2xl mt-1">
        + {pontosGanhos} pontos
      </p>

      {novoAutocolante && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="mt-5 rounded-3xl bg-sol-100 border-4 border-sol-300 p-4"
        >
          <div className="flex items-center justify-center gap-2 text-ceu-700 font-bold">
            <Sparkles className="w-5 h-5" />
            Novo autocolante!
          </div>
          <div className="mt-1 text-5xl">{novoAutocolante.emoji}</div>
          <div className="text-sm">{novoAutocolante.nome}</div>
        </motion.div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onJogarOutraVez}
          className="btn-grande bg-menta-400 text-white"
        >
          <RotateCcw className="w-5 h-5" />
          Outra vez
        </button>
        <Link href="/" className="btn-grande bg-ceu-400 text-white">
          <Home className="w-5 h-5" />
          Início
        </Link>
      </div>
    </motion.div>
  );
}
