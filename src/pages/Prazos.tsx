import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { SITE, UNITS, getIrpfStatus } from "@/lib/site";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { Accordion, Badge, Breadcrumbs, CheckList, SectionHeading, WhatsAppLink } from "@/components/ui";

const IRPF_FAQ = [
  {
    question: "Quem precisa declarar o Imposto de Renda 2026?",
    answer:
      "A obrigatoriedade depende de fatores como rendimentos, bens, atividades rurais e outras situações previstas na Receita Federal. O prazo divulgado pelo escritório é de 23/03 a 29/05/2026. Se você tem dúvida sobre a sua situação, fale com a nossa equipe para uma orientação individual.",
  },
  {
    question: "O que acontece se eu perder o prazo do IRPF?",
    answer:
      "A entrega fora do prazo pode gerar penalidade e outras consequências. Por isso, a recomendação é organizar os documentos com antecedência e procurar orientação o quanto antes. Cada caso precisa ser analisado por um contador.",
  },
  {
    question: "Como a Classe A pode ajudar com os prazos da minha empresa?",
    answer:
      "A Classe A acompanha as obrigações da sua empresa, organiza a documentação e orienta sobre os prazos aplicáveis ao seu regime. Você recebe os lembretes e conta com a equipe para não perder nenhuma data importante.",
  },
];

const PRAZOS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Prazos fiscais 2026 — Classe A Contabilidade",
  description:
    "Calendário de prazos fiscais de 2026 da Classe A Contabilidade, com destaque para o IRPF 2026 (23/03 a 29/05/2026) e captura de lembretes por e-mail e WhatsApp.",
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${SITE.url}/#site` },
  about: { "@id": `${SITE.url}/#organizacao` },
  mainEntity: {
    "@type": "Event",
    name: "Prazo de entrega do IRPF 2026",
    startDate: "2026-03-23",
    endDate: "2026-05-29",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description:
      "Prazo divulgado pela Classe A Contabilidade para a entrega da declaração do Imposto de Renda 2026: de 23/03 a 29/05/2026.",
    location: {
      "@type": "Place",
      name: "Classe A Contabilidade — Unidade Dracena",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. José Bonifácio, 925",
        addressLocality: "Dracena",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
    organizer: { "@id": `${SITE.url}/#organizacao` },
  },
};

type ReminderForm = {
  name: string;
  email: string;
  phone: string;
  unit: string;
  consent: boolean;
};

const INITIAL_REMINDER: ReminderForm = {
  name: "",
  email: "",
  phone: "",
  unit: "dracena",
  consent: false,
};

