import { carregarProgresso } from "./storage";

/**
 * Sons gerados pela Web Audio API — sem ficheiros binários.
 * Caso o programador queira usar .mp3 podem ser colocados em
 * /public/sounds/ e este módulo substituído por <audio> tags.
 */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  try {
    const Ctor =
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext ?? window.AudioContext;
    ctx = new Ctor();
    return ctx;
  } catch {
    return null;
  }
}

function envelope(
  c: AudioContext,
  freq: number,
  duracao: number,
  tipo: OscillatorType,
  ganhoMax: number,
  atraso = 0
): void {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = tipo;
  osc.frequency.value = freq;
  gain.gain.value = 0;
  gain.gain.linearRampToValueAtTime(ganhoMax, c.currentTime + atraso + 0.01);
  gain.gain.linearRampToValueAtTime(0.0001, c.currentTime + atraso + duracao);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime + atraso);
  osc.stop(c.currentTime + atraso + duracao + 0.02);
}

export function tocarAcerto(): void {
  if (carregarProgresso().silenciado) return;
  const c = audio();
  if (!c) return;
  envelope(c, 659.25, 0.12, "triangle", 0.18, 0); // E5
  envelope(c, 880, 0.18, "triangle", 0.18, 0.1); // A5
}

export function tocarErro(): void {
  if (carregarProgresso().silenciado) return;
  const c = audio();
  if (!c) return;
  envelope(c, 330, 0.18, "sine", 0.14, 0);
  envelope(c, 220, 0.22, "sine", 0.14, 0.12);
}

export function tocarVitoria(): void {
  if (carregarProgresso().silenciado) return;
  const c = audio();
  if (!c) return;
  envelope(c, 523.25, 0.12, "triangle", 0.2, 0); // C5
  envelope(c, 659.25, 0.12, "triangle", 0.2, 0.12); // E5
  envelope(c, 783.99, 0.12, "triangle", 0.2, 0.24); // G5
  envelope(c, 1046.5, 0.28, "triangle", 0.22, 0.36); // C6
}

export function tocarClick(): void {
  if (carregarProgresso().silenciado) return;
  const c = audio();
  if (!c) return;
  envelope(c, 600, 0.04, "square", 0.06, 0);
}
