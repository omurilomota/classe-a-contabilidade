export type Revenue = "ate81" | "ate4800" | "acima4800" | "nao_sei";
export type Activity = "permitida" | "nao_permitida" | "nao_sei";
export type Employees = "0" | "1" | "2mais";
export type HomeBased = "sim" | "nao";

export type SimulatorAnswers = {
  revenue: Revenue | null;
  activity: Activity | null;
  employees: Employees | null;
  homeBased: HomeBased | null;
};

export type SimulatorResultType = "mei" | "simples" | "contador";

export type SimulatorResult = {
  type: SimulatorResultType;
  badge: string;
  title: string;
  summary: string;
  points: string[];
  caveats: string[];
  nextSteps: string[];
};

export const EMPTY_ANSWERS: SimulatorAnswers = {
  revenue: null,
  activity: null,
  employees: null,
  homeBased: null,
};

export const REVENUE_LABELS: Record<Revenue, string> = {
  ate81: "Até R$ 81.000 por ano",
  ate4800: "De R$ 81.000 a R$ 4,8 milhões por ano",
  acima4800: "Acima de R$ 4,8 milhões por ano",
  nao_sei: "Ainda não sei estimar",
};

export const ACTIVITY_LABELS: Record<Activity, string> = {
  permitida: "Comércio, serviços, indústria ou transporte (atividade comum)",
  nao_permitida: "Atividade não permitida ao MEI (ex.: factoring, importação, agência de viagem)",
  nao_sei: "Não sei se a minha atividade é permitida",
};

export const EMPLOYEES_LABELS: Record<Employees, string> = {
  "0": "Nenhum funcionário",
  "1": "1 funcionário",
  "2mais": "2 ou mais funcionários",
};

export const HOME_LABELS: Record<HomeBased, string> = {
  sim: "Sim, opero em casa",
  nao: "Não, tenho ponto comercial",
};

export function getSimulatorResult(answers: SimulatorAnswers): SimulatorResult {
  const { revenue, activity, employees } = answers;

  if (!revenue || !activity || !employees) {
    return {
      type: "contador",
      badge: "Análise individual",
      title: "Fale com um contador antes de decidir",
      summary:
        "Para indicar o regime com segurança, precisamos entender o faturamento, a atividade e a estrutura do negócio.",
      points: ["Conversa sem compromisso", "Análise do seu cenário", "Orientação sobre o próximo passo"],
      caveats: ["Este simulador é educativo e não substitui uma consulta contábil."],
      nextSteps: ["Reúna as informações do negócio", "Fale com a equipe da Classe A"],
    };
  }

  if (revenue === "acima4800") {
    return {
      type: "contador",
      badge: "Análise individual",
      title: "Fale com um contador antes de decidir",
      summary:
        "O faturamento estimado passa do limite do Simples Nacional. O regime mais adequado depende da atividade, da estrutura e do planejamento do negócio.",
      points: [
        "Faturamento anual acima de R$ 4.800.000",
        "Regimes como Lucro Presumido ou Lucro Real podem ser avaliados",
        "Planejamento tributário passa a ser essencial",
      ],
      caveats: [
        "Este simulador não calcula impostos nem substitui uma análise contábil.",
        "Folha de pagamento, despesas e tipo de atividade também influenciam a escolha do regime.",
      ],
      nextSteps: [
        "Reunir informações sobre faturamento, custos e equipe",
        "Conversar com um contador para comparar cenários",
      ],
    };
  }

  if (revenue === "ate81" && activity === "permitida" && (employees === "0" || employees === "1")) {
    return {
      type: "mei",
      badge: "Perfil MEI",
      title: "O MEI pode ser o seu enquadramento",
      summary:
        "Com faturamento de até R$ 81.000 por ano, atividade permitida e até 1 funcionário, o MEI costuma ser o caminho mais simples para começar.",
      points: [
        "Faturamento anual de até R$ 81.000",
        "Atividade permitida ao MEI",
        "Até 1 funcionário",
        "CNPJ e obrigações simplificadas",
      ],
      caveats: [
        "O limite é anual: se ultrapassar, será necessário migrar de regime.",
        "A atividade precisa estar na lista permitida ao MEI; confirme o CNAE.",
        "Atividades reguladas podem ter exigências adicionais.",
      ],
      nextSteps: [
        "Confirmar o CNAE e a atividade permitida",
        "Verificar se o faturamento se mantém dentro do limite anual",
        "Abrir o CNPJ e organizar as obrigações",
      ],
    };
  }

  if (revenue === "ate81" && activity === "nao_sei" && (employees === "0" || employees === "1")) {
    return {
      type: "mei",
      badge: "Perfil MEI (provável)",
      title: "O MEI é uma possibilidade, mas confirme a atividade",
      summary:
        "Seu faturamento e o número de funcionários são compatíveis com o MEI. Falta confirmar se a sua atividade está na lista permitida.",
      points: [
        "Faturamento anual de até R$ 81.000",
        "Até 1 funcionário",
        "Atividade ainda precisa ser confirmada",
      ],
      caveats: [
        "Se a atividade não for permitida ao MEI, o caminho será o Simples Nacional.",
        "O limite de faturamento é anual e precisa ser acompanhado.",
      ],
      nextSteps: [
        "Confirmar a atividade e o CNAE com um contador",
        "Verificar as exigências do município",
        "Seguir com a abertura após a confirmação",
      ],
    };
  }

  return {
    type: "simples",
    badge: "Perfil Simples Nacional",
    title: "O Simples Nacional deve ser o seu regime",
    summary:
      "Seu perfil não se encaixa no MEI ou o faturamento passa do limite da categoria. O Simples Nacional costuma ser o próximo passo, com apuração simplificada de impostos.",
    points: [
      "Faturamento anual de até R$ 4.800.000",
      "Permite atividade e equipe maiores",
      "Apuração simplificada de impostos",
    ],
    caveats: [
      "O limite de R$ 4,8 milhões é anual e pode variar conforme a atividade.",
      "A escolha do anexo e a apuração dependem da atividade e da folha de pagamento.",
      "Se houver sócios ou faturamento maior, outro regime pode ser mais adequado.",
    ],
    nextSteps: [
      "Definir a atividade e o anexo do Simples",
      "Comparar o Simples com outros regimes",
      "Organizar a documentação para a abertura",
    ],
  };
}

export function buildSimulatorMessage(answers: SimulatorAnswers, result: SimulatorResult): string {
  const lines = [
    "Olá! Fiz o simulador de regime no site da Classe A Contabilidade e quero confirmar o resultado.",
    "",
    "Resumo das respostas:",
    `• Faturamento anual: ${answers.revenue ? REVENUE_LABELS[answers.revenue] : "não respondido"}`,
    `• Atividade: ${answers.activity ? ACTIVITY_LABELS[answers.activity] : "não respondida"}`,
    `• Funcionários: ${answers.employees ? EMPLOYEES_LABELS[answers.employees] : "não respondido"}`,
    `• Operação: ${answers.homeBased ? HOME_LABELS[answers.homeBased] : "não respondida"}`,
    "",
    `Resultado do simulador: ${result.title}`,
    "Gostaria de uma orientação para confirmar o melhor regime para a minha empresa.",
  ];
  return lines.join("\n");
}
