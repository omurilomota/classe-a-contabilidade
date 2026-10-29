/**
 * Fonte única de verdade do site.
 *
 * Demonstração pública: telefone, WhatsApp, e-mail, endereço, CNPJ e redes
 * sociais são fictícios. Substitua todos os dados antes de usar com um cliente.
 */

export const SITE = {
  name: "Classe A Contabilidade",
  shortName: "Classe A",
  legalName: "Classe A Contabilidade",
  tagline: "Você cuida do negócio, a gente cuida dos números.",
  description:
    "Contabilidade, abertura de empresa e troca de contabilidade em Junqueirópolis/SP e Dracena/SP. Atendimento humano, sem juridiquês.",
  url: "https://classe-a-contabilidade.vercel.app",
  domain: "classe-a-contabilidade.vercel.app",
  cnpj: "00.000.000/0001-00",
  email: "contato@exemplo.com.br",
  foundedLabel: "Desde 2013",
  expansionYear: 2023,
  yearsInMarket: 13,
  region: "Alta Paulista",
  cities: ["Junqueirópolis/SP", "Dracena/SP"],
  instagram: {
    handle: "@exemplo.demo",
    url: "https://www.instagram.com/exemplo.demo",
  },
  facebook: {
    name: "Classe A Contabilidade | Demonstração",
    url: "https://www.facebook.com/exemplo.demo",
  },
} as const;

export type UnitId = "junqueiropolis" | "dracena";

export type Unit = {
  id: UnitId;
  city: string;
  state: string;
  label: string;
  name: string;
  address: string;
  addressLines: string[];
  addressConfirmed: boolean;
  mapsQuery: string;
  mapsEmbed: string;
  mapsNote?: string;
  /** PLACEHOLDER — substituir pelo WhatsApp real da unidade. */
  whatsapp: string;
  phoneLabel: string;
  hours: string;
  hoursConfirmed: boolean;
  email: string;
  highlight: string;
  description: string;
  localKeywords: string[];
  image: string;
  imageAlt: string;
};

export const UNITS: Unit[] = [
  {
    id: "junqueiropolis",
    city: "Junqueirópolis",
    state: "SP",
    label: "Junqueirópolis/SP",
    name: "Classe A Contabilidade — Unidade Junqueirópolis",
    address: "Rua das Acácias, 120 — Centro, Junqueirópolis/SP",
    addressLines: ["Rua das Acácias, 120 — Centro", "Junqueirópolis — SP"],
    addressConfirmed: true,
    mapsQuery: "Junqueirópolis, SP",
    mapsEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=-51.4550%2C-21.5300%2C-51.4100%2C-21.4950&layer=mapnik&marker=-21.5145%2C-51.4336",
    mapsNote: "Mapa ilustrativo da cidade. O endereço da unidade é fictício nesta demonstração.",
    whatsapp: "5518000000000",
    phoneLabel: "(18) 0000-0000",
    hours: "Segunda a sexta, 8h às 18h",
    hoursConfirmed: true,
    email: "contato@exemplo.com.br",
    highlight: "Unidade Junqueirópolis",
    description:
      "Atendimento de contabilidade e abertura de empresa em Junqueirópolis, com a proximidade de quem conhece a cidade e a estrutura de um escritório com duas unidades na Alta Paulista.",
    localKeywords: [
      "contabilidade em Junqueirópolis",
      "abrir empresa em Junqueirópolis",
      "trocar de contador em Junqueirópolis",
      "contador em Junqueirópolis SP",
    ],
    image: "/images/unidade-junqueiropolis.jpg",
    imageAlt:
      "Imagem ilustrativa da recepção de um escritório de contabilidade, com mesa clara, paredes em azul-marinho e luz natural",
  },
  {
    id: "dracena",
    city: "Dracena",
    state: "SP",
    label: "Dracena/SP",
    name: "Classe A Contabilidade — Unidade Dracena",
    address: "Av. das Palmeiras, 450 — Centro, Dracena/SP",
    addressLines: ["Av. das Palmeiras, 450 — Centro", "Dracena — SP"],
    addressConfirmed: true,
    mapsQuery: "Dracena, SP",
    mapsEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-51.6150%2C-21.5000%2C-51.5700%2C-21.4600&layer=mapnik&marker=-21.4825%2C-51.5931",
    whatsapp: "5518000000001",
    phoneLabel: "(18) 0000-0001",
    hours: "Segunda a sexta, 8h às 18h",
    hoursConfirmed: true,
    email: "contato@exemplo.com.br",
    highlight: "Unidade Dracena · desde 2023",
    description:
      "Nossa unidade em Dracena, na Alta Paulista, para atender empresários e futuros empresários com contabilidade próxima, abertura de empresa e troca de contabilidade sem burocracia.",
    localKeywords: [
      "contabilidade em Dracena",
      "abrir empresa em Dracena",
      "trocar de contador em Dracena",
      "contador em Dracena SP",
    ],
    image: "/images/unidade-dracena.jpg",
    imageAlt:
      "Imagem ilustrativa da sala de reunião de um escritório de contabilidade, com mesa de madeira clara e janela ampla",
  },
];

