"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import clsx from "clsx";
import {
  escolherDistractores,
  escolherPalavrasRonda,
} from "@/lib/selection";
import { baralhar } from "@/lib/random";
import { falarIngles } from "@/lib/speech";
import { tocarAcerto, tocarErro, tocarVitoria } from "@/lib/sounds";
import {
  adicionarPontos,
  incrementarRondas,
  registarAcerto,
  registarErro,
} from "@/lib/storage";
import type { Nivel, Palavra } from "@/data/vocabulary";
import type { IdMiniJogo } from "@/data/minigames";

interface Props {
  id: IdMiniJogo;
  nivel: Nivel;
  onFim: (pontos: number) => void;
}

export function MiniJogo({ id, nivel, onFim }: Props) {
  const palavras = useMemo(() => escolherPalavrasRonda(nivel, 8), [nivel]);

  if (id === "balao") return <Balao palavras={palavras} nivel={nivel} onFim={onFim} />;
  if (id === "caca") return <Caca palavras={palavras} onFim={onFim} />;
  if (id === "labirinto") return <Labirinto palavras={palavras} nivel={nivel} onFim={onFim} />;
  if (id === "memoria") return <Memoria palavras={palavras.slice(0, 6)} onFim={onFim} />;
  if (id === "roda") return <Roda palavras={palavras} nivel={nivel} onFim={onFim} />;
  return <Velocidade nivel={nivel} onFim={onFim} />;
}

