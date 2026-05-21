"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Volume2 } from "lucide-react";
import {
  escolherDistractores,
  escolherFrasesRonda,
  escolherPalavrasRonda,
} from "@/lib/selection";
import type { Nivel, Palavra } from "@/data/vocabulary";
import type { Frase } from "@/data/sentences";
import { baralhar } from "@/lib/random";
import { falarIngles } from "@/lib/speech";
import {
  QuadroJogo,
  type PerguntaResultado,
} from "@/components/QuadroJogo";

type Pergunta =
  | {
      tipo: "palavra";
      alvo: Palavra;
      opcoes: Palavra[];
    }
  | {
      tipo: "frase";
      frase: Frase;
      opcoes: string[];
    };

const VARIANTES = ["ouve-palavra", "ouve-imagem", "ouve-frase"];

function gerarPerguntas(nivel: Nivel, n: number): Pergunta[] {
  // Mistura algumas perguntas de frase com palavras para enriquecer.
  const palavras = escolherPalavrasRonda(nivel, n);
  return palavras.map((alvo): Pergunta => {
    const dist = escolherDistractores(alvo, 2, nivel);
    return {
      tipo: "palavra",
      alvo,
      opcoes: baralhar([alvo, ...dist]),
    };
  });
}

function gerarPerguntasFrase(nivel: Nivel, n: number): Pergunta[] {
  const fs = escolherFrasesRonda(nivel, n);
  return fs.map((f): Pergunta => {
    const traducoesErradas = baralhar([
      "O cão está a correr.",
      "O sol é grande.",
      "Eu gosto de bolo.",
      "Tenho uma camisa azul.",
      "Hoje está calor.",
      "A minha avó é alta.",
      "Eu como uma maçã.",
    ]).slice(0, 2);
    return {
      tipo: "frase",
      frase: f,
      opcoes: baralhar([f.traducao, ...traducoesErradas]),
    };
  });
}

export default function Jogo2() {
  return (
    <QuadroJogo<Pergunta>
      config={{
        idJogo: "jogo2",
        titulo: "Ouvir & Escolher",
        variantes: VARIANTES,
        gerarPerguntas: (nivel, n) => {
          // se a variante actual exigir frases, recolhemos frases;
          // o QuadroJogo só conhece a variante depois — por isso geramos
          // ambos: o renderPergunta usa o "tipo" da pergunta para decidir.
          // Para simplificar, geramos misto: 1 frase entre cada 3 palavras.
          const mix: Pergunta[] = [];
          const pals = escolherPalavrasRonda(nivel, n);
          const fs = escolherFrasesRonda(nivel, Math.max(1, Math.floor(n / 3)));
          let pi = 0;
          let fi = 0;
          for (let i = 0; i < n; i++) {
            if ((i + 1) % 3 === 0 && fi < fs.length) {
              const f = fs[fi++];
              const traducoesErradas = baralhar([
                "O cão está a correr.",
                "O sol é grande.",
                "Eu gosto de bolo.",
                "Tenho uma camisa azul.",
                "Hoje está calor.",
                "A minha avó é alta.",
                "Eu como uma maçã.",
                "A escola é divertida.",
              ]).slice(0, 2);
              mix.push({
                tipo: "frase",
                frase: f,
                opcoes: baralhar([f.traducao, ...traducoesErradas]),
              });
            } else if (pi < pals.length) {
              const p = pals[pi++];
              const dist = escolherDistractores(p, 2, nivel);
              mix.push({ tipo: "palavra", alvo: p, opcoes: baralhar([p, ...dist]) });
            }
          }
          return mix;
        },
        temasDe: (ps) =>
          ps
            .map((p) => (p.tipo === "palavra" ? p.alvo.tema : null))
            .filter((t): t is Palavra["tema"] => !!t),
        renderPergunta: (p, variante, onR) => (
          <RenderJogo2 pergunta={p} variante={variante} onResultado={onR} />
        ),
      }}
    />
  );
}

function RenderJogo2({
  pergunta,
  variante,
  onResultado,
}: {
  pergunta: Pergunta;
  variante: string;
  onResultado: (r: PerguntaResultado) => void;
}) {
  // Reproduz automaticamente o som ao entrar.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (pergunta.tipo === "palavra") falarIngles(pergunta.alvo.ingles, 0.85);
      else falarIngles(pergunta.frase.template.replace("___", pergunta.frase.correta), 0.85);
    }, 250);
    return () => window.clearTimeout(t);
  }, [pergunta]);

  if (pergunta.tipo === "frase")
    return <ModoOuveFrase pergunta={pergunta} onResultado={onResultado} />;
  if (variante === "ouve-imagem")
    return <ModoOuveImagem pergunta={pergunta} onResultado={onResultado} />;
  return <ModoOuvePalavra pergunta={pergunta} onResultado={onResultado} />;
}

// ─── Botão grande de altifalante ──────────────────────────────────
function BotaoAltifalante({ texto, label }: { texto: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => falarIngles(texto, 0.85)}
      aria-label={label}
      className="btn-grande bg-sol-300 text-ceu-700 !min-h-[96px] !px-8 !text-3xl"
    >
      <Volume2 className="w-10 h-10" />
      Ouvir
    </button>
  );
}

// ─── Variante 1: ouve e escolhe palavra escrita ───────────────────
function ModoOuvePalavra({
  pergunta,
  onResultado,
}: {
  pergunta: Extract<Pergunta, { tipo: "palavra" }>;
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
      <div className="flex flex-col items-center gap-3">
        <p className="text-ceu-700/80">Carrega no altifalante e escolhe a palavra:</p>
        <BotaoAltifalante texto={alvo.ingles} label={`Ouvir palavra`} />
      </div>
      <div className="mt-5 grid gap-3">
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

// ─── Variante 2: ouve e escolhe imagem ────────────────────────────
function ModoOuveImagem({
  pergunta,
  onResultado,
}: {
  pergunta: Extract<Pergunta, { tipo: "palavra" }>;
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
      <div className="flex flex-col items-center gap-3">
        <p className="text-ceu-700/80">Ouve e toca na imagem certa:</p>
        <BotaoAltifalante texto={alvo.ingles} label="Ouvir palavra" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
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
              <span className="text-6xl sm:text-7xl">{p.emoji}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Variante 3: ouve a frase e escolhe a tradução ────────────────
function ModoOuveFrase({
  pergunta,
  onResultado,
}: {
  pergunta: Extract<Pergunta, { tipo: "frase" }>;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const [escolha, setEscolha] = useState<string | null>(null);
  const { frase, opcoes } = pergunta;
  const completa = frase.template.replace("___", frase.correta);

  function escolher(s: string) {
    if (escolha) return;
    setEscolha(s);
    onResultado({ certo: s === frase.traducao });
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-ceu-700/80">
          Ouve a frase em inglês e escolhe a tradução:
        </p>
        <BotaoAltifalante texto={completa} label="Ouvir frase" />
      </div>
      <div className="mt-5 grid gap-3">
        {opcoes.map((s) => {
          const escolhido = escolha === s;
          const certo = s === frase.traducao;
          return (
            <button
              key={s}
              type="button"
              onClick={() => escolher(s)}
              className={clsx(
                "opcao min-h-[72px] text-lg sm:text-xl font-bold text-ceu-700 px-4 text-left",
                escolhido && certo && "opcao-correta",
                escolhido && !certo && "opcao-errada"
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