export const getUnit = (id: UnitId): Unit => UNITS.find((unit) => unit.id === id) ?? UNITS[0];

export type ServiceIcon =
  | "building"
  | "ledger"
  | "users"
  | "receipt"
  | "swap"
  | "compass";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  route?: string;
  whatsappMessage?: string;
  campaign: string;
};

export const SERVICES: Service[] = [
  {
    id: "abertura",
    icon: "building",
    title: "Abertura de empresa",
    short: "Do CNPJ ao primeiro dia",
    description:
      "Escolha do regime, documentação e início das atividades com orientação de quem atua na região.",
    bullets: ["MEI, Simples Nacional e LTDA", "Orientação sobre a atividade", "Acompanhamento do início"],
    route: "/abrir-empresa",
    campaign: "abrir_empresa",
  },
  {
    id: "contabilidade",
    icon: "ledger",
    title: "Contabilidade geral",
    short: "Seus números em dia",
    description:
      "Escrituração, obrigações e demonstrações contábeis para você decidir com informação, não com achismo.",
    bullets: ["Escrituração contábil", "Obrigações em dia", "Relatórios para decidir"],
    whatsappMessage:
      "Olá! Vi o site da Classe A Contabilidade e quero saber mais sobre contabilidade geral para a minha empresa.",
    campaign: "contabilidade_geral",
  },
  {
    id: "folha",
    icon: "users",
    title: "Folha de pagamento",
    short: "Departamento pessoal sem dor de cabeça",
    description:
      "Admissão, férias, rescisão e obrigações de folha organizadas para você cuidar da equipe com tranquilidade.",
    bullets: ["Folha e pró-labore", "Férias e rescisões", "Obrigações do departamento pessoal"],
    whatsappMessage:
      "Olá! Vi o site da Classe A Contabilidade e quero falar sobre folha de pagamento e departamento pessoal.",
    campaign: "folha_pagamento",
  },
  {
    id: "impostos",
    icon: "receipt",
    title: "Impostos",
    short: "Sem sustos no caixa",
    description:
      "Apuração e recolhimento de tributos com atenção ao regime da sua empresa e ao seu fluxo de caixa.",
    bullets: ["Apuração de impostos", "Simples Nacional e MEI", "Planejamento tributário"],
    whatsappMessage:
      "Olá! Vi o site da Classe A Contabilidade e quero entender melhor os impostos da minha empresa.",
    campaign: "impostos",
  },
  {
    id: "troca",
    icon: "swap",
    title: "Troca de contabilidade",
    short: "Migração sem burocracia",
    description:
      "A gente organiza a transição com o seu contador atual e assume as obrigações da sua empresa. Inclui desenquadramento do MEI.",
    bullets: ["Transição acompanhada", "Desenquadramento do MEI", "Sem interrupção das obrigações"],
    whatsappMessage:
      "Olá! Vi o site da Classe A Contabilidade e quero trocar de contabilidade. Pode me explicar como funciona a transição?",
    campaign: "troca_contabilidade",
  },
  {
    id: "assessoria",
    icon: "compass",
    title: "Assessoria contábil",
    short: "Decisão com apoio técnico",
    description:
      "Conversa próxima para entender custos, precificação, fluxo de caixa e o próximo passo do seu negócio.",
    bullets: ["Diagnóstico do negócio", "Apoio em decisões", "Acompanhamento próximo"],
    whatsappMessage:
      "Olá! Vi o site da Classe A Contabilidade e quero agendar uma assessoria contábil para a minha empresa.",
    campaign: "assessoria_contabil",
  },
];

export type Deadline = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  startDate?: string;
  endDate?: string;
  confirmed: boolean;
  audience: string;
};

export const DEADLINES: Deadline[] = [
  {
    id: "irpf-2026",
    title: "Declaração do Imposto de Renda 2026",
    description:
      "Prazo divulgado pelo escritório para a entrega da declaração do IRPF 2026. Organize documentos e informe-se sobre a sua situação.",
    dateLabel: "23/03/2026 a 29/05/2026",
    startDate: "2026-03-23",
    endDate: "2026-05-29",
    confirmed: true,
    audience: "Pessoas físicas e empresários",
  },
]

export type IrpfPhase = "before" | "during" | "after";

export type IrpfStatus = {
  phase: IrpfPhase;
  badge: string;
  title: string;
  description: string;
  days: number;
  startLabel: string;
  endLabel: string;
};

const IRPF_START = new Date(2026, 2, 23, 0, 0, 0);
const IRPF_END = new Date(2026, 4, 29, 23, 59, 59);

const dayDiff = (target: Date, from: Date) =>
  Math.max(0, Math.ceil((target.getTime() - from.getTime()) / 86_400_000));

