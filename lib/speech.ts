import { carregarProgresso } from "./storage";

let vozEN: SpeechSynthesisVoice | null = null;

function escolherVoz(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (vozEN) return vozEN;
  const vozes = window.speechSynthesis.getVoices();
  vozEN =
    vozes.find((v) => v.lang === "en-GB") ||
    vozes.find((v) => v.lang.startsWith("en-GB")) ||
    vozes.find((v) => v.lang.startsWith("en")) ||
    null;
  return vozEN;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    vozEN = null;
    escolherVoz();
  };
}

export function falarIngles(texto: string, taxa = 0.9): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (carregarProgresso().silenciado) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "en-GB";
    u.rate = taxa;
    u.pitch = 1;
    const voz = escolherVoz();
    if (voz) u.voice = voz;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignorar erros */
  }
}
