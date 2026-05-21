"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { Volume2 } from "lucide-react";
import {
  escolherDistractores,
  escolherPalavrasRonda,
} from "@/lib/selection";
import type { Nivel, Palavra } from "@/data/vocabulary";
import { baralhar } from "@/lib/random";
import { falarIngles } from "@/lib/speech";
import {
  QuadroJogo,
  type PerguntaResultado,
} from "@/components/QuadroJogo";

interface Pergunta {
  alvo: Palavra;
  opcoes: Palavra[];
  /** Modo "memoria": pares baralhados. */
  paresMemoria?: { id: string; rotulo: string; tipo: "img" | "txt"; idAlvo: string }[];
  /** Modo "letras": ordem baralhada das letras. */
  letrasBaralhadas?: string[];
}

const VARIANTES = [
  "toca-imagem",
  "toca-palavra",
  "memoria",
  "letras",
];

function gerarPerguntas(nivel: Nivel, n: number): Pergunta[] {
  const alvos = escolherPalavrasRonda(nivel, n);
  return alvos.map((alvo) => {
    const distractores = escolherDistractores(alvo, 3, nivel);
    const opcoes = baralhar([alvo, ...distractores]);
    return {
      alvo,
      opcoes,
      paresMemoria: baralhar([
        { id: `${alvo.id}-i`, rotulo: alvo.emoji, tipo: "img", idAlvo: alvo.id },
        { id: `${alvo.id}-t`, rotulo: alvo.ingles, tipo: "txt", idAlvo: alvo.id },
        ...distractores.slice(0, 2).flatMap((d) => [
          { id: `${d.id}-i`, rotulo: d.emoji, tipo: "img" as const, idAlvo: d.id },
          { id: `${d.id}-t`, rotulo: d.ingles, tipo: "txt" as const, idAlvo: d.id },
        ]),
      ]),
      letrasBaralhadas: baralhar(
        alvo.ingles.replace(/\s/g, "·").split("")
      ),
    };
  });
}

export default function Jogo1() {
  return (
    <QuadroJogo<Pergunta>
      config={{
        idJogo: "jogo1",
        titulo: "Imagem & Palavra",
        variantes: VARIANTES,
        gerarPerguntas,
        temasDe: (ps) => ps.map((p) => p.alvo.tema),
        renderPergunta: (p, variante, onR) => (
          <RenderJogo1 pergunta={p} variante={variante} onResultado={onR} />
        ),
      }}
    />
  );
}

function RenderJogo1({
  pergunta,
  variante,
  onResultado,
}: {
  pergunta: Pergunta;
  variante: string;
  onResultado: (r: PerguntaResultado) => void;
}) {
  if (variante === "memoria")
    return <ModoMemoria pergunta={pergunta} onResultado={onResultado} />;
  if (variante === "letras")
    return <ModoLetras pergunta={pergunta} onResultado={onResultado} />;
  if (variante === "toca-palavra")
    return <ModoTocaPalavra pergunta={pergunta} onResultado={onResultado} />;
  return <ModoTocaImagem pergunta={pergunta} onResultado={onResultado} />;
}

