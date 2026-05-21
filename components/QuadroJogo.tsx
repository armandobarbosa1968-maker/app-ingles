"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cenario } from "./Cenario";
import { BarraTopo } from "./BarraTopo";
import { BarraProgresso } from "./BarraProgresso";
import { Mascote } from "./Mascote";
import { FimRonda } from "./FimRonda";
import {
  cenarioParaTemas,
  cenarioPorNivel,
  type Cenario as CenarioT,
} from "@/data/scenarios";
import {
  adicionarPontos,
  carregarProgresso,
  guardarProgresso,
  incrementarRondas,
  registarAcerto,
  registarErro,
} from "@/lib/storage";
import { acertou, tentaOutraVez, aleatoria } from "@/data/rewards";
import {
  registarVariante,
  variantePossivel,
} from "@/lib/session";
import { tocarAcerto, tocarErro } from "@/lib/sounds";
import { miniJogoPorIndice } from "@/data/minigames";
import type { Nivel, Palavra } from "@/data/vocabulary";

export interface PerguntaResultado {
  /** ID da palavra alvo, para registar erros/acertos. */
  palavraId?: string;
  /** Indica se a criança acertou. */
  certo: boolean;
}

export interface ConfigJogo<T> {
  /** Nome curto a guardar como "último jogo". */
  idJogo: string;
  /** Variantes do jogo. */
  variantes: string[];
  /** Gera as N perguntas para esta ronda, dado o nível. */
  gerarPerguntas: (nivel: Nivel, n: number) => T[];
  /** Determina o tema dominante das perguntas (para o cenário). */
  temasDe: (perguntas: T[]) => Palavra["tema"][];
  /** Renderiza uma pergunta, recebendo um callback para reportar resultado. */
  renderPergunta: (
    pergunta: T,
    variante: string,
    onResultado: (r: PerguntaResultado) => void
  ) => React.ReactNode;
  /** Quantas perguntas por ronda. */
  totalPerguntas?: number;
  /** Multiplicador opcional de pontos. */
  multiplicador?: number;
  /** Título mostrado no topo. */
  titulo: string;
}

