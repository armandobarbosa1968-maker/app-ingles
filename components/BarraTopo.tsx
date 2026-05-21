"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Volume2, VolumeX } from "lucide-react";
import {
  carregarProgresso,
  guardarProgresso,
  type Progresso,
} from "@/lib/storage";

interface Props {
  /** Mostrar botão de voltar ao início. */
  voltar?: boolean;
  titulo?: string;
}

export function BarraTopo({ voltar = true, titulo }: Props) {
  const [progresso, setProgresso] = useState<Progresso | null>(null);

  useEffect(() => {
    setProgresso(carregarProgresso());
    const f = () => setProgresso(carregarProgresso());
    window.addEventListener("progresso-atualizado", f);
    return () => window.removeEventListener("progresso-atualizado", f);
  }, []);

  function alternarSom() {
    if (!progresso) return;
    const novo = guardarProgresso({ silenciado: !progresso.silenciado });
    setProgresso(novo);
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b-2 border-white/60">
      <div className="mx-auto max-w-3xl px-3 py-2 flex items-center gap-2">
        {voltar ? (
          <Link
            href="/"
            aria-label="Voltar ao início"
            className="btn-grande !min-h-[48px] !px-3 !py-2 !text-base bg-white text-ceu-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Início</span>
          </Link>
        ) : (
          <div className="w-2" />
        )}

        {titulo && (
          <h1 className="flex-1 text-center font-extrabold text-lg sm:text-xl text-ceu-700 truncate">
            {titulo}
          </h1>
        )}
        {!titulo && <div className="flex-1" />}

        <div
          className="btn-grande !min-h-[48px] !px-3 !py-2 !text-base bg-sol-200 text-ceu-700 cursor-default"
          aria-label={`${progresso?.pontos ?? 0} pontos`}
        >
          <Star className="w-5 h-5 fill-current" />
          <span>{progresso?.pontos ?? 0}</span>
        </div>

        <button
          type="button"
          onClick={alternarSom}
          aria-label={progresso?.silenciado ? "Ativar som" : "Silenciar"}
          aria-pressed={progresso?.silenciado ?? false}
          className="btn-grande !min-h-[48px] !px-3 !py-2 !text-base bg-white text-ceu-700"
        >
          {progresso?.silenciado ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
}
