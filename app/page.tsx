"use client";

import { useEffect, useState } from "react";
import { BarraTopo } from "@/components/BarraTopo";
import { EntradaNome } from "@/components/EntradaNome";
import { Mascote } from "@/components/Mascote";
import { CartaoJogo } from "@/components/CartaoJogo";
import { SeletorNivel } from "@/components/SeletorNivel";
import { DesafioDoDia } from "@/components/DesafioDoDia";
import { Coleccao } from "@/components/Coleccao";
import { carregarProgresso, guardarProgresso } from "@/lib/storage";
import { mascoteAtual } from "@/data/rewards";
import type { Nivel } from "@/data/vocabulary";

export default function PaginaInicial() {
  const [nivel, setNivel] = useState<Nivel>(1);
  const [emoji, setEmoji] = useState("🐶");

  useEffect(() => {
    const p = carregarProgresso();
    setNivel(p.ultimoNivel ?? 1);
    setEmoji(mascoteAtual(p.pontos).emoji);
    const f = () => setEmoji(mascoteAtual(carregarProgresso().pontos).emoji);
    window.addEventListener("progresso-atualizado", f);
    return () => window.removeEventListener("progresso-atualizado", f);
  }, []);

  function escolherNivel(n: Nivel) {
    setNivel(n);
    guardarProgresso({ ultimoNivel: n });
  }

  return (
    <>
      <BarraTopo voltar={false} titulo="Inglês a Brincar" />
      <main className="mx-auto max-w-3xl px-3 pb-10 pt-4">
        <section className="text-center cartao">
          <Mascote emoji={emoji} tamanho="xl" />
          <div className="mt-2">
            <EntradaNome />
          </div>
          <p className="mt-2 text-ceu-700/80">
            Escolhe um jogo e diverte-te a aprender inglês!
          </p>
        </section>

        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-ceu-700 mb-2 px-1">
            Nível
          </h2>
          <SeletorNivel valor={nivel} onChange={escolherNivel} />
        </section>

        <section className="mt-5">
          <DesafioDoDia nivel={nivel} />
        </section>

        <section className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CartaoJogo
            href={`/jogo/1?nivel=${nivel}`}
            emoji="🖼️"
            titulo="Imagem & Palavra"
            descricao="Toca na imagem certa!"
            cor="ceu"
            delay={0}
          />
          <CartaoJogo
            href={`/jogo/2?nivel=${nivel}`}
            emoji="🔊"
            titulo="Ouvir & Escolher"
            descricao="Ouve a palavra e escolhe!"
            cor="sol"
            delay={0.1}
          />
          <CartaoJogo
            href={`/jogo/3?nivel=${nivel}`}
            emoji="📝"
            titulo="Completar Frases"
            descricao="Acaba a frase em inglês!"
            cor="menta"
            delay={0.2}
          />
        </section>

        <section className="mt-5">
          <Coleccao />
        </section>

        <footer className="mt-8 text-center text-xs text-ceu-700/60">
          Feito com 💙 para o 1.º ciclo · Aprendizagens Essenciais de Inglês
        </footer>
      </main>
    </>
  );
}
