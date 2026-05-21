"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  autocolantes,
  mascoteAtual,
  mascotesDesbloqueadasPara,
} from "@/data/rewards";
import { carregarProgresso } from "@/lib/storage";

export function Coleccao() {
  const [pontos, setPontos] = useState(0);
  const [colec, setColec] = useState<string[]>([]);

  useEffect(() => {
    const p = carregarProgresso();
    setPontos(p.pontos);
    setColec(p.autocolantes);
    const f = () => {
      const x = carregarProgresso();
      setPontos(x.pontos);
      setColec(x.autocolantes);
    };
    window.addEventListener("progresso-atualizado", f);
    return () => window.removeEventListener("progresso-atualizado", f);
  }, []);

  const desbloqueadas = mascotesDesbloqueadasPara(pontos);
  const atual = mascoteAtual(pontos);

  return (
    <details className="cartao">
      <summary className="cursor-pointer list-none flex items-center gap-3">
        <div className="text-4xl" aria-hidden="true">
          {atual.emoji}
        </div>
        <div className="flex-1">
          <div className="font-extrabold text-ceu-700">A tua coleção</div>
          <div className="text-sm text-ceu-700/70">
            {desbloqueadas.length} mascotes · {colec.length} autocolantes
          </div>
        </div>
        <div className="text-ceu-500 text-sm">ver ▾</div>
      </summary>

      <div className="mt-4">
        <h4 className="font-bold text-ceu-700 mb-1">Mascotes</h4>
        <div className="grid grid-cols-5 gap-2">
          {[...new Array(10)].map((_, i) => {
            const m = desbloqueadas[i];
            if (m) {
              return (
                <motion.div
                  key={m.id}
                  whileHover={{ scale: 1.1 }}
                  className="aspect-square rounded-2xl bg-menta-100 flex flex-col items-center justify-center p-1 text-center"
                  title={`${m.nome} — ${m.descricao}`}
                >
                  <div className="text-3xl">{m.emoji}</div>
                  <div className="text-[10px] font-bold text-ceu-700 truncate w-full">
                    {m.nome}
                  </div>
                </motion.div>
              );
            }
            return (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-ceu-50 flex items-center justify-center text-2xl text-ceu-200"
                aria-label="Por desbloquear"
              >
                🔒
              </div>
            );
          })}
        </div>

        <h4 className="font-bold text-ceu-700 mt-4 mb-1">Autocolantes</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
          {autocolantes.map((a) => {
            const tem = colec.includes(a.id);
            return (
              <div
                key={a.id}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${
                  tem ? "bg-sol-100" : "bg-ceu-50 opacity-40"
                }`}
                title={a.nome}
                aria-label={`${a.nome} ${tem ? "obtido" : "por obter"}`}
              >
                {tem ? a.emoji : "❔"}
              </div>
            );
          })}
        </div>
      </div>
    </details>
  );
}
