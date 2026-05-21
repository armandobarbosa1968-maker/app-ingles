"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Volume2 } from "lucide-react";
import { escolherFrasesRonda } from "@/lib/selection";
import type { Nivel } from "@/data/vocabulary";
import type { Frase } from "@/data/sentences";
import { baralhar } from "@/lib/random";
import { falarIngles } from "@/lib/speech";
import {
  QuadroJogo,
  type PerguntaResultado,
} from "@/components/QuadroJogo";

interface Pergunta {
  frase: Frase;
  opcoes: string[];
  /** Para o modo "verdadeiro ou falso". */
  vfTexto: string;
  vfCerto: boolean;
}

const VARIANTES = ["lacuna", "ordena", "verdadeiro-falso"];

function gerarPerguntas(nivel: Nivel, n: number): Pergunta[] {
  const fs = escolherFrasesRonda(nivel, n);
  return fs.map((f) => {
    const opcoes = baralhar([f.correta, ...f.distractores]);
    // V/F: em metade dos casos mostramos a frase certa, na outra metade
    // trocamos a palavra correta por um distractor para gerar uma frase falsa.
    const vfCerto = Math.random() < 0.5;
    const palavra = vfCerto
      ? f.correta
      : f.distractores[Math.floor(Math.random() * f.distractores.length)];
    const vfTexto = f.template.replace("___", palavra);
    return { frase: f, opcoes, vfTexto, vfCerto };
  });
}

export default function Jogo3() {
  return (
    <QuadroJogo<Pergunta>
      config={{
        idJogo: "jogo3",
        titulo: "Completar Frases",
        variantes: VARIANTES,
        gerarPerguntas,
        temasDe: () => [],
        renderPergunta: (p, variante, onR) => (
          <RenderJogo3 pergunta={p} variante={variante} onResultado={onR} />
        ),
      }}
    />
  );
}

function RenderJogo3({
  pergunta,
  variante,
  onResultado,
}: {
  pergunta: Pergunta;
  variante: string;
  onResultado: (r: PerguntaResultado) => void;
}) {
  if (variante === "ordena")
    return <ModoOrdena pergunta={pergunta} onResultado={onResultado} />;
  if (variante === "verdadeiro-falso")
    return <ModoVF pergunta={pergunta} onResultado={onResultado} />;
  return <ModoLacuna pergunta={pergunta} onResultado={onResultado} />;
}

