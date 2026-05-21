"use client";

interface Props {
  atual: number;
  total: number;
}

export function BarraProgresso({ atual, total }: Props) {
  const pct = Math.min(100, Math.round((atual / total) * 100));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={atual}
      aria-label={`Pergunta ${atual} de ${total}`}
      className="h-3 w-full bg-white rounded-full overflow-hidden border-2 border-white shadow-inner"
    >
      <div
        className="h-full bg-gradient-to-r from-menta-400 to-ceu-400 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
