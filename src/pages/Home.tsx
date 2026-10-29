import { useState } from "react";
import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import {
  DEADLINES,
  SERVICES,
  SITE,
  STEPS_TROCA,
  TRUST,
  UNITS,
  getIrpfStatus,
  type UnitId,
} from "@/lib/site";
import { WA_MESSAGES } from "@/lib/whatsapp";
import { Icon } from "@/components/Icons";
import { Picture } from "@/components/Picture";
import { Badge, CheckList, SectionHeading, WhatsAppLink } from "@/components/ui";
import { cn } from "@/utils/cn";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Classe A Contabilidade em Junqueirópolis e Dracena/SP",
  description:
    "Contabilidade, abertura de empresa e troca de contabilidade em Junqueirópolis/SP e Dracena/SP. Há 13 anos cuidando dos números de empresas da Alta Paulista.",
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${SITE.url}/#site` },
  about: { "@id": `${SITE.url}/#organizacao` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE.url}/images/hero-consultoria.jpg`,
  },
};

export default function HomePage() {
  useSeo({
    title: "Classe A Contabilidade em Junqueirópolis e Dracena/SP | Abertura de empresa",
    description:
      "Classe A Contabilidade em Junqueirópolis/SP e Dracena/SP. Há 13 anos, abertura de empresa, contabilidade geral, folha de pagamento e troca de contabilidade na Alta Paulista. Fale com um contador no WhatsApp.",
    path: "/",
    jsonLd: HOME_JSON_LD,
  });

  const [unit, setUnit] = useState<UnitId>("dracena");
  const irpf = getIrpfStatus();
  const confirmedDeadlines = DEADLINES.filter((deadline) => deadline.confirmed);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gold-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell relative grid items-center gap-8 py-8 sm:gap-12 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-20">
          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="outline" icon="map-pin">
                Junqueirópolis/SP · Dracena/SP
              </Badge>
              <Badge tone="gold" icon="sparkles">
                Alta Paulista
              </Badge>
            </div>

            <h1 className="mt-5 text-[2.05rem] leading-[1.07] font-semibold tracking-tight text-navy-900 sm:mt-6 sm:text-5xl lg:text-[3.6rem]">
              Classe A Contabilidade em{" "}
              <span className="relative whitespace-nowrap text-navy-800">
                Junqueirópolis
                <svg
                  className="absolute -bottom-2 left-0 h-2.5 w-full text-gold-500"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8c40-6 90-7 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              e Dracena
            </h1>

            <p className="mt-4 font-serif text-lg leading-snug text-navy-800 italic sm:mt-6 sm:text-2xl">
              {SITE.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:mt-4 sm:text-lg sm:leading-7">
              Abertura de empresa, contabilidade e troca de contador para quem faz a Alta Paulista acontecer. Atendimento
              próximo, em linguagem simples, com a segurança de um escritório com duas unidades.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center">
              <WhatsAppLink
                unit={unit}
                message={WA_MESSAGES.home(unit)}
                campaign="home_cta_primario"
                content={`home_hero_${unit}`}
                size="lg"
                className="w-full sm:w-auto"
              >
                Falar com um contador no WhatsApp
              </WhatsAppLink>
              <Link
                to="/abrir-empresa"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy-900/20 bg-white/80 px-6 py-3.5 text-[0.95rem] font-semibold text-navy-900 transition-all hover:border-navy-900/40 hover:bg-white sm:w-auto"
              >
                Abrir minha empresa
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">Atendimento em</p>
              <div
                className="inline-flex rounded-full border border-line bg-white p-1 shadow-soft"
                role="group"
                aria-label="Escolha a unidade de atendimento"
              >
                {UNITS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setUnit(option.id)}
                    aria-pressed={unit === option.id}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                      unit === option.id
                        ? "bg-navy-900 text-white"
                        : "text-muted hover:bg-cream-50 hover:text-navy-900",
                    )}
                  >
                    {option.city}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              <Icon name="shield" size={15} className="text-gold-600" />
              Atendimento humano, sem compromisso. Resposta pelo WhatsApp.
            </p>

            <Link
              to="/prazos-fiscais"
              className="mt-4 inline-flex items-center gap-3 rounded-xl border border-line bg-white/80 px-4 py-2.5 text-left shadow-soft transition-colors hover:border-gold-500/60 hover:bg-white sm:mt-6 sm:py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                <Icon name="calendar" size={18} />
              </span>
              <span>
                <span className="block text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
                  {irpf.phase === "after" ? "Status do prazo" : "Próximo prazo"}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-navy-900">{irpf.badge}</span>
              </span>
              <Icon name="arrow-up-right" size={15} className="ml-2 text-muted" />
            </Link>
          </div>

          <div className="animate-fade-up delay-2 relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-[2rem] border border-gold-500/35 sm:-inset-4"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-navy-900 shadow-lift">
              <Picture
                src="/images/hero-consultoria.jpg"
                alt="Imagem ilustrativa de contadores em uma reunião consultiva com um empresário, em uma sala clara e acolhedora"
                width={1600}
                height={1200}
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="block aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute top-4 right-4 rounded-full border border-white/25 bg-navy-950/55 px-3 py-1.5 text-[0.68rem] font-semibold tracking-wide text-cream-50 backdrop-blur-sm">
                {SITE.yearsInMarket} anos de mercado
              </div>
              <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/15 bg-navy-950/70 p-4 text-cream-50 backdrop-blur-md sm:right-auto sm:left-5 sm:max-w-[17rem]">
                <div className="flex items-center gap-2 text-gold-400">
                  <Icon name="map-pin" size={16} />
                  <span className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase">Duas unidades</span>
                </div>
                <p className="mt-1.5 text-sm font-semibold">Junqueirópolis e Dracena</p>
                <p className="mt-1 text-xs leading-5 text-cream-100/75">
                  Contabilidade próxima de onde a sua empresa acontece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DE CONFIANÇA */}
      <section aria-label="Nossos números" className="border-y border-line bg-white">
        <div className="shell grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {TRUST.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-2 py-6 sm:justify-center sm:px-6">
              <p className="font-serif text-3xl leading-none font-semibold text-navy-900 sm:text-4xl">{item.value}</p>
              <div>
                <p className="text-sm font-semibold text-navy-900">{item.label}</p>
                <p className="mt-0.5 text-xs leading-5 text-muted">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="O que fazemos"
              title="A rotina contábil da sua empresa, resolvida."
              description="Do primeiro CNPJ à troca de contador, você tem um time próprio cuidando das obrigações para poder focar no negócio."
            />
            <Link
              to="/abrir-empresa"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
            >
              Ainda não tem empresa? Comece aqui
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-600 transition-colors group-hover:bg-navy-900 group-hover:text-gold-400">
                  <Icon name={service.icon} size={24} />
                </span>
                <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.16em] text-gold-600 uppercase">{service.short}</p>
                <h3 className="mt-1.5 text-xl font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{service.description}</p>
                <div className="mt-5 border-t border-line pt-4">
                  {service.route ? (
                    <Link
                      to={service.route}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
                    >
                      Entender o passo a passo
                      <Icon name="arrow-right" size={15} />
                    </Link>
                  ) : (
                    <WhatsAppLink
                      unit="dracena"
                      message={service.whatsappMessage ?? WA_MESSAGES.home("dracena")}
                      campaign={service.campaign}
                      content="home_servicos"
                      variant="ghost"
                      size="sm"
                      className="-ml-2 px-2 text-navy-900 hover:bg-transparent hover:text-gold-600"
                    >
                      Falar sobre este serviço
                    </WhatsAppLink>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-cream-100/70 p-5 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">
              <strong className="font-semibold text-navy-900">Não encontrou o que precisa?</strong> A gente avalia o seu caso
              e indica o melhor caminho.
            </p>
            <WhatsAppLink
              unit="dracena"
              message="Olá! Vi o site da Classe A Contabilidade e tenho uma dúvida sobre os serviços de contabilidade."
              campaign="home_servicos_duvida"
              content="home_servicos"
              variant="outline"
              size="sm"
            >
              Tirar uma dúvida
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* TROCA DE CONTABILIDADE */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20 lg:py-24">
        <div className="bg-dots-gold pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Troca de contabilidade"
              tone="dark"
              title="Trocar de contador pode ser simples. A gente cuida da transição."
              description="Sem burocracia e sem deixar prazos para trás: organizamos a documentação, alinhamos com o contador atual e assumimos a rotina da sua empresa."
            />
            <CheckList
              tone="dark"
              className="mt-7"
              items={[
                "Transição acompanhada de ponta a ponta",
                "Desenquadramento do MEI incluído no processo",
                "Nenhuma obrigação fica para depois",
              ]}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink
                unit="dracena"
                message={WA_MESSAGES.switching("dracena")}
                campaign="home_troca_contabilidade"
                content="home_troca"
                variant="gold"
                size="lg"
              >
                Quero trocar de contabilidade
              </WhatsAppLink>
              <Link
                to="/abrir-empresa"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:border-gold-500/60 hover:bg-white/5"
              >
                Estou abrindo uma empresa
              </Link>
            </div>
          </div>

          <ol className="relative space-y-4">
            {STEPS_TROCA.map((step, index) => (
              <li key={step.number} className="relative flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:gap-5 sm:p-6">
                <div className="flex flex-col items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 font-serif text-lg font-semibold text-gold-400">
                    {step.number}
                  </span>
                  {index < STEPS_TROCA.length - 1 && (
                    <span className="mt-2 hidden w-px flex-1 bg-gradient-to-b from-gold-500/40 to-transparent sm:block" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cream-50">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-navy-100/80">{step.text}</p>
                </div>
              </li>
            ))}
            <li className="flex items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-3 text-xs leading-5 text-gold-200">
              <Icon name="info" size={15} className="shrink-0" />
              A troca pode ser feita a qualquer momento, sem interromper as obrigações da sua empresa.
            </li>
          </ol>
        </div>
      </section>

      {/* PRAZOS */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Prazos fiscais"
              title="O próximo prazo não pode ser uma surpresa."
              description="Acompanhe as datas divulgadas pelo escritório e receba lembretes para organizar a sua empresa com antecedência."
            />
            <Link
              to="/prazos-fiscais"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
            >
              Ver calendário completo
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900 p-6 text-cream-50 shadow-lift sm:p-8">
              <div className="bg-dots-gold pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="light" icon="calendar">
                    {irpf.phase === "after" ? "Status do prazo" : "Próximo prazo"}
                  </Badge>
                  <span className="text-xs text-cream-100/60">IRPF 2026</span>
                </div>
                <p className="mt-5 font-serif text-2xl leading-tight font-semibold text-cream-50 sm:text-3xl">{irpf.title}</p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-navy-100/80">{irpf.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-cream-50">
                    <Icon name="calendar" size={14} className="text-gold-400" />
                    {irpf.startLabel} a {irpf.endLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-cream-50">
                    <Icon name="clock" size={14} className="text-gold-400" />
                    {irpf.phase === "after" ? "Prazo encerrado" : "Data divulgada pelo escritório"}
                  </span>
                </div>
                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                  <Link
                    to="/prazos-fiscais"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
                  >
                    Receber lembretes
                    <Icon name="arrow-right" size={16} />
                  </Link>
                  <WhatsAppLink
                    unit="dracena"
                    message={WA_MESSAGES.deadlines("dracena")}
                    campaign="home_prazos"
                    content="home_prazos"
                    variant="light"
                    size="md"
                  >
                    Falar sobre prazos
                  </WhatsAppLink>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-navy-900">Calendário do escritório</h3>
                <Badge tone="success" icon="check">
                  {confirmedDeadlines.length} confirmado
                </Badge>
              </div>
              <ul className="mt-4 divide-y divide-line">
                {confirmedDeadlines.map((deadline) => (
                  <li key={deadline.id} className="flex items-start gap-3 py-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                      <Icon name="file" size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{deadline.title}</p>
                      <p className="mt-0.5 text-xs text-muted">{deadline.dateLabel}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-cream-50 p-3 text-xs leading-5 text-muted">
                Fale com a gente para receber o calendário completo de obrigações da sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSA ESTRUTURA */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Nossa estrutura"
              title="Um escritório de verdade, com gente de verdade."
              description="Salas de atendimento e reunião preparadas para receber você em Junqueirópolis e Dracena."
            />
            <Badge tone="warning" icon="info" className="w-fit">
              Imagens ilustrativas
            </Badge>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <figure className="group relative overflow-hidden rounded-2xl border border-line bg-navy-900 shadow-soft">
              <Picture
                src="/images/hero-consultoria.jpg"
                alt="Imagem ilustrativa de contadores em uma reunião consultiva com um empresário em um escritório iluminado"
                width={1600}
                height={1200}
                sizes="(max-width: 1024px) 92vw, 55vw"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                className="block aspect-[16/10] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/15 to-transparent" aria-hidden="true" />
              <figcaption className="absolute right-5 bottom-5 left-5">
                <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">Atendimento consultivo</p>
                <p className="mt-1 font-serif text-lg font-semibold text-cream-50 sm:text-xl">
                  Conversa próxima, sem juridiquês.
                </p>
              </figcaption>
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  src: "/images/unidade-junqueiropolis",
                  alt: "Imagem ilustrativa da recepção de um escritório de contabilidade em Junqueirópolis, com mesa clara e poltronas",
                  city: "Junqueirópolis",
                  label: "Recepção da unidade",
                },
                {
                  src: "/images/unidade-dracena",
                  alt: "Imagem ilustrativa da sala de reunião de um escritório de contabilidade em Dracena, com mesa de madeira clara",
                  city: "Dracena",
                  label: "Sala de reunião da unidade",
                },
              ].map((photo) => (
                <figure key={photo.src} className="group relative overflow-hidden rounded-2xl border border-line bg-navy-900 shadow-soft">
                  <Picture
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 28vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                    className="block aspect-[16/9] w-full lg:aspect-[16/8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" aria-hidden="true" />
                  <figcaption className="absolute right-4 bottom-4 left-4">
                    <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">{photo.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-cream-50">{photo.city}/SP</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Onde estamos"
              title="Duas unidades, a mesma proximidade."
              description="Atendimento em Junqueirópolis e Dracena, com estrutura para acompanhar a sua empresa de perto."
            />
            <Badge tone="outline" icon="map-pin" className="w-fit">
              {SITE.region} · SP
            </Badge>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {UNITS.map((unit) => (
              <article key={unit.id} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <div className="relative overflow-hidden">
                  <Picture
                    src={unit.image}
                    alt={unit.imageAlt}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 768px) 92vw, 45vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                    className="block aspect-[16/10] w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4">
                    <Badge tone="light">{unit.highlight}</Badge>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl font-semibold text-navy-900">
                    {unit.city}
                    <span className="text-muted">/{unit.state}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted">
                    <li className="flex items-start gap-2.5">
                      <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-gold-600" />
                      <span className="flex flex-wrap items-center gap-2">
                        {unit.address}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-gold-600" />
                      <span>{unit.hours}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-gold-600" />
                      <span>WhatsApp da unidade: {unit.phoneLabel}</span>
                    </li>
                  </ul>
                  <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center">
                    <WhatsAppLink
                      unit={unit.id}
                      message={WA_MESSAGES.unit(unit.id)}
                      campaign={`home_unidade_${unit.id}`}
                      content={`home_unidade_${unit.id}`}
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Falar com a unidade
                    </WhatsAppLink>
                    <Link
                      to={`/unidades/${unit.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
                    >
                      Conhecer a unidade
                      <Icon name="arrow-right" size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-16 sm:pb-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-900 px-6 py-12 text-center shadow-lift sm:px-10 sm:py-16">
            <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <Badge tone="light" icon="sparkles">
                Vamos conversar?
              </Badge>
              <h2 className="mt-5 text-3xl leading-tight font-semibold text-cream-50 sm:text-4xl">
                Sua empresa pode contar com um time que entende de números e de gente.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-navy-100/80 sm:text-base">
                Conte o seu momento para a nossa equipe. A gente indica o caminho mais seguro para abrir, crescer ou trocar
                de contabilidade.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <WhatsAppLink
                  unit="dracena"
                  message="Olá! Vi o site da Classe A Contabilidade e quero conversar sobre a minha empresa em Junqueirópolis ou Dracena."
                  campaign="home_cta_final"
                  content="home_final"
                  variant="gold"
                  size="lg"
                >
                  Falar com um contador no WhatsApp
                </WhatsAppLink>
                <Link
                  to="/abrir-empresa"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:border-gold-500/60 hover:bg-white/5"
                >
                  Abrir minha empresa
                  <Icon name="arrow-right" size={16} />
                </Link>
              </div>
              <p className="mt-5 text-xs text-cream-100/55">
                Unidades em Junqueirópolis/SP e Dracena/SP · {SITE.instagram.handle}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