// ─── Variante 1: preencher a lacuna ───────────────────────────────
function ModoLacuna({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const { frase, opcoes } = pergunta;
  const [escolha, setEscolha] = useState<string | null>(null);
  const partes = useMemo(() => frase.template.split("___"), [frase]);

  function escolher(p: string) {
    if (escolha) return;
    setEscolha(p);
    const certo = p === frase.correta;
    if (certo) {
      // após acertar, lê a frase completa
      window.setTimeout(
        () => falarIngles(frase.template.replace("___", frase.correta), 0.85),
        250
      );
    }
    onResultado({ certo });
  }

  return (
    <div>
      <p className="text-ceu-700/80 text-center">Completa a frase:</p>
      <div className="mt-3 cartao !shadow-none bg-ceu-50 border-ceu-100 text-center">
        <p className="text-2xl sm:text-3xl font-extrabold text-ceu-700 leading-snug">
          {partes[0]}
          <span
            className={clsx(
              "inline-block min-w-[100px] mx-1 px-2 rounded-xl border-b-4",
              escolha
                ? escolha === frase.correta
                  ? "bg-menta-200 border-menta-400"
                  : "bg-coral-100 border-coral-400"
                : "bg-white border-ceu-300"
            )}
          >
            {escolha ?? "___"}
          </span>
          {partes[1]}
        </p>
        <p className="text-sm text-ceu-700/70 mt-2">{frase.traducao}</p>
      </div>

      <div className="mt-5 grid gap-3">
        {opcoes.map((p) => {
          const escolhido = escolha === p;
          const certo = p === frase.correta;
          return (
            <button
              key={p}
              type="button"
              onClick={() => escolher(p)}
              className={clsx(
                "opcao min-h-[72px] text-2xl font-extrabold text-ceu-700",
                escolhido && certo && "opcao-correta",
                escolhido && !certo && "opcao-errada"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Variante 2: ordenar palavras ─────────────────────────────────
function ModoOrdena({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const { frase } = pergunta;
  const fraseCompleta = useMemo(
    () => frase.template.replace("___", frase.correta),
    [frase]
  );
  const palavras = useMemo(
    () =>
      fraseCompleta
        .replace(/[.!?]/g, "")
        .split(" ")
        .filter(Boolean),
    [fraseCompleta]
  );

  const [disponiveis, setDisponiveis] = useState<
    { p: string; idx: number }[]
  >(() => baralhar(palavras.map((p, idx) => ({ p, idx }))));
  const [escolhidas, setEscolhidas] = useState<{ p: string; idx: number }[]>([]);
  const [resolvido, setResolvido] = useState(false);

  function adicionar(item: { p: string; idx: number }) {
    if (resolvido) return;
    const novas = [...escolhidas, item];
    setEscolhidas(novas);
    setDisponiveis(disponiveis.filter((d) => d.idx !== item.idx));
    if (novas.length === palavras.length) {
      const tentativa = novas.map((c) => c.p).join(" ");
      const alvo = palavras.join(" ");
      const certo = tentativa === alvo;
      setResolvido(true);
      if (certo) {
        window.setTimeout(() => falarIngles(fraseCompleta, 0.85), 250);
      }
      onResultado({ certo });
    }
  }

  function remover(i: number) {
    if (resolvido) return;
    setDisponiveis([...disponiveis, escolhidas[i]]);
    setEscolhidas(escolhidas.filter((_, j) => j !== i));
  }

  return (
    <div>
      <p className="text-ceu-700/80 text-center">
        Ordena as palavras para formar a frase:
      </p>
      <p className="text-center text-sm text-ceu-700/70 mt-1">
        {frase.traducao}
      </p>

      <div className="mt-4 min-h-[80px] cartao !shadow-none bg-ceu-50 border-ceu-100 flex flex-wrap gap-2">
        {escolhidas.length === 0 && (
          <span className="text-ceu-300 italic mx-auto self-center">
            Toca nas palavras abaixo
          </span>
        )}
        {escolhidas.map((c, i) => (
          <button
            key={`e-${c.idx}-${i}`}
            type="button"
            onClick={() => remover(i)}
            className="min-h-[44px] px-3 rounded-2xl bg-menta-200 text-ceu-700 font-extrabold text-lg shadow-chunky"
          >
            {c.p}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {disponiveis.map((c) => (
          <button
            key={`d-${c.idx}`}
            type="button"
            onClick={() => adicionar(c)}
            className="opcao min-h-[52px] px-4 text-lg font-extrabold text-ceu-700"
          >
            {c.p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Variante 3: verdadeiro ou falso ──────────────────────────────
function ModoVF({
  pergunta,
  onResultado,
}: {
  pergunta: Pergunta;
  onResultado: (r: PerguntaResultado) => void;
}) {
  const { vfTexto, vfCerto, frase } = pergunta;
  const [escolha, setEscolha] = useState<"v" | "f" | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => falarIngles(vfTexto, 0.85), 250);
    return () => window.clearTimeout(t);
  }, [vfTexto]);

  function escolher(v: boolean) {
    if (escolha) return;
    setEscolha(v ? "v" : "f");
    const certo = v === vfCerto;
    if (certo && !vfCerto) {
      // lê a versão correta após resposta certa "falso"
      window.setTimeout(
        () => falarIngles(frase.template.replace("___", frase.correta), 0.85),
        350
      );
    }
    onResultado({ certo });
  }

  return (
    <div>
      <p className="text-ceu-700/80 text-center">A frase faz sentido?</p>
      <div className="mt-3 cartao !shadow-none bg-ceu-50 border-ceu-100 text-center">
        <p className="text-2xl sm:text-3xl font-extrabold text-ceu-700">
          {vfTexto}
        </p>
        <button
          type="button"
          onClick={() => falarIngles(vfTexto, 0.85)}
          aria-label="Ouvir novamente"
          className="mt-2 btn-grande bg-sol-200 text-ceu-700 !min-h-[48px] !px-3 !text-base"
        >
          <Volume2 className="w-5 h-5" /> Ouvir
        </button>
        <p className="text-sm text-ceu-700/70 mt-2">{frase.traducao}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => escolher(true)}
          className={clsx(
            "opcao min-h-[96px] text-3xl font-extrabold bg-menta-200 text-menta-600",
            escolha === "v" && vfCerto && "opcao-correta",
            escolha === "v" && !vfCerto && "opcao-errada"
          )}
        >
          ✅ Verdadeiro
        </button>
        <button
          type="button"
          onClick={() => escolher(false)}
          className={clsx(
            "opcao min-h-[96px] text-3xl font-extrabold bg-coral-200 text-coral-500",
            escolha === "f" && !vfCerto && "opcao-correta",
            escolha === "f" && vfCerto && "opcao-errada"
          )}
        >
          ❌ Falso
        </button>
      </div>
    </div>
  );
}