export function getIrpfStatus(now: Date = new Date()): IrpfStatus {
  if (now < IRPF_START) {
    const days = dayDiff(IRPF_START, now);
    return {
      phase: "before",
      badge: "IRPF 2026 começa em 23/03",
      title: days === 1 ? "Falta 1 dia para o prazo do IRPF 2026" : `Faltam ${days} dias para o IRPF 2026`,
      description:
        "A entrega vai de 23/03 a 29/05/2026. Separar os documentos com antecedência evita correria nos últimos dias.",
      days,
      startLabel: "23/03/2026",
      endLabel: "29/05/2026",
    };
  }

  if (now > IRPF_END) {
    const days = dayDiff(now, IRPF_END);
    return {
      phase: "after",
      badge: "IRPF 2026 encerrado",
      title: "O prazo do IRPF 2026 foi encerrado em 29/05",
      description:
        "O calendário de 2026 está em atualização. Receba os próximos prazos e fique à frente das obrigações da sua empresa.",
      days,
      startLabel: "23/03/2026",
      endLabel: "29/05/2026",
    };
  }

  const days = dayDiff(IRPF_END, now);
  return {
    phase: "during",
    badge: "IRPF 2026: entrega até 29/05",
    title: days === 1 ? "Último dia do prazo do IRPF 2026" : `Faltam ${days} dias para o prazo do IRPF 2026`,
    description:
      "A entrega vai de 23/03 a 29/05/2026. Se ainda não organizou seus documentos, fale com a gente agora.",
    days,
    startLabel: "23/03/2026",
    endLabel: "29/05/2026",
  };
}

export const TRUST = [
  { value: "13", label: "anos de mercado", detail: "Cuidando de empresas da região" },
  { value: "2", label: "unidades próprias", detail: "Junqueirópolis e Dracena" },
  { value: "Equipe", label: "própria e próxima", detail: "Atendimento humano, sem juridiquês" },
] as const;

export const STEPS_TROCA = [
  {
    number: "01",
    title: "Conversa inicial",
    text: "Entendemos o momento da sua empresa, o regime atual e o que precisa ser ajustado. Sem compromisso.",
  },
  {
    number: "02",
    title: "Transição organizada",
    text: "Alinhamos a documentação com o contador atual e assumimos as obrigações, sem deixar prazos para trás.",
  },
  {
    number: "03",
    title: "Rotina tranquila",
    text: "Você passa a ter um time próprio acompanhando a contabilidade, a folha e os impostos da sua empresa.",
  },
] as const;

export const VALUES = [
  {
    title: "Clareza antes do juridiquês",
    text: "Explicamos o que importa para o seu negócio em linguagem simples. Você entende o que está assinando e por quê.",
  },
  {
    title: "Proximidade de verdade",
    text: "Duas unidades na Alta Paulista e atendimento por WhatsApp. Estamos perto de onde a sua empresa acontece.",
  },
  {
    title: "Compromisso com o prazo",
    text: "Obrigações fiscais não são detalhes. Organizamos a rotina para que o prazo nunca seja uma surpresa.",
  },
  {
    title: "Crescimento com segurança",
    text: "Apoiamos decisões de abertura, troca de regime e expansão com informação contábil, não com achismo.",
  },
] as const;



export const FAQ_ABRIR = [
  {
    question: "MEI ou LTDA: qual é a melhor escolha?",
    answer:
      "Depende do faturamento, da atividade, do número de funcionários e do plano de crescimento. O MEI costuma ser mais simples para quem está começando e se enquadra nos limites da categoria. A LTDA oferece mais flexibilidade para crescer, ter sócios e contratar equipe. O caminho certo é fazer um diagnóstico antes de decidir.",
  },
  {
    question: "Quanto custa abrir uma empresa?",
    answer:
      "Os custos variam conforme o tipo de empresa, a atividade, o regime tributário e as exigências do município. Por isso não trabalhamos com um valor único: primeiro entendemos o seu caso e depois apresentamos o caminho com clareza. Fale com a gente para receber uma orientação sem compromisso.",
  },
  {
    question: "Quanto tempo leva para abrir?",
    answer:
      "O prazo depende da prefeitura, do tipo de atividade e das licenças necessárias. A abertura do CNPJ costuma ser uma das etapas mais rápidas, mas alvarás e liberações podem levar mais tempo. Acompanhamos cada etapa para você não perder prazos.",
  },
  {
    question: "Já sou MEI e quero crescer. Como funciona o desenquadramento?",
    answer:
      "Quando o faturamento ultrapassa o limite do MEI ou a atividade/início de funcionários exige outro enquadramento, é preciso solicitar o desenquadramento e migrar para o regime adequado, como o Simples Nacional. A Classe A cuida dessa transição e das obrigações envolvidas.",
  },
  {
    question: "Preciso ir até o escritório?",
    answer:
      "O atendimento pode ser presencial nas unidades de Junqueirópolis e Dracena ou por WhatsApp, com envio de documentos digitais. Você escolhe o formato que combina com a sua rotina.",
  },
  {
    question: "Vocês atendem empresas de outras cidades?",
    answer:
      "Nosso foco é a Alta Paulista, com unidades em Junqueirópolis e Dracena. Se a sua empresa fica em outra cidade da região, fale com a gente para confirmar o atendimento.",
  },
] as const;