export function QuadroJogo<T>({
  config,
}: {
  config: ConfigJogo<T>;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const nivelParam = Number(params.get("nivel") ?? "1");
  const nivel = ([1, 2, 3].includes(nivelParam) ? nivelParam : 1) as Nivel;
  const TOTAL = config.totalPerguntas ?? 8;
  const MULT = config.multiplicador ?? 1;

  const [seed, setSeed] = useState(0);
  const perguntas = useMemo(
    () => config.gerarPerguntas(nivel, TOTAL),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nivel, seed]
  );

  const [variante, setVariante] = useState<string>(() => {
    const opcoes = config.variantes.filter(variantePossivel);
    const escolhida =
      (opcoes.length > 0 ? opcoes : config.variantes)[
        Math.floor(
          Math.random() *
            (opcoes.length > 0 ? opcoes.length : config.variantes.length)
        )
      ];
    registarVariante(escolhida);
    return escolhida;
  });

  const cenario: CenarioT = useMemo(() => {
    const t = config.temasDe(perguntas);
    if (t.length > 0) return cenarioParaTemas(t);
    return cenarioPorNivel(nivel, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perguntas, nivel, seed]);

  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [pontosGanhos, setPontosGanhos] = useState(0);
  const [estado, setEstado] = useState<"a-jogar" | "feedback" | "fim">("a-jogar");
  const [ultimoCerto, setUltimoCerto] = useState(false);
  const [ultimaMsg, setUltimaMsg] = useState("");
  const [miniJogoAviso, setMiniJogoAviso] = useState<{
    msg: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    guardarProgresso({ ultimoJogo: config.idJogo, ultimoNivel: nivel });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reportar = useCallback(
    (r: PerguntaResultado) => {
      if (estado !== "a-jogar") return;
      if (r.certo) {
        tocarAcerto();
        setAcertos((x) => x + 1);
        const ganhos = 10 * MULT;
        setPontosGanhos((x) => x + ganhos);
        adicionarPontos(ganhos);
        if (r.palavraId) registarAcerto(r.palavraId);
        setUltimaMsg(aleatoria(acertou, null));
      } else {
        tocarErro();
        if (r.palavraId) registarErro(r.palavraId);
        setUltimaMsg(aleatoria(tentaOutraVez, null));
      }
      setUltimoCerto(r.certo);
      setEstado("feedback");

      window.setTimeout(() => {
        if (indice + 1 >= perguntas.length) {
          // Verificar mini-jogo surpresa a cada 5 rondas
          const prog = incrementarRondas();
          if (prog.rondasCompletas % 5 === 0) {
            const mj = miniJogoPorIndice(prog.rondasCompletas / 5 - 1);
            setMiniJogoAviso({
              msg: `Mini-jogo surpresa "${mj.nome}" ${mj.emoji} desbloqueado!`,
              id: mj.id,
            });
          }
          setEstado("fim");
        } else {
          setIndice((i) => i + 1);
          setEstado("a-jogar");
        }
      }, r.certo ? 950 : 1200);
    },
    [estado, indice, perguntas.length, MULT, config.idJogo]
  );

  function jogarOutraVez() {
    setIndice(0);
    setAcertos(0);
    setPontosGanhos(0);
    setEstado("a-jogar");
    setSeed((s) => s + 1);
    setMiniJogoAviso(null);

    // sortear nova variante
    const opcoes = config.variantes.filter(variantePossivel);
    const nova =
      (opcoes.length > 0 ? opcoes : config.variantes)[
        Math.floor(
          Math.random() *
            (opcoes.length > 0 ? opcoes.length : config.variantes.length)
        )
      ];
    registarVariante(nova);
    setVariante(nova);
  }

  if (estado === "fim") {
    return (
      <Cenario cenario={cenario}>
        <BarraTopo titulo={config.titulo} />
        <main className="mx-auto max-w-3xl px-3 py-6">
          {miniJogoAviso && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4 cartao bg-coral-200 border-coral-300 text-center"
            >
              <div className="text-ceu-700 font-extrabold">
                🎉 {miniJogoAviso.msg}
              </div>
              <Link
                href={`/mini?id=${miniJogoAviso.id}&nivel=${nivel}`}
                className="mt-2 inline-block btn-grande bg-coral-400 text-white !min-h-[48px] !text-base"
              >
                Jogar agora!
              </Link>
            </motion.div>
          )}
          <FimRonda
            pontosGanhos={pontosGanhos}
            acertos={acertos}
            total={perguntas.length}
            onJogarOutraVez={jogarOutraVez}
          />
        </main>
      </Cenario>
    );
  }

  const perguntaAtual = perguntas[indice];

  return (
    <Cenario cenario={cenario}>
      <BarraTopo titulo={config.titulo} />
      <main className="mx-auto max-w-3xl px-3 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Mascote emoji={cenario.mascote} tamanho="sm" />
          <div className="flex-1">
            <BarraProgresso atual={indice + 1} total={perguntas.length} />
          </div>
          <div className="text-sm font-bold text-ceu-700">
            {indice + 1}/{perguntas.length}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${indice}-${variante}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="cartao"
          >
            <div className="text-xs uppercase tracking-wider text-ceu-500 font-bold mb-2">
              {variante}
            </div>
            {config.renderPergunta(perguntaAtual, variante, reportar)}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {estado === "feedback" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-3 cartao text-center text-2xl font-extrabold ${
                ultimoCerto
                  ? "bg-menta-200 text-menta-600"
                  : "bg-coral-100 text-coral-500"
              }`}
            >
              {ultimoCerto ? "✅" : "💪"} {ultimaMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="sr-only"
        >
          Voltar
        </button>
      </main>
    </Cenario>
  );
}
