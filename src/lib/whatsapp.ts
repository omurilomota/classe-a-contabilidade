import { getUnit, type UnitId } from "./site";

export type WhatsAppOptions = {
  unit?: UnitId;
  message: string;
  campaign: string;
  content: string;
};

/**
 * Monta o link do WhatsApp com a mensagem pré-preenchida e UTMs de campanha.
 * O número da unidade é configurado em src/lib/site.ts (placeholder de demonstração).
 */
export function buildWhatsAppUrl({ unit = "dracena", message, campaign, content }: WhatsAppOptions): string {
  const number = getUnit(unit).whatsapp;
  const params = new URLSearchParams({ text: message });
  params.set("utm_source", "site");
  params.set("utm_medium", "cta");
  params.set("utm_campaign", campaign);
  params.set("utm_content", content);
  return `https://wa.me/${number}?${params.toString()}`;
}


export const WA_MESSAGES = {
  general: "Olá! Vi o site da Classe A Contabilidade e quero falar com um contador em Junqueirópolis ou Dracena.",
  generalOpening:
    "Olá! Vi o site da Classe A e quero abrir minha empresa em Junqueirópolis ou Dracena. Pode me orientar?",
  generalDeadlines:
    "Olá! Vi o calendário de prazos no site da Classe A e quero receber os lembretes da minha empresa em Junqueirópolis ou Dracena.",
  generalSimulator:
    "Olá! Fiz o simulador de regime no site da Classe A e quero confirmar o melhor caminho para a minha empresa em Junqueirópolis ou Dracena.",
  home: (unit: UnitId) =>
    `Olá! Vi o site da Classe A Contabilidade e quero falar com um contador em ${getUnit(unit).city}.`,
  opening: (unit: UnitId) =>
    `Olá! Vi o site da Classe A e quero abrir minha empresa em ${getUnit(unit).city}.`,
  switching: (unit: UnitId) =>
    `Olá! Vi o site da Classe A e quero trocar de contabilidade em ${getUnit(unit).city}. Podemos conversar?`,
  unit: (unit: UnitId) =>
    `Olá! Vi a página da unidade de ${getUnit(unit).city} no site da Classe A e quero atendimento.`,
  deadlines: (unit: UnitId) =>
    `Olá! Vi o calendário de prazos no site da Classe A e quero receber os lembretes da minha empresa em ${getUnit(unit).city}.`,
  simulator: (unit: UnitId) =>
    `Olá! Fiz o simulador de regime no site da Classe A e quero confirmar o melhor caminho para a minha empresa em ${getUnit(unit).city}.`,
  institutional: () =>
    `Olá! Conheci a página institucional da Classe A Contabilidade no site e quero conversar com a equipe.`,
} as const;
