"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BarraTopo } from "@/components/BarraTopo";
import { Cenario } from "@/components/Cenario";
import { Mascote } from "@/components/Mascote";
import { MiniJogo, finalizarMiniJogo } from "@/components/jogos/MiniJogos";
import { miniJogoPorIndice, miniJogos, type IdMiniJogo } from "@/data/minigames";
import { cenarioPorNivel } from "@/data/scenarios";
import { carregarProgresso } from "@/lib/storage";
import type { Nivel } from "@/data/vocabulary";

function ConteudoMini() {
  const params = useSearchParams();
  const router = useRouter();
  const nivelParam = Number(params.get("nivel") ?? "1");
  const nivel = ([1, 2, 3].includes(nivelParam) ? nivelParam : 1) as Nivel;

  const [id, setId] = useState<IdMiniJogo | null>(null);
  const [pronto, setPronto] = useState(false);
  const [terminado, setTerminado] = useState<number | null>(null);

  useEffect(() => {
    const idParam = params.get("id") as IdMiniJogo | null;
    if (idParam && miniJogos.some((m) => m.id === idParam)) {
      setId(idParam);
    } else {
      const p = carregarProgresso();
      setId(miniJogoPorIndice(p.rondasCompletas).id);
    }
  }, [params]);

  const cenario = cenarioPorNivel(nivel, id ? id.length : 0);
  const meta = miniJogos.find((m) => m.id === id);

  return (
    <Cenario cenario={cenario}>
      <BarraTopo titulo={meta ? `${meta.emoji} ${meta.nome}` : "Mini-jogo"} />
      <main className="mx-auto max-w-3xl px-3 py-4">
        {terminado !== null ? (
          <div className="cartao text-center">
            <Mascote emoji={cenario.mascote} tamanho="xl" />
            <h2 className="mt-2 text-3xl font-black text-ceu-700">
              Fim do mini-jogo!
            </h2>
            <p className="mt-2 text-2xl text-coral-500 font-extrabold">
              + {terminado} pontos
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setTerminado(null);
                  setPronto(false);
                }}
                className="btn-grande bg-menta-400 text-white"
              >
                Outra vez
              </button>
              <Link href="/" className="btn-grande bg-ceu-400 text-white">
                Início
              </Link>
            </div>
          </div>
        ) : !pronto ? (
          <div className="cartao text-center">
            <Mascote emoji={meta?.emoji ?? "🎉"} tamanho="xl" />
            <h2 className="mt-2 text-3xl font-black text-ceu-700">
              {meta?.nome ?? "Mini-jogo surpresa!"}
            </h2>
            <p className="mt-2 text-ceu-700/80">{meta?.descricao}</p>
            <button
              type="button"
              onClick={() => setPronto(true)}
              className="mt-5 btn-grande bg-coral-400 text-white"
            >
              Começar!
            </button>
            <Link
              href="/"
              className="block mt-3 text-ceu-500 underline"
            >
              Voltar ao início
            </Link>
          </div>
        ) : (
          id && (
            <div className="cartao">
              <MiniJogo
                id={id}
                nivel={nivel}
                onFim={(p) => {
                  finalizarMiniJogo();
                  setTerminado(p);
                }}
              />
            </div>
          )
        )}
      </main>
    </Cenario>
  );
}

export default function PaginaMini() {
  return (
    <Suspense fallback={<div className="p-6 text-center">A carregar…</div>}>
      <ConteudoMini />
    </Suspense>
  );
}