// ═════════════════════════════════════════════════════════════════
// 1) BALÃO — toca no balão com a palavra certa antes que voe.
// ═════════════════════════════════════════════════════════════════
function Balao({
  palavras,
  nivel,
  onFim,
}: {
  palavras: Palavra[];
  nivel: Nivel;
  onFim: (pontos: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [pontos, setPontos] = useState(0);
  const alvo = palavras[idx];
  const opcoes = useMemo(
    () => alvo ? baralhar([alvo, ...escolherDistractores(alvo, 3, nivel)]) : [],
    [alvo, nivel]
  );

  if (!alvo) {
    onFim(pontos);
    return null;
  }

  function escolher(p: Palavra) {
    const certo = p.id === alvo.id;
    if (certo) {
      tocarAcerto();
      setPontos((x) => x + 15);
      adicionarPontos(15);
      registarAcerto(alvo.id);
    } else {
      tocarErro();
      registarErro(alvo.id);
    }
    if (idx + 1 >= palavras.length) {
      window.setTimeout(() => {
        tocarVitoria();
        onFim(pontos + (certo ? 15 : 0));
      }, 400);
    } else {
      window.setTimeout(() => setIdx(idx + 1), 500);
    }
  }

  return (
    <div className="text-center">
      <p className="text-ceu-700/80">Toca no balão com a imagem de:</p>
      <div className="mt-1 flex items-center justify-center gap-2">
        <h2 className="text-4xl font-black text-coral-500">{alvo.ingles}</h2>
        <button
          type="button"
          aria-label="Ouvir"
          onClick={() => falarIngles(alvo.ingles)}
          className="btn-grande bg-sol-200 text-ceu-700 !min-h-[44px] !px-3"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-6 relative h-72">
        {opcoes.map((p, i) => (
          <motion.button
            key={`${idx}-${p.id}`}
            type="button"
            onClick={() => escolher(p)}
            initial={{ y: 320, x: 0 }}
            animate={{ y: -340 }}
            transition={{ duration: 6 + i, ease: "linear" }}
            className="absolute bottom-0 opcao !p-0 !bg-transparent !shadow-none"
            style={{ left: `${10 + i * 22}%` }}
            aria-label={p.portugues}
          >
            <div className="relative">
              <div className="text-7xl">🎈</div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                {p.emoji}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 2) CAÇA À PALAVRA — encontra a palavra entre vários distratores.
// ═════════════════════════════════════════════════════════════════
function Caca({
  palavras,
  onFim,
}: {
  palavras: Palavra[];
  onFim: (pontos: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [pontos, setPontos] = useState(0);
  const alvo = palavras[idx];

  const grelha = useMemo(() => {
    if (!alvo) return [];
    const items: Palavra[] = baralhar([alvo, ...palavras.filter((p) => p.id !== alvo.id).slice(0, 11)]);
    return items;
  }, [alvo, palavras]);

  if (!alvo) {
    onFim(pontos);
    return null;
  }

  function escolher(p: Palavra) {
    const certo = p.id === alvo.id;
    if (certo) {
      tocarAcerto();
      setPontos((x) => x + 12);
      adicionarPontos(12);
      registarAcerto(alvo.id);
    } else {
      tocarErro();
      registarErro(alvo.id);
    }
    if (idx + 1 >= 4) {
      window.setTimeout(() => onFim(pontos + (certo ? 12 : 0)), 400);
    } else {
      window.setTimeout(() => setIdx(idx + 1), 450);
    }
  }

  return (
    <div>
      <p className="text-center text-ceu-700/80">
        Procura na grelha a imagem de:
      </p>
      <h2 className="mt-1 text-3xl font-black text-coral-500 text-center">
        {alvo.ingles}
      </h2>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {grelha.map((p, i) => (
          <button
            key={`${idx}-${p.id}-${i}`}
            type="button"
            onClick={() => escolher(p)}
            className="opcao aspect-square text-4xl flex items-center justify-center"
            aria-label={p.portugues}
          >
            {p.emoji}
          </button>
        ))}
      </div>
      <p className="text-center mt-2 text-sm text-ceu-700/70">
        {idx + 1} / 4
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 3) LABIRINTO — escolhe o caminho certo (palavra certa) por níveis.
// ═════════════════════════════════════════════════════════════════
function Labirinto({
  palavras,
  nivel,
  onFim,
}: {
  palavras: Palavra[];
  nivel: Nivel;
  onFim: (pontos: number) => void;
}) {
  const [andar, setAndar] = useState(0);
  const [pontos, setPontos] = useState(0);
  const total = 4;
  const alvo = palavras[andar];

  const opcoes = useMemo(
    () =>
      alvo ? baralhar([alvo, ...escolherDistractores(alvo, 2, nivel)]) : [],
    [alvo, nivel]
  );

  if (!alvo || andar >= total) {
    onFim(pontos);
    return null;
  }

  function escolher(p: Palavra) {
    const certo = p.id === alvo.id;
    if (certo) {
      tocarAcerto();
      setPontos((x) => x + 14);
      adicionarPontos(14);
      registarAcerto(alvo.id);
      window.setTimeout(() => setAndar(andar + 1), 400);
    } else {
      tocarErro();
      registarErro(alvo.id);
      window.setTimeout(() => setAndar(andar + 1), 600);
    }
  }

  return (
    <div className="text-center">
      <p className="text-ceu-700/80">Escolhe a porta certa! Andar {andar + 1} de {total}</p>
      <div className="mt-2 text-5xl">🌀</div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <h2 className="text-3xl font-black text-coral-500">{alvo.ingles}</h2>
        <button
          type="button"
          aria-label="Ouvir"
          onClick={() => falarIngles(alvo.ingles)}
          className="btn-grande bg-sol-200 text-ceu-700 !min-h-[44px] !px-3"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {opcoes.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => escolher(p)}
            className="opcao aspect-[2/3] text-6xl flex flex-col items-center justify-end pb-3 bg-coral-100"
            aria-label={p.portugues}
          >
            <div className="text-4xl">🚪</div>
            <div>{p.emoji}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 4) MEMÓRIA — encontra todos os pares
// ═════════════════════════════════════════════════════════════════
function Memoria({
  palavras,
  onFim,
}: {
  palavras: Palavra[];
  onFim: (pontos: number) => void;
}) {
  type Carta = { uid: string; rotulo: string; tipo: "img" | "txt"; idAlvo: string };
  const cartas = useMemo<Carta[]>(
    () =>
      baralhar(
        palavras.flatMap<Carta>((p) => [
          { uid: `${p.id}-i`, rotulo: p.emoji, tipo: "img", idAlvo: p.id },
          { uid: `${p.id}-t`, rotulo: p.ingles, tipo: "txt", idAlvo: p.id },
        ])
      ),
    [palavras]
  );
  const [virada, setVirada] = useState<Carta | null>(null);
  const [fechadas, setFechadas] = useState<Set<string>>(new Set());
  const [esperando, setEsperando] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [tentativasErradas, setTentativasErradas] = useState<string | null>(null);

  useEffect(() => {
    if (fechadas.size === palavras.length) {
      window.setTimeout(() => onFim(pontos + 20), 500);
    }
  }, [fechadas, palavras.length, pontos, onFim]);

  function clicar(c: Carta) {
    if (esperando) return;
    if (fechadas.has(c.idAlvo)) return;
    if (!virada) {
      setVirada(c);
      return;
    }
    if (virada.uid === c.uid) return;
    if (virada.idAlvo === c.idAlvo && virada.tipo !== c.tipo) {
      tocarAcerto();
      const novo = new Set(fechadas);
      novo.add(c.idAlvo);
      setFechadas(novo);
      setVirada(null);
      setPontos((x) => x + 10);
      adicionarPontos(10);
    } else {
      tocarErro();
      setTentativasErradas(c.uid);
      setEsperando(true);
      window.setTimeout(() => {
        setVirada(null);
        setTentativasErradas(null);
        setEsperando(false);
      }, 700);
    }
  }

  return (
    <div>
      <p className="text-center text-ceu-700/80">
        Encontra os pares imagem-palavra:
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {cartas.map((c) => {
          const aberta = virada?.uid === c.uid || fechadas.has(c.idAlvo);
          const errada = tentativasErradas === c.uid;
          return (
            <button
              key={c.uid}
              type="button"
              onClick={() => clicar(c)}
              className={clsx(
                "opcao aspect-square text-2xl flex items-center justify-center text-ceu-700 font-extrabold",
                fechadas.has(c.idAlvo) && "opcao-correta",
                errada && "opcao-errada",
                !aberta && "bg-ceu-300 text-white"
              )}
              aria-label={aberta ? c.rotulo : "Carta fechada"}
            >
              {aberta ? (c.tipo === "img" ? <span className="text-4xl">{c.rotulo}</span> : c.rotulo) : "❔"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 5) RODA — gira a roda, sai uma palavra, responde rapidamente.
// ═════════════════════════════════════════════════════════════════
function Roda({
  palavras,
  nivel,
  onFim,
}: {
  palavras: Palavra[];
  nivel: Nivel;
  onFim: (pontos: number) => void;
}) {
  const [estado, setEstado] = useState<"pronto" | "a-girar" | "responder">("pronto");
  const [alvo, setAlvo] = useState<Palavra | null>(null);
  const [pontos, setPontos] = useState(0);
  const [voltas, setVoltas] = useState(0);

  const opcoes = useMemo(
    () => (alvo ? baralhar([alvo, ...escolherDistractores(alvo, 2, nivel)]) : []),
    [alvo, nivel]
  );

  function girar() {
    setEstado("a-girar");
    const p = palavras[Math.floor(Math.random() * palavras.length)];
    window.setTimeout(() => {
      setAlvo(p);
      setEstado("responder");
    }, 1200);
  }

  function escolher(p: Palavra) {
    if (!alvo) return;
    const certo = p.id === alvo.id;
    if (certo) {
      tocarAcerto();
      setPontos((x) => x + 12);
      adicionarPontos(12);
      registarAcerto(alvo.id);
    } else {
      tocarErro();
      registarErro(alvo.id);
    }
    const novasVoltas = voltas + 1;
    setVoltas(novasVoltas);
    if (novasVoltas >= 3) {
      window.setTimeout(() => onFim(pontos + (certo ? 12 : 0)), 400);
    } else {
      window.setTimeout(() => {
        setEstado("pronto");
        setAlvo(null);
      }, 600);
    }
  }

  return (
    <div className="text-center">
      <p className="text-ceu-700/80">Roda da sorte — volta {voltas + 1} de 3</p>

      <motion.div
        className="text-9xl mt-3 inline-block"
        animate={estado === "a-girar" ? { rotate: 720 } : { rotate: 0 }}
        transition={{ duration: 1.2 }}
      >
        🎡
      </motion.div>

      {estado === "pronto" && (
        <button
          type="button"
          onClick={girar}
          className="block mx-auto mt-3 btn-grande bg-coral-300 text-white"
        >
          Girar!
        </button>
      )}

      {estado === "responder" && alvo && (
        <div className="mt-3">
          <div className="text-2xl">Saiu:</div>
          <div className="text-5xl">{alvo.emoji}</div>
          <div className="mt-3 grid gap-2">
            {opcoes.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => escolher(p)}
                className="opcao min-h-[64px] text-2xl font-extrabold text-ceu-700"
              >
                {p.ingles}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 6) VELOCIDADE — quantas certas em 30 segundos.
// ═════════════════════════════════════════════════════════════════
function Velocidade({
  nivel,
  onFim,
}: {
  nivel: Nivel;
  onFim: (pontos: number) => void;
}) {
  const [tempo, setTempo] = useState(30);
  const [pontos, setPontos] = useState(0);
  const [palavra, setPalavra] = useState<Palavra | null>(null);
  const acabou = useRef(false);

  function proxima() {
    const lista = escolherPalavrasRonda(nivel, 1);
    if (lista[0]) setPalavra(lista[0]);
  }

  useEffect(() => {
    proxima();
    const t = window.setInterval(() => {
      setTempo((x) => {
        if (x <= 1) {
          window.clearInterval(t);
          if (!acabou.current) {
            acabou.current = true;
            window.setTimeout(() => onFim(pontos), 50);
          }
          return 0;
        }
        return x - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opcoes = useMemo(
    () =>
      palavra
        ? baralhar([palavra, ...escolherDistractores(palavra, 2, nivel)])
        : [],
    [palavra, nivel]
  );

  function escolher(p: Palavra) {
    if (!palavra || tempo <= 0) return;
    const certo = p.id === palavra.id;
    if (certo) {
      tocarAcerto();
      setPontos((x) => x + 5);
      adicionarPontos(5);
      registarAcerto(palavra.id);
    } else {
      tocarErro();
      registarErro(palavra.id);
    }
    proxima();
  }

  return (
    <div className="text-center">
      <div className="flex justify-between items-center px-2">
        <div className="font-extrabold text-ceu-700">⏱️ {tempo}s</div>
        <div className="font-extrabold text-coral-500">⭐ {pontos}</div>
      </div>
      {palavra && (
        <>
          <div className="mt-3 text-2xl text-ceu-700">Qual é a palavra?</div>
          <div className="text-8xl mt-1">{palavra.emoji}</div>
          <div className="mt-4 grid gap-2">
            {opcoes.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => escolher(p)}
                className="opcao min-h-[64px] text-2xl font-extrabold text-ceu-700"
                disabled={tempo === 0}
              >
                {p.ingles}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Função auxiliar para incrementar rondas após mini-jogo (chamada de fora)
export function finalizarMiniJogo(): void {
  incrementarRondas();
}
