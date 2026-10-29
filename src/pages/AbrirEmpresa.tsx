import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { FAQ_ABRIR, SITE, UNITS } from "@/lib/site";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { Icon, WhatsAppIcon } from "@/components/Icons";
import { Picture } from "@/components/Picture";
import { Accordion, Badge, Breadcrumbs, CheckList, SectionHeading, WhatsAppLink } from "@/components/ui";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ABRIR.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Abertura de empresa em Junqueirópolis e Dracena",
  serviceType: "Abertura de empresa",
  provider: { "@id": `${SITE.url}/#organizacao` },
  areaServed: [
    { "@type": "City", name: "Junqueirópolis", address: { "@type": "PostalAddress", "addressRegion": "SP", "addressCountry": "BR" } },
    { "@type": "City", name: "Dracena", address: { "@type": "PostalAddress", "addressRegion": "SP", "addressCountry": "BR" } },
  ],
  description:
    "Orientação e abertura de empresa em Junqueirópolis/SP e Dracena/SP: MEI, Simples Nacional e LTDA, com acompanhamento da documentação e das obrigações iniciais.",
};

type FormState = {
  name: string;
  phone: string;
  city: string;
  moment: string;
  activity: string;
  revenue: string;
  employees: string;
  consent: boolean;
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  city: "dracena",
  moment: "abrir",
  activity: "",
  revenue: "ate81",
  employees: "0",
  consent: false,
};

const MOMENTS = [
  { value: "abrir", label: "Quero abrir minha primeira empresa" },
  { value: "crescer", label: "Já tenho MEI e quero crescer" },
  { value: "trocar", label: "Quero trocar de contabilidade" },
  { value: "regularizar", label: "Já tenho empresa e quero regularizar" },
];

const REVENUES = [
  { value: "ate81", label: "Até R$ 81.000 por ano" },
  { value: "ate4800", label: "De R$ 81.000 a R$ 4,8 milhões por ano" },
  { value: "acima4800", label: "Acima de R$ 4,8 milhões por ano" },
  { value: "nao_sei", label: "Ainda não sei estimar" },
];

const EMPLOYEES = [
  { value: "0", label: "Nenhum funcionário" },
  { value: "1", label: "1 funcionário" },
  { value: "2mais", label: "2 ou mais funcionários" },
];

