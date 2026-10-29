import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { SITE, UNITS } from "@/lib/site";
import {
  ACTIVITY_LABELS,
  EMPLOYEES_LABELS,
  EMPTY_ANSWERS,
  HOME_LABELS,
  REVENUE_LABELS,
  buildSimulatorMessage,
  getSimulatorResult,
  type SimulatorAnswers,
  type SimulatorResult,
} from "@/lib/simulator";
import { WA_MESSAGES } from "@/lib/whatsapp";
import { Icon } from "@/components/Icons";
import { Badge, Breadcrumbs, Button, CheckList, SectionHeading, WhatsAppLink } from "@/components/ui";
import { cn } from "@/utils/cn";

type QuestionId = keyof SimulatorAnswers;

type Question = {
  id: QuestionId;
  title: string;
  helper: string;
  options: { value: string; label: string; description?: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "revenue",
    title: "Qual é o faturamento anual estimado?",
    helper: "Uma estimativa já ajuda. Se ainda não sabe, escolha a última opção.",
    options: [
      { value: "ate81", label: "Até R$ 81.000 por ano", description: "Faixa do MEI, se a atividade for permitida." },
      { value: "ate4800", label: "De R$ 81.000 a R$ 4,8 milhões por ano", description: "Faixa do Simples Nacional." },
      { value: "acima4800", label: "Acima de R$ 4,8 milhões por ano", description: "Acima do limite do Simples Nacional." },
      { value: "nao_sei", label: "Ainda não sei estimar", description: "Seguimos com uma orientação conservadora." },
    ],
  },
  {
    id: "activity",
    title: "Qual é o tipo de atividade?",
    helper: "O MEI tem uma lista de atividades permitidas. Se a sua não estiver nela, o caminho é outro.",
    options: [
      {
        value: "permitida",
        label: "Comércio, serviços, indústria ou transporte",
        description: "Atividade comum, que costuma estar na lista do MEI.",
      },
      {
        value: "nao_permitida",
        label: "Atividade não permitida ao MEI",
        description: "Ex.: factoring, importação, agência de viagem.",
      },
      { value: "nao_sei", label: "Não sei se a minha atividade é permitida", description: "Vamos confirmar isso na conversa." },
    ],
  },
  {
    id: "employees",
    title: "Você tem funcionários?",
    helper: "O MEI permite no máximo 1 funcionário. A partir de 2, o enquadramento muda.",
    options: [
      { value: "0", label: "Nenhum funcionário", description: "Você trabalha sozinho(a) ou com sócios." },
      { value: "1", label: "1 funcionário", description: "Dentro do limite do MEI." },
      { value: "2mais", label: "2 ou mais funcionários", description: "Acima do limite do MEI." },
    ],
  },
  {
    id: "homeBased",
    title: "A empresa opera em casa?",
    helper: "Essa informação não muda o regime, mas ajuda a preparar a documentação e o endereço da empresa.",
    options: [
      { value: "sim", label: "Sim, opero em casa", description: "Home office, loja virtual ou atividade sem ponto fixo." },
      { value: "nao", label: "Não, tenho ponto comercial", description: "Loja, escritório, galpão ou outro endereço." },
    ],
  },
];

const RESULT_STYLES = {
  mei: {
    tone: "success" as const,
    icon: "check-circle" as const,
    label: "Perfil MEI",
    accent: "bg-emerald-50 text-emerald-700",
  },
  simples: {
    tone: "gold" as const,
    icon: "calculator" as const,
    label: "Perfil Simples Nacional",
    accent: "bg-gold-100 text-gold-600",
  },
  contador: {
    tone: "warning" as const,
    icon: "alert" as const,
    label: "Análise individual",
    accent: "bg-amber-50 text-amber-700",
  },
};

const SIMULATOR_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulador de regime — MEI ou Simples Nacional?",
  url: `${SITE.url}/simulador`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  provider: { "@id": `${SITE.url}/#organizacao` },
  description:
    "Simulador educativo para identificar se o MEI ou o Simples Nacional é o regime mais provável para a sua empresa em Junqueirópolis ou Dracena.",
};

