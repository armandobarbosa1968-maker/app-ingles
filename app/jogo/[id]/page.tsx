"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Jogo1 = dynamic(() => import("@/components/jogos/Jogo1"), {
  ssr: false,
});
const Jogo2 = dynamic(() => import("@/components/jogos/Jogo2"), {
  ssr: false,
});
const Jogo3 = dynamic(() => import("@/components/jogos/Jogo3"), {
  ssr: false,
});

export default function PaginaJogo() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <Suspense fallback={<div className="p-6 text-center">A carregar…</div>}>
      {id === "1" && <Jogo1 />}
      {id === "2" && <Jogo2 />}
      {id === "3" && <Jogo3 />}
      {!["1", "2", "3"].includes(id ?? "") && (
        <div className="p-6 text-center text-coral-500">
          Jogo não encontrado.
        </div>
      )}
    </Suspense>
  );
}