const labelFor = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-gold-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-xs leading-5 text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700">
          <Icon name="alert" size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function AbrirEmpresaPage() {
  useSeo({
    title: "Abrir empresa em Junqueirópolis e Dracena/SP | Classe A Contabilidade",
    description:
      "Quer abrir sua empresa em Junqueirópolis ou Dracena? A Classe A orienta sobre MEI, Simples Nacional e LTDA, cuida da documentação e acompanha o início. Fale com um contador no WhatsApp.",
    path: "/abrir-empresa",
    jsonLd: [SERVICE_JSON_LD, FAQ_JSON_LD],
  });

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<{ url: string; message: string; name: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target instanceof HTMLInputElement && event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) next.name = "Informe seu nome completo.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) next.phone = "Informe um WhatsApp válido, com DDD.";
    if (form.activity.trim().length < 3) next.activity = "Conte brevemente qual é a sua atividade.";
    if (!form.consent) next.consent = "É necessário autorizar o contato para continuar.";
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    const unit = form.city === "junqueiropolis" ? "junqueiropolis" : "dracena";
    const cityLabel = form.city === "outra" ? "Outra cidade da Alta Paulista" : `${form.city === "junqueiropolis" ? "Junqueirópolis" : "Dracena"}/SP`;
    const message = [
      "Olá! Quero abrir minha empresa e vim pelo site da Classe A Contabilidade.",
      "",
      `Nome: ${form.name.trim()}`,
      `WhatsApp: ${form.phone.trim()}`,
      `Cidade: ${cityLabel}`,
      `Momento: ${labelFor(MOMENTS, form.moment)}`,
      `Atividade: ${form.activity.trim()}`,
      `Faturamento estimado: ${labelFor(REVENUES, form.revenue)}`,
      `Funcionários: ${labelFor(EMPLOYEES, form.employees)}`,
      "",
      "Autorizei o contato e o tratamento dos meus dados para esta finalidade.",
    ].join("\n");

    const url = buildWhatsAppUrl({
      unit,
      message,
      campaign: "abrir_empresa_form",
      content: "abrir_empresa_form",
    });

    setSubmitted({ url, message, name: form.name.trim().split(" ")[0] });
    window.dispatchEvent(new CustomEvent("demo:contact"));
  };

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-8 sm:py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Abrir empresa" }]} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="animate-fade-up">
              <Badge tone="gold" icon="building">
                Abertura de empresa
              </Badge>
              <h1 className="mt-5 text-[2.2rem] leading-[1.08] font-semibold text-navy-900 sm:text-5xl">
                Abra sua empresa em Junqueirópolis ou Dracena sem burocracia.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                Você cuida da ideia. A gente cuida do CNPJ, do regime e das obrigações. Um time próprio para orientar o
                caminho mais seguro, do primeiro documento ao primeiro dia de operação.
              </p>
              <CheckList
                className="mt-6"
                items={[
                  "Orientação sobre MEI, Simples Nacional e LTDA",
                  "Documentação e abertura acompanhadas de perto",
                  "Atendimento em Junqueirópolis, Dracena e região",
                ]}
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink
                  unit="dracena"
                  message={WA_MESSAGES.generalOpening}
                  campaign="abrir_empresa_cta_hero"
                  content="abrir_empresa_hero"
                  size="lg"
                >
                  Falar com um contador no WhatsApp
                </WhatsAppLink>
                <a
                  href="#formulario"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900/40 hover:bg-white"
                >
                  Preencher o formulário
                  <Icon name="arrow-right" size={16} />
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <Icon name="lock" size={14} className="text-gold-600" />
                Seus dados não são armazenados em servidor. A mensagem é montada no seu navegador.
              </p>
            </div>

            <div className="animate-fade-up delay-2 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold-500/30" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-navy-900 shadow-lift">
                <Picture
                  src="/images/abrir-empresa"
                  alt="Imagem ilustrativa de uma empreendedora trabalhando em seu negócio com notebook e caderno, em um ambiente iluminado e acolhedor"
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="block aspect-[16/11] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/15 bg-navy-950/70 p-4 text-cream-50 backdrop-blur-md">
                  <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">Unidades</p>
                  <p className="mt-1 text-sm font-semibold">Junqueirópolis/SP · Dracena/SP</p>
                  <p className="mt-1 text-xs leading-5 text-cream-100/75">
                    Atendimento na região da Alta Paulista, presencial ou por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Como funciona a abertura" className="border-y border-line bg-white py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Como funciona"
            title="Um caminho claro, do primeiro papo ao CNPJ."
            description="Sem labirinto de informações. Você sabe o que acontece em cada etapa e quem está cuidando do quê."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Conversa inicial", text: "Entendemos a atividade, o faturamento previsto e o momento do negócio." },
              { title: "Escolha do caminho", text: "Comparamos MEI, Simples Nacional e LTDA para indicar o mais adequado." },
              { title: "Documentação", text: "Organizamos os documentos e acompanhamos as etapas do registro." },
              { title: "Início com segurança", text: "Empresa aberta e obrigações iniciais alinhadas para você começar tranquilo." },
            ].map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-line bg-cream-50 p-5">
                <span className="font-serif text-2xl font-semibold text-gold-600">0{index + 1}</span>
                <h2 className="mt-2 text-lg font-semibold text-navy-900">{step.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted">
            <Icon name="info" size={14} className="mt-0.5 shrink-0 text-gold-600" />
            Prazos e custos variam conforme a atividade, o regime e o município. Por isso, cada caso é avaliado
            individualmente antes de qualquer indicação.
          </p>
        </div>
      </section>

      <section id="formulario" ref={formRef} className="scroll-mt-28 py-16 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Vamos começar"
              title="Conte um pouco sobre o seu negócio."
              description="Preencha os campos abaixo e envie pelo WhatsApp. A mensagem já chega organizada para a nossa equipe."
            />
            <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-soft">
              <h2 className="flex items-center gap-2 text-base font-semibold text-navy-900">
                <Icon name="file" size={18} className="text-gold-600" />
                O que você vai precisar
              </h2>
              <CheckList
                className="mt-3"
                items={[
                  "Informações sobre a atividade que pretende exercer",
                  "Estimativa de faturamento e número de funcionários",
                  "Documentos pessoais e comprovante de endereço (na etapa de abertura)",
                ]}
              />
              <p className="mt-4 border-t border-line pt-3 text-xs leading-5 text-muted">
                Ainda não tem tudo? Sem problema. A conversa inicial serve justamente para organizar o que falta.
              </p>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-gold-50 p-4 text-xs leading-5 text-navy-800">
              <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-gold-600" />
              <p>
                <strong className="font-semibold">Privacidade:</strong> os dados deste formulário são usados apenas para
                montar a sua mensagem de contato. Nada é enviado para servidores da Classe A.{" "}
                <Link to="/politica-de-privacidade" className="font-medium underline decoration-gold-500 underline-offset-2">
                  Saiba mais
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-7">
            {submitted ? (
              <div className="animate-fade-in">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Icon name="check-circle" size={26} />
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-navy-900">Prévia da solicitação, {submitted.name}!</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Esta é uma demonstração: nenhuma mensagem é enviada. Em produção, o texto abaixo abriria no WhatsApp da
                  unidade escolhida.
                </p>
                <div className="mt-5 rounded-xl border border-line bg-cream-50 p-4">
                  <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">Prévia da mensagem</p>
                  <p className="mt-2 max-h-56 overflow-y-auto text-sm leading-6 whitespace-pre-line text-navy-800">
                    {submitted.message}
                  </p>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={submitted.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b6b45] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#095737]"
                  >
                    <WhatsAppIcon size={17} />
                    Ver aviso de demonstração
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-50"
                  >
                    Editar respostas
                  </button>
                </div>
                <p className="mt-4 text-xs leading-5 text-muted">
                  Se preferir, fale direto com a unidade de Dracena ou Junqueirópolis pelo botão flutuante do site.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-navy-900">Formulário de abertura</h2>
                  <Badge tone="outline">Leva 2 minutos</Badge>
                </div>
                <p className="mt-1 text-xs text-muted">Campos com * são obrigatórios.</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Nome completo" htmlFor="name" required error={errors.name} className="sm:col-span-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      className="field-input"
                      placeholder="Como podemos te chamar?"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      required
                    />
                  </Field>

                  <Field label="WhatsApp" htmlFor="phone" required error={errors.phone} hint="Com DDD, para a equipe responder.">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      className="field-input"
                      placeholder="(18) 99999-9999"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                      required
                    />
                  </Field>

                  <Field label="Cidade da empresa" htmlFor="city" required>
                    <select id="city" name="city" value={form.city} onChange={update("city")} className="field-input">
                      <option value="dracena">Dracena/SP</option>
                      <option value="junqueiropolis">Junqueirópolis/SP</option>
                      <option value="outra">Outra cidade da Alta Paulista</option>
                    </select>
                  </Field>

                  <Field label="Qual é o seu momento?" htmlFor="moment" required className="sm:col-span-2">
                    <select id="moment" name="moment" value={form.moment} onChange={update("moment")} className="field-input">
                      {MOMENTS.map((moment) => (
                        <option key={moment.value} value={moment.value}>
                          {moment.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Atividade que pretende exercer" htmlFor="activity" required error={errors.activity} className="sm:col-span-2">
                    <input
                      id="activity"
                      name="activity"
                      type="text"
                      value={form.activity}
                      onChange={update("activity")}
                      className="field-input"
                      placeholder="Ex.: comércio de roupas, cafeteria, consultoria..."
                      aria-invalid={Boolean(errors.activity)}
                      aria-describedby={errors.activity ? "activity-error" : undefined}
                      required
                    />
                  </Field>

                  <Field label="Faturamento anual estimado" htmlFor="revenue" required>
                    <select id="revenue" name="revenue" value={form.revenue} onChange={update("revenue")} className="field-input">
                      {REVENUES.map((revenue) => (
                        <option key={revenue.value} value={revenue.value}>
                          {revenue.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Número de funcionários" htmlFor="employees" required>
                    <select id="employees" name="employees" value={form.employees} onChange={update("employees")} className="field-input">
                      {EMPLOYEES.map((employee) => (
                        <option key={employee.value} value={employee.value}>
                          {employee.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-5">
                  <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-cream-50 p-3.5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={update("consent")}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-navy-900"
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      required
                    />
                    <span className="text-xs leading-5 text-muted">
                      Autorizo a Classe A Contabilidade a entrar em contato e a tratar os meus dados para esta finalidade,
                      conforme a{" "}
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
                    <p id="consent-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700">
                      <Icon name="alert" size={13} />
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b6b45] px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-[#095737]"
                >
                  <WhatsAppIcon size={18} />
                  Enviar pelo WhatsApp
                </button>
                <p className="mt-2.5 text-center text-[0.7rem] leading-5 text-muted">
                  Ao enviar, o WhatsApp será aberto com a sua mensagem. Nenhum dado é salvo neste site.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream-100/60 py-16 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="Antes de abrir, tire as dúvidas mais comuns."
              description="Respostas diretas para você decidir com mais segurança. Se ficar qualquer dúvida, fale com a gente."
            />
            <div className="mt-6">
              <WhatsAppLink
                unit="dracena"
                message="Olá! Tenho uma dúvida sobre abertura de empresa em Junqueirópolis ou Dracena."
                campaign="abrir_empresa_faq"
                content="abrir_empresa_faq"
                variant="outline"
              >
                Tirar uma dúvida no WhatsApp
              </WhatsAppLink>
            </div>
          </div>
          <Accordion items={FAQ_ABRIR} />
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="eyebrow text-gold-600">Cidades atendidas</p>
              <h2 className="mt-2 text-2xl font-semibold text-navy-900">Junqueirópolis e Dracena, com a mesma atenção.</h2>
              <p className="mt-1.5 text-sm text-muted">
                Escolha a unidade mais próxima e fale direto com a nossa equipe.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {UNITS.map((unit) => (
                <WhatsAppLink
                  key={unit.id}
                  unit={unit.id}
                  message={WA_MESSAGES.opening(unit.id)}
                  campaign={`abrir_empresa_unidade_${unit.id}`}
                  content={`abrir_empresa_unidade_${unit.id}`}
                  variant="outline"
                  size="sm"
                >
                  Unidade {unit.city}
                </WhatsAppLink>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Unidade de Junqueirópolis: Rua das Acácias, 120 — Centro · Unidade de Dracena: Av. das Palmeiras, 450 —
            Centro.
          </p>
        </div>
      </section>
    </>
  );
}