export default function SimuladorPage() {
  useSeo({
    title: "Simulador de regime: MEI ou Simples Nacional? | Classe A Contabilidade",
    description:
      "Responda 4 perguntas e descubra se o MEI ou o Simples Nacional é o regime mais provável para a sua empresa. Simulador educativo da Classe A em Junqueirópolis e Dracena/SP.",
    path: "/simulador",
    jsonLd: SIMULATOR_JSON_LD,
  });

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SimulatorAnswers>(EMPTY_ANSWERS);
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isResult = step === QUESTIONS.length;
  const question = QUESTIONS[step];
  const selected = question ? answers[question.id] : null;
  const finalResult = result ?? getSimulatorResult(answers);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    if (step > 0) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const select = (id: QuestionId, value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }) as SimulatorAnswers);
  };

  const advance = () => {
    if (!selected) return;
    if (step < QUESTIONS.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setResult(getSimulatorResult(answers));
    setStep(QUESTIONS.length);
  };

  const back = () => {
    if (isResult) {
      setStep(QUESTIONS.length - 1);
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  };

  const reset = () => {
    setAnswers(EMPTY_ANSWERS);
    setResult(null);
    setStep(0);
  };

  const progress = isResult ? 100 : Math.round(((step + 1) / QUESTIONS.length) * 100);
  const message = buildSimulatorMessage(answers, finalResult);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-8 sm:py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Simulador de regime" }]} />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="animate-fade-up">
              <Badge tone="gold" icon="calculator">
                Simulador de regime
              </Badge>
              <h1 className="mt-5 text-[2.2rem] leading-[1.08] font-semibold text-navy-900 sm:text-5xl">
                Qual regime é para mim: MEI ou Simples Nacional?
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                Quatro perguntas rápidas para entender o caminho mais provável para a sua empresa. Sem cadastro e sem
                complicação.
              </p>
            </div>
            <div className="animate-fade-up delay-2 rounded-2xl border border-gold-200 bg-gold-50 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                  <Icon name="info" size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Estimativa educativa</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Este simulador não substitui uma consulta contábil. Ele considera apenas as regras gerais do MEI e do
                    Simples Nacional. A confirmação depende da análise da sua atividade e do seu faturamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="shell grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
          <div
            ref={cardRef}
            className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-7 lg:p-8"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-muted uppercase">
                {isResult ? "Resultado do simulador" : `Pergunta ${step + 1} de ${QUESTIONS.length}`}
              </p>
              <Badge tone="outline">{progress}%</Badge>
            </div>
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream-200"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Progresso do simulador"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {!isResult && question ? (
              <div className="mt-6">
                <fieldset>
                  <legend className="sr-only">{question.title}</legend>
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-2xl leading-tight font-semibold text-navy-900 outline-none sm:text-[1.75rem]"
                  >
                    {question.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{question.helper}</p>

                  <div className="mt-5 grid gap-2.5">
                    {question.options.map((option) => {
                      const checked = selected === option.value;
                      return (
                        <label
                          key={option.value}
                          className={cn(
                            "group relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200",
                            checked
                              ? "border-navy-900 bg-navy-50 ring-2 ring-gold-500/40"
                              : "border-line bg-white hover:border-navy-900/30 hover:bg-cream-50",
                          )}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={checked}
                            onChange={() => select(question.id, option.value)}
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              checked ? "border-navy-900 bg-navy-900" : "border-cream-300 bg-white group-hover:border-navy-900/40",
                            )}
                          >
                            {checked && <span className="h-2 w-2 rounded-full bg-gold-400" />}
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-semibold text-navy-900">{option.label}</span>
                            {option.description && (
                              <span className="mt-0.5 block text-xs leading-5 text-muted">{option.description}</span>
                            )}
                          </span>
                          <span className="pointer-events-none absolute inset-0 rounded-xl peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500" />
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="ghost" onClick={back} disabled={step === 0} className="justify-center">
                    <Icon name="arrow-left" size={16} />
                    Voltar
                  </Button>
                  <Button variant="primary" onClick={advance} disabled={!selected} className="justify-center">
                    {step === QUESTIONS.length - 1 ? "Ver resultado" : "Próxima pergunta"}
                    <Icon name="arrow-right" size={16} />
                  </Button>
                </div>
                <p className="mt-3 text-center text-[0.7rem] text-muted sm:text-left">
                  Dica: use as setas do teclado para navegar entre as opções.
                </p>
              </div>
            ) : (
              <div className="animate-fade-in mt-6" aria-live="polite">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={RESULT_STYLES[finalResult.type].tone} icon={RESULT_STYLES[finalResult.type].icon}>
                    {RESULT_STYLES[finalResult.type].label}
                  </Badge>
                  <span className="text-xs text-muted">Resultado do seu perfil</span>
                </div>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-4 text-2xl leading-tight font-semibold text-navy-900 outline-none sm:text-3xl"
                >
                  {finalResult.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{finalResult.summary}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-cream-50 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                      <Icon name="check-circle" size={17} className="text-emerald-600" />
                      O que pesou no resultado
                    </h3>
                    <CheckList className="mt-3" items={finalResult.points} />
                  </div>
                  <div className="rounded-xl border border-line bg-white p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                      <Icon name="alert" size={17} className="text-gold-600" />
                      Pontos de atenção
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {finalResult.caveats.map((caveat) => (
                        <li key={caveat} className="flex items-start gap-2.5 text-xs leading-5 text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                          {caveat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-line bg-white p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                    <Icon name="target" size={17} className="text-gold-600" />
                    Próximos passos
                  </h3>
                  <ol className="mt-3 space-y-2">
                    {finalResult.nextSteps.map((nextStep, index) => (
                      <li key={nextStep} className="flex items-start gap-2.5 text-xs leading-5 text-muted">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[0.65rem] font-semibold text-white">
                          {index + 1}
                        </span>
                        {nextStep}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-4 rounded-xl border border-line bg-cream-50 p-4">
                  <h3 className="text-sm font-semibold text-navy-900">Resumo das suas respostas</h3>
                  <dl className="mt-2 grid gap-x-4 gap-y-1.5 text-xs sm:grid-cols-2">
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-navy-800">Faturamento:</dt>
                      <dd className="text-muted">{answers.revenue ? REVENUE_LABELS[answers.revenue] : "—"}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-navy-800">Atividade:</dt>
                      <dd className="text-muted">{answers.activity ? ACTIVITY_LABELS[answers.activity] : "—"}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-navy-800">Funcionários:</dt>
                      <dd className="text-muted">{answers.employees ? EMPLOYEES_LABELS[answers.employees] : "—"}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-navy-800">Operação:</dt>
                      <dd className="text-muted">{answers.homeBased ? HOME_LABELS[answers.homeBased] : "—"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 rounded-xl border border-gold-200 bg-gold-50 p-4">
                  <p className="text-sm font-semibold text-navy-900">Quer confirmar esse resultado?</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Envie o resumo das suas respostas para a nossa equipe. Escolha a unidade mais próxima:
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    {UNITS.map((unit) => (
                      <WhatsAppLink
                        key={unit.id}
                        unit={unit.id}
                        message={message}
                        campaign="simulador_resultado"
                        content={`simulador_resultado_${unit.id}`}
                        variant="whatsapp"
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        Falar com {unit.city}
                      </WhatsAppLink>
                    ))}
                  </div>
                  <p className="mt-2 text-[0.7rem] leading-5 text-muted">
                    A mensagem já inclui o resumo das respostas. Atendimento em Junqueirópolis e Dracena.
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-[0.7rem] leading-5 text-muted">
                    <Icon name="info" size={14} className="mt-0.5 shrink-0 text-gold-600" />
                    Estimativa educativa. Não substitui consulta contábil nem análise da sua situação completa.
                  </p>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" size="sm" onClick={back}>
                      <Icon name="arrow-left" size={15} />
                      Ajustar respostas
                    </Button>
                    <Button variant="outline" size="sm" onClick={reset}>
                      Refazer
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
              <h2 className="flex items-center gap-2 text-base font-semibold text-navy-900">
                <Icon name="compass" size={18} className="text-gold-600" />
                Como funciona
              </h2>
              <CheckList
                className="mt-3"
                items={[
                  "Quatro perguntas sobre o seu negócio",
                  "Resultado na hora, sem cadastro",
                  "Resumo pronto para enviar no WhatsApp",
                ]}
              />
            </div>

            <div className="rounded-2xl border border-line bg-cream-100/70 p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-navy-900">
                <Icon name="shield" size={18} className="text-gold-600" />
                Importante
              </h2>
              <p className="mt-2 text-xs leading-5 text-muted">
                O simulador considera regras gerais do MEI e do Simples Nacional. Ele não calcula impostos, não analisa
                a sua situação completa e não substitui uma consulta com um contador.
              </p>
              <Link
                to="/abrir-empresa"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600"
              >
                Entender a abertura de empresa
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>

            <div className="rounded-2xl bg-navy-900 p-5 text-cream-50">
              <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">Prefere conversar?</p>
              <p className="mt-2 text-sm leading-6 text-navy-100/85">
                Um contador da Classe A pode analisar o seu caso com calma, sem compromisso.
              </p>
              <WhatsAppLink
                unit="dracena"
                message={WA_MESSAGES.generalSimulator}
                campaign="simulador_sidebar"
                content="simulador_sidebar"
                variant="gold"
                size="sm"
                className="mt-4 w-full"
              >
                Falar com um contador
              </WhatsAppLink>
              <p className="mt-2 text-center text-[0.65rem] text-cream-100/55">Junqueirópolis e Dracena/SP</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-cream-100/60 py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Antes de decidir"
            title="O regime certo evita custos e dor de cabeça."
            description="MEI, Simples Nacional e LTDA têm regras diferentes de faturamento, atividade e obrigações. O simulador é um ponto de partida; a confirmação vem da análise do seu caso."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "MEI", text: "Faturamento de até R$ 81.000/ano, atividade permitida e até 1 funcionário." },
              { title: "Simples Nacional", text: "Faturamento de até R$ 4,8 milhões/ano, com apuração simplificada." },
              { title: "LTDA", text: "Estrutura para crescer, ter sócios e contratar equipe, com obrigações próprias." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
