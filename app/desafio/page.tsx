"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Volume2, Star } from "lucide-react";
import clsx from "clsx";
import { BarraTopo } from "@/components/BarraTopo";
import { Cenario } from "@/components/Cenario";
import { Mascote } from "@/components/Mascote";
import { BarraProgresso } from "@/components/BarraProgresso";
import { cenarioPorNivel } from "@/data/scenarios";
import { desafioDeHoje, jaFezDesafioHoje, dataDeHoje } from "@/lib/daily";
import {
  adicionarPontos,
  carregarProgresso,
  guardarProgresso,
  registarAcerto,
  registarErro,
} from "@/lib/storage";
import { tocarAcerto, tocarErro, tocarVitoria } from "@/lib/sounds";
import { falarIngles } from "@/lib/speech";
import { escolherDistractores } from "@/lib/selection";
import { baralhar } from "@/lib/random";
import type { Nivel } from "@/data/vocabulary";

function ConteudoDesafio() {
  const params = useSearchParams();
  const nivelParam = Number(params.get("nivel") ?? "1");
  const nivel = ([1, 2, 3].includes(nivelParam) ? nivelParam : 1) as Nivel;

  const desafio = useMemo(() => desafioDeHoje(nivel), [nivel]);
  const cenario = cenarioPorNivel(nivel, desafio.palavras.length);

  const [feitoHoje, setFeitoHoje] = useState(false);
  const [idx, setIdx] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [fim, setFim] = useState(false);

  useEffect(() => {
    setFeitoHoje(jaFezDesafioHoje(carregarProgresso().ultimoDesafio));
  }, []);

  const alvo = desafio.palavras[idx];
  const opcoes = useMemo(
    () => (alvo ? baralhar([alvo, ...escolherDistractores(alvo, 2, nivel)]) : []),
    [alvo, nivel]
  );

  if (feitoHoje) {
    return (
      <Cenario cenario={cenario}>
        <BarraTopo titulo="Desafio do dia" />
        <main className="mx-auto max-w-3xl px-3 py-6">
          <div className="cartao text-center">
            <Mascote emoji="✅" tamanho="xl" />
            <h2 className="mt-2 text-3xl font-black text-ceu-700">
              Já fizeste o desafio de hoje!
            </h2>
            <p className="mt-2 text-ceu-700/80">
              Volta amanhã para um novo desafio.
            </p>
            <Link href="/" className="mt-5 btn-grande bg-ceu-400 text-white">
              Voltar ao início
            </Link>
          </div>
        </main>
      </Cenario>
    );
  }

  function escolher(opcaoId: string) {
    if (escolha || !alvo) return;
    setEscolha(opcaoId);
    const certo = opcaoId === alvo.id;
    if (certo) {
      tocarAcerto();
      const ganho = 10 * desafio.multiplicador;
      setPontos((x) => x + ganho);
      adicionarPontos(ganho);
      registarAcerto(alvo.id);
    } else {
      tocarErro();
      registarErro(alvo.id);
    }
    window.setTimeout(() => {
      if (idx + 1 >= desafio.palavras.length) {
        tocarVitoria();
        guardarProgresso({ ultimoDesafio: dataDeHoje() });
        setFim(true);
      } else {
        setIdx(idx + 1);
        setEscolha(null);
      }
    }, certo ? 800 : 1000);
  }

  if (fim) {
    return (
      <Cenario cenario={cenario}>
        <BarraTopo titulo="Desafio do dia" />
        <main className="mx-auto max-w-3xl px-3 py-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cartao text-center"
          >
            <Mascote emoji="🏆" tamanho="xl" />
            <h2 className="mt-2 text-3xl font-black text-ceu-700">
              Desafio concluído!
            </h2>
            <p className="mt-2 text-2xl text-coral-500 font-extrabold">
              + {pontos} pontos (x{desafio.multiplicador})
            </p>
            <div className="mt-3 flex justify-center gap-1">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className="w-10 h-10 fill-sol-300 text-sol-400 animate-pop"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <Link href="/" className="mt-5 btn-grande bg-ceu-400 text-white">
              Voltar ao início
            </Link>
          </motion.div>
        </main>
      </Cenario>
    );
  }

  if (!alvo) return null;

  return (
    <Cenario cenario={cenario}>
      <BarraTopo titulo="🎯 Desafio do dia" />
      <main className="mx-auto max-w-3xl px-3 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Mascote emoji={cenario.mascote} tamanho="sm" />
          <div className="flex-1">
            <BarraProgresso atual={idx + 1} total={desafio.palavras.length} />
          </div>
          <div className="text-sm font-bold text-ceu-700">
            {idx + 1}/{desafio.palavras.length}
          </div>
        </div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="cartao text-center"
        >
          <div className="text-xs uppercase tracking-wider text-coral-500 font-bold mb-1">
            Pontos a dobrar! x{desafio.multiplicador}
          </div>
          <div className="text-8xl mt-1" aria-label={alvo.portugues}>
            {alvo.emoji}
          </div>
          <button
            type="button"
            onClick={() => falarIngles(alvo.ingles)}
            aria-label="Ouvir palavra"
            className="mt-2 btn-grande bg-sol-200 text-ceu-700 !min-h-[48px] !px-3 !text-base"
          >
            <Volume2 className="w-5 h-5" /> Ouvir
          </button>
          <div className="mt-4 grid gap-3">
            {opcoes.map((p) => {
              const escolhido = escolha === p.id;
              const certo = p.id === alvo.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => escolher(p.id)}
                  className={clsx(
                    "opcao min-h-[72px] text-2xl font-extrabold text-ceu-700",
                    escolhido && certo && "opcao-correta",
                    escolhido && !certo && "opcao-errada"
                  )}
                >
                  {p.ingles}
                </button>
              );
            })}
          </div>
        </motion.div>
      </main>
    </Cenario>
  );
}

export default function PaginaDesafio() {
  return (
    <Suspense fallback={<div className="p-6 text-center">A carregar…</div>}>
      <ConteudoDesafio />
    </Suspense>
  );
}
