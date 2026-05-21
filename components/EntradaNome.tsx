"use client";

import { useEffect, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { carregarProgresso, guardarProgresso } from "@/lib/storage";

export function EntradaNome() {
  const [nome, setNome] = useState("");
  const [emEdicao, setEmEdicao] = useState(false);

  useEffect(() => {
    const p = carregarProgresso();
    setNome(p.nome);
    if (!p.nome) setEmEdicao(true);
  }, []);

  function gravar() {
    const limpo = nome.trim().slice(0, 20);
    guardarProgresso({ nome: limpo });
    setNome(limpo);
    setEmEdicao(false);
  }

  if (emEdicao) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          gravar();
        }}
        className="flex gap-2 items-center"
      >
        <label htmlFor="nome" className="sr-only">
          O teu nome
        </label>
        <input
          id="nome"
          autoFocus
          maxLength={20}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="O teu nome"
          className="flex-1 min-h-[56px] text-xl font-bold px-4 rounded-2xl bg-white border-4 border-ceu-200 focus:border-ceu-400 outline-none shadow-chunky"
        />
        <button
          type="submit"
          aria-label="Guardar nome"
          className="btn-grande bg-menta-400 text-white !min-h-[56px] !px-4"
        >
          <Check className="w-6 h-6" />
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-xl sm:text-2xl font-extrabold text-ceu-700">
        Olá, <span className="text-coral-500">{nome || "amigo"}</span>! 👋
      </p>
      <button
        type="button"
        onClick={() => setEmEdicao(true)}
        aria-label="Editar nome"
        className="btn-grande bg-white text-ceu-700 !min-h-[40px] !px-2 !text-base"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}