// ─── MODO: tocar na imagem certa ──────────────────────────────────
function ModoTocaImagem({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const [escolha, setEscolha] = useState<string | null>(null);
  const { alvo, opcoes } = pergunta;

  function escolher(p: Palavra) {
    if (escolha) return;
    setEscolha(p.id);
    const certo = p.id === alvo.id;
    onResultado({ certo, palavraId: alvo.id });
  }

  return (
    <div>
      <div className="text-center">
        <div className="text-sm text-ceu-700/80">Toca na imagem de</div>
        <div className="mt-1 flex items-center justify-center gap-2">
          <h2 className="text-4xl sm:text-5xl font-black text-coral-500">
            {alvo.ingles}
          </h2>
          <button
            type="button"
            aria-label={`Ouvir ${alvo.ingles}`}
            onClick={() => falarIngles(alvo.ingles)}
            className="btn-grande bg-sol-200 text-ceu-700 !min-h-[48px] !px-3"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-ceu-700/70 mt-1">({alvo.portugues})</div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {opcoes.map((p) => {
          const escolhido = escolha === p.id;
          const certo = p.id === alvo.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => escolher(p)}
              aria-label={p.portugues}
              className={clsx(
                "opcao aspect-square flex items-center justify-center",
                escolhido && certo && "opcao-correta",
                escolhido && !certo && "opcao-errada"
              )}
            >
              <span className="text-7xl sm:text-8xl" aria-hidden="true">
                {p.emoji}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MODO: tocar na palavra certa ─────────────────────────────────
function ModoTocaPalavra({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const [escolha, setEscolha] = useState<string | null>(null);
  const { alvo, opcoes } = pergunta;

  function escolher(p: Palavra) {
    if (escolha) return;
    setEscolha(p.id);
    onResultado({ certo: p.id === alvo.id, palavraId: alvo.id });
  }

  return (
    <div>
      <div className="text-center">
        <div className="text-sm text-ceu-700/80">Qual é a palavra desta imagem?</div>
        <div className="mt-2 text-9xl" aria-label={alvo.portugues}>
          {alvo.emoji}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {opcoes.map((p) => {
          const escolhido = escolha === p.id;
          const certo = p.id === alvo.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => escolher(p)}
              className={clsx(
                "opcao min-h-[80px] text-2xl sm:text-3xl font-extrabold text-ceu-700",
                escolhido && certo && "opcao-correta",
                escolhido && !certo && "opcao-errada"
              )}
            >
              {p.ingles}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MODO: memória (encontra o par) ───────────────────────────────
function ModoMemoria({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const pares = pergunta.paresMemoria ?? [];
  const [selecionado, setSelecionado] = useState<typeof pares[number] | null>(null);
  const [emparelhados, setEmparelhados] = useState<Set<string>>(new Set());
  const [erradoTransitorio, setErradoTransitorio] = useState<string | null>(null);
  const [erroulapagar, setErroAteAcertar] = useState(false);

  function clicar(p: typeof pares[number]) {
    if (emparelhados.has(p.idAlvo)) return;
    if (selecionado?.id === p.id) return;
    if (!selecionado) {
      setSelecionado(p);
      return;
    }
    if (selecionado.idAlvo === p.idAlvo && selecionado.tipo !== p.tipo) {
      const novo = new Set(emparelhados);
      novo.add(p.idAlvo);
      setEmparelhados(novo);
      setSelecionado(null);
      if (novo.size === 3) {
        // todos resolvidos
        onResultado({ certo: !erroulapagar, palavraId: pergunta.alvo.id });
      }
    } else {
      setErroAteAcertar(true);
      setErradoTransitorio(p.id);
      window.setTimeout(() => {
        setErradoTransitorio(null);
        setSelecionado(null);
      }, 700);
    }
  }

  return (
    <div>
      <p className="text-center text-ceu-700/80">
        Encontra os pares de imagem e palavra!
      </p>
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {pares.map((p) => {
          const ativo = selecionado?.id === p.id;
          const errado = erradoTransitorio === p.id;
          const fechado = emparelhados.has(p.idAlvo);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => clicar(p)}
              disabled={fechado}
              className={clsx(
                "opcao aspect-square flex items-center justify-center text-2xl sm:text-3xl font-extrabold",
                fechado && "opcao-correta",
                ativo && !fechado && "ring-4 ring-ceu-300",
                errado && "opcao-errada"
              )}
            >
              {p.tipo === "img" ? (
                <span className="text-5xl">{p.rotulo}</span>
              ) : (
                <span className="text-ceu-700">{p.rotulo}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MODO: ordenar letras ─────────────────────────────────────────
function ModoLetras({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const { alvo, letrasBaralhadas = [] } = pergunta;
  const [disponiveis, setDisponiveis] = useState<{ l: string; idx: number }[]>(
    () => letrasBaralhadas.map((l, idx) => ({ l, idx }))
  );
  const [escolhidas, setEscolhidas] = useState<{ l: string; idx: number }[]>([]);
  const [resolvido, setResolvido] = useState(false);

  const palavraAlvo = useMemo(() => alvo.ingles.replace(/\s/g, "·"), [alvo]);

  function adicionar(item: { l: string; idx: number }) {
    if (resolvido) return;
    const novasEsc = [...escolhidas, item];
    setEscolhidas(novasEsc);
    setDisponiveis(disponiveis.filter((d) => d.idx !== item.idx));
    if (novasEsc.length === palavraAlvo.length) {
      const tentativa = novasEsc.map((c) => c.l).join("");
      const certo = tentativa === palavraAlvo;
      setResolvido(true);
      onResultado({ certo, palavraId: alvo.id });
    }
  }

  function devolver(item: { l: string; idx: number }, posicao: number) {
    if (resolvido) return;
    setEscolhidas(escolhidas.filter((_, i) => i !== posicao));
    setDisponiveis([...disponiveis, item]);
  }

  return (
    <div>
      <div className="text-center">
        <div className="text-sm text-ceu-700/80">Ordena as letras de:</div>
        <div className="mt-1 text-7xl">{alvo.emoji}</div>
        <div className="text-sm text-ceu-700/70 mt-1">{alvo.portugues}</div>
      </div>

      <div className="mt-4 min-h-[64px] flex flex-wrap justify-center gap-2">
        {escolhidas.map((c, i) => (
          <button
            key={`e-${c.idx}-${i}`}
            type="button"
            onClick={() => devolver(c, i)}
            className="min-w-[44px] h-12 px-3 rounded-2xl bg-menta-200 text-ceu-700 font-extrabold text-2xl shadow-chunky"
            aria-label={`Letra ${c.l}, remover`}
          >
            {c.l === "·" ? "␣" : c.l}
          </button>
        ))}
        {Array.from({
          length: Math.max(0, palavraAlvo.length - escolhidas.length),
        }).map((_, i) => (
          <span
            key={`v-${i}`}
            aria-hidden="true"
            className="min-w-[44px] h-12 rounded-2xl bg-ceu-50 border-2 border-dashed border-ceu-200"
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {disponiveis.map((c) => (
          <button
            key={`d-${c.idx}`}
            type="button"
            onClick={() => adicionar(c)}
            className="opcao min-w-[52px] h-14 px-3 text-2xl font-extrabold text-ceu-700"
            aria-label={`Adicionar letra ${c.l}`}
          >
            {c.l === "·" ? "␣" : c.l}
          </button>
        ))}
      </div>
    </div>
  );
}