function downloadIcs() {
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Classe A Contabilidade//Prazos Fiscais 2026//PT-BR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:irpf-2026@exemplo.com",
    "DTSTAMP:20260101T090000Z",
    "DTSTART;VALUE=DATE:20260323",
    "DTEND;VALUE=DATE:20260530",
    "SUMMARY:IRPF 2026 — prazo de entrega (Classe A Contabilidade)",
    "DESCRIPTION:Prazo divulgado pela Classe A Contabilidade para a entrega do IRPF 2026: de 23/03 a 29/05/2026.",
    "LOCATION:Classe A Contabilidade — Junqueirópolis/SP e Dracena/SP",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "prazo-irpf-2026-classe-a.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700">
          <Icon name="alert" size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function PrazosPage() {
  useSeo({
    title: "Prazos fiscais 2026 e IRPF | Classe A Contabilidade em Junqueirópolis e Dracena",
    description:
      "Calendário de prazos fiscais de 2026 da Classe A Contabilidade. IRPF 2026: 23/03 a 29/05/2026. Receba lembretes por e-mail ou WhatsApp e organize as obrigações da sua empresa.",
    path: "/prazos-fiscais",
    jsonLd: PRAZOS_JSON_LD,
  });

  const irpf = getIrpfStatus();
  const [form, setForm] = useState<ReminderForm>(INITIAL_REMINDER);
  const [errors, setErrors] = useState<Partial<Record<keyof ReminderForm, string>>>({});
  const [submitted, setSubmitted] = useState<{ url: string; message: string; name: string } | null>(null);

  const update = (field: keyof ReminderForm) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value =
      event.target instanceof HTMLInputElement && event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof ReminderForm, string>> = {};
    if (form.name.trim().length < 3) next.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Informe um e-mail válido.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) next.phone = "Informe um WhatsApp válido, com DDD.";
    if (!form.consent) next.consent = "É necessário autorizar o contato para receber os lembretes.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }

    const unit = form.unit === "junqueiropolis" ? "junqueiropolis" : "dracena";
    const unitLabel = unit === "junqueiropolis" ? "Junqueirópolis/SP" : "Dracena/SP";
    const message = [
      "Olá! Quero receber os lembretes de prazos fiscais da Classe A Contabilidade.",
      "",
      `Nome: ${form.name.trim()}`,
      `E-mail: ${form.email.trim()}`,
      `WhatsApp: ${form.phone.trim()}`,
      `Unidade de preferência: ${unitLabel}`,
      "",
      "Autorizei o tratamento dos meus dados para receber os lembretes, conforme a Política de Privacidade.",
    ].join("\n");

    const url = buildWhatsAppUrl({
      unit,
      message,
      campaign: "prazos_lembretes",
      content: "prazos_form",
    });

    setSubmitted({ url, message, name: form.name.trim().split(" ")[0] });
    window.dispatchEvent(new CustomEvent("demo:contact"));
  };

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-8 sm:py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Prazos fiscais" }]} />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="animate-fade-up">
              <Badge tone="gold" icon="calendar">
                Calendário 2026
              </Badge>
              <h1 className="mt-5 text-[2.2rem] leading-[1.08] font-semibold text-navy-900 sm:text-5xl">
                Prazos fiscais de 2026, sem sustos.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                O prazo do IRPF 2026 divulgado pelo escritório é de 23/03 a 29/05/2026. Acompanhe as datas confirmadas e
                receba lembretes para organizar a sua empresa com antecedência.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <WhatsAppLink
                  unit="dracena"
                  message={WA_MESSAGES.generalDeadlines}
                  campaign="prazos_cta_hero"
                  content="prazos_hero"
                  size="lg"
                >
                  Receber lembretes no WhatsApp
                </WhatsAppLink>
                <button
                  type="button"
                  onClick={downloadIcs}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900/40 hover:bg-white"
                >
                  <Icon name="calendar" size={16} />
                  Adicionar o IRPF ao calendário
                </button>
              </div>
            </div>

            <div className="animate-fade-up delay-2 rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge tone={irpf.phase === "after" ? "outline" : "success"} icon="clock">
                  {irpf.phase === "after" ? "Prazo encerrado" : "Status do prazo"}
                </Badge>
                <span className="text-xs font-medium text-muted">IRPF 2026</span>
              </div>
              <p className="mt-4 font-serif text-2xl leading-tight font-semibold text-navy-900">{irpf.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{irpf.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-50 px-3 py-1.5 text-xs font-medium text-navy-800">
                  <Icon name="calendar" size={13} className="text-gold-600" />
                  {irpf.startLabel} a {irpf.endLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-50 px-3 py-1.5 text-xs font-medium text-navy-800">
                  <Icon name="file" size={13} className="text-gold-600" />
                  Divulgado pelo escritório
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="shell grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-gold-600">Calendário do escritório</p>
                  <h2 className="mt-1.5 text-2xl font-semibold text-navy-900">Prazos de 2026</h2>
                </div>
                <Badge tone="success" icon="check">
                  1 prazo confirmado
                </Badge>
              </div>

              <ol className="mt-6 space-y-4">
                <li className="relative overflow-hidden rounded-xl border border-gold-300 bg-gold-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                        <Icon name="file" size={20} />
                      </span>
                      <div>
                        <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-600 uppercase">
                          Pessoas físicas e empresários
                        </p>
                        <h3 className="mt-0.5 text-lg font-semibold text-navy-900">Declaração do Imposto de Renda 2026</h3>
                        <p className="mt-1 text-sm font-medium text-navy-800">23/03/2026 a 29/05/2026</p>
                      </div>
                    </div>
                    <Badge tone="success" icon="check">
                      Confirmado
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Prazo divulgado pelo escritório para a entrega da declaração do IRPF 2026. Organize documentos e
                    informe-se sobre a sua situação.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={downloadIcs}
                      className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-4 py-2 text-xs font-semibold text-navy-900 transition-colors hover:border-navy-900/30"
                    >
                      <Icon name="calendar" size={14} />
                      Adicionar ao calendário
                    </button>
                    <WhatsAppLink
                      unit="dracena"
                      message="Olá! Vi o calendário de prazos no site da Classe A e quero orientação sobre o IRPF 2026."
                      campaign="prazos_irpf"
                      content="prazos_irpf"
                      variant="ghost"
                      size="sm"
                      className="border border-transparent text-navy-900 hover:bg-white"
                    >
                      Falar sobre o IRPF
                    </WhatsAppLink>
                  </div>
                </li>

              </ol>

              <p className="mt-4 flex items-start gap-2 rounded-xl bg-cream-50 p-3 text-xs leading-5 text-muted">
                <Icon name="info" size={14} className="mt-0.5 shrink-0 text-gold-600" />
                Este calendário é informativo e não substitui a análise das obrigações específicas da sua empresa.
                Fale com a equipe para receber o calendário completo do seu regime tributário.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: "bell" as const, title: "Lembretes", text: "Receba as datas importantes antes do prazo." },
                { icon: "shield" as const, title: "Sem spam", text: "Apenas informações de prazos do escritório." },
                { icon: "users" as const, title: "Suporte", text: "Fale com a equipe quando precisar de ajuda." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-line bg-white p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                    <Icon name={item.icon === "bell" ? "calendar" : item.icon} size={17} />
                  </span>
                  <p className="mt-2 text-sm font-semibold text-navy-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-6">
              {submitted ? (
                <div className="animate-fade-in">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <Icon name="check-circle" size={24} />
                  </span>
                  <h2 className="mt-3 text-xl font-semibold text-navy-900">Prévia do pedido, {submitted.name}!</h2>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Demonstração: nenhuma mensagem é enviada. Em produção, a solicitação abaixo abriria no WhatsApp da
                    unidade.
                  </p>
                  <div className="mt-4 rounded-xl border border-line bg-cream-50 p-3">
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">Prévia da mensagem</p>
                    <p className="mt-1.5 max-h-48 overflow-y-auto text-xs leading-5 whitespace-pre-line text-navy-800">
                      {submitted.message}
                    </p>
                  </div>
                  <a
                    href={submitted.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b6b45] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#095737]"
                  >
                    <WhatsAppIcon size={17} />
                    Ver aviso de demonstração
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-line px-4 py-2.5 text-xs font-semibold text-navy-900 transition-colors hover:bg-cream-50"
                  >
                    Editar dados
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-semibold text-navy-900">Receba os lembretes</h2>
                    <Badge tone="outline">Gratuito</Badge>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Preencha os dados e envie pelo WhatsApp. A Classe A avisa você sobre os próximos prazos.
                  </p>

                  <div className="mt-4 space-y-3.5">
                    <FormField label="Nome" htmlFor="reminder-name" error={errors.name}>
                      <input
                        id="reminder-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        className="field-input"
                        placeholder="Seu nome"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "reminder-name-error" : undefined}
                      />
                    </FormField>
                    <FormField label="E-mail" htmlFor="reminder-email" error={errors.email}>
                      <input
                        id="reminder-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        className="field-input"
                        placeholder="voce@empresa.com.br"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "reminder-email-error" : undefined}
                      />
                    </FormField>
                    <FormField label="WhatsApp" htmlFor="reminder-phone" error={errors.phone}>
                      <input
                        id="reminder-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        className="field-input"
                        placeholder="(18) 99999-9999"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "reminder-phone-error" : undefined}
                      />
                    </FormField>
                    <FormField label="Unidade de preferência" htmlFor="reminder-unit">
                      <select
                        id="reminder-unit"
                        value={form.unit}
                        onChange={update("unit")}
                        className="field-input"
                      >
                        {UNITS.map((unit) => (
                          <option key={unit.id} value={unit.id}>
                            {unit.city}/SP
                          </option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="reminder-consent" className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-cream-50 p-3">
                      <input
                        id="reminder-consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={update("consent")}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-navy-900"
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? "reminder-consent-error" : undefined}
                      />
                      <span className="text-[0.7rem] leading-5 text-muted">
                        Autorizo o contato e o tratamento dos meus dados para receber lembretes de prazos, conforme a{" "}
                        <Link
                          to="/politica-de-privacidade"
                          onClick={(event) => event.stopPropagation()}
                          className="font-medium text-navy-800 underline decoration-gold-500 underline-offset-2"
                        >
                          Política de Privacidade
                        </Link>
                        . <span className="text-gold-600">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="reminder-consent-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700">
                        <Icon name="alert" size={13} />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                  >
                    <WhatsAppIcon size={17} className="text-gold-400" />
                    Quero receber os lembretes
                  </button>
                  <p className="mt-2 text-center text-[0.65rem] leading-5 text-muted">
                    Este site não possui servidor: a solicitação é enviada pela sua conta de WhatsApp. Nenhum dado é
                    armazenado aqui.
                  </p>
                </form>
              )}
            </div>

            <div className="mt-4 rounded-2xl bg-navy-900 p-5 text-cream-50">
              <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">Precisa de ajuda?</p>
              <p className="mt-2 text-sm leading-6 text-navy-100/85">
                Se a sua empresa tem uma obrigação específica, fale com a nossa equipe para confirmar as datas.
              </p>
              <WhatsAppLink
                unit="dracena"
                message={WA_MESSAGES.generalDeadlines}
                campaign="prazos_sidebar"
                content="prazos_sidebar"
                variant="gold"
                size="sm"
                className="mt-3 w-full"
              >
                Falar com um contador
              </WhatsAppLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-cream-100/60 py-14 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Dúvidas sobre prazos"
              title="Organização também é uma forma de economizar."
              description="Separar os documentos com antecedência evita correria e reduz o risco de perder prazos importantes."
            />
            <CheckList
              className="mt-5"
              items={[
                "Anote as datas no seu calendário",
                "Separe os documentos com antecedência",
                "Confirme as obrigações específicas do seu regime",
              ]}
            />
          </div>
          <Accordion items={IRPF_FAQ} />
        </div>
      </section>
    </>
  );
}
