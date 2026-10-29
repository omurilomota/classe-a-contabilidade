import { Link } from "@/lib/router";
import { buildUnitJsonLd, useSeo } from "@/lib/seo";
import { SERVICES, SITE, UNITS, getUnit, type UnitId } from "@/lib/site";
import { WA_MESSAGES } from "@/lib/whatsapp";
import { Icon } from "@/components/Icons";
import { Picture } from "@/components/Picture";
import {
  Accordion,
  Badge,
  Breadcrumbs,
  CheckList,
  SectionHeading,
  WhatsAppLink,
} from "@/components/ui";

const LOCAL_FAQ = (city: string) => [
  {
    question: `A Classe A atende MEI em ${city}?`,
    answer:
      "Sim. A Classe A atende MEI, Simples Nacional e LTDA, com abertura de empresa, contabilidade, folha de pagamento, impostos e assessoria contábil. Se você está começando, a conversa inicial ajuda a escolher o caminho mais adequado.",
  },
  {
    question: `Como trocar de contador em ${city}?`,
    answer:
      "A troca é feita com uma conversa inicial, a organização da documentação e o alinhamento com o contador atual. A Classe A acompanha a transição e assume as obrigações da sua empresa, incluindo o desenquadramento do MEI quando necessário.",
  },
  {
    question: `Onde fica a unidade de ${city}?`,
    answer:
      city === "Dracena"
        ? "A unidade de Dracena fica na Av. das Palmeiras, 450 — Centro. Você pode abrir o mapa da cidade ou falar com a equipe pelo WhatsApp para combinar o melhor horário de atendimento."
        : "A unidade de Junqueirópolis está em processo de confirmação de endereço. Fale com a nossa equipe pelo WhatsApp para receber o endereço completo e o melhor horário de atendimento.",
  },
];

export default function UnidadePage({ unitId }: { unitId: UnitId }) {
  const unit = getUnit(unitId);
  const isDracena = unit.id === "dracena";

  useSeo({
    title: `Contabilidade em ${unit.city}/SP | Classe A Contabilidade`,
    description: `Classe A Contabilidade em ${unit.city}/SP: abertura de empresa, contabilidade geral, folha de pagamento, impostos e troca de contabilidade. ${
      isDracena ? "Av. José Bonifácio, 925 – Centro." : "Unidade na Alta Paulista."
    } Fale com um contador no WhatsApp.`,
    path: `/unidades/${unit.id}`,
    image: unit.image,
    jsonLd: buildUnitJsonLd(unit),
  });

  const faq = LOCAL_FAQ(unit.city);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-8 sm:py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { label: "Início", to: "/" },
              { label: "Unidades", to: "/unidades/junqueiropolis" },
              { label: `${unit.city}/SP` },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="gold" icon="map-pin">
                  Unidade {unit.city}/SP
                </Badge>
                <Badge tone="outline">{isDracena ? "Desde 2023" : "Alta Paulista"}</Badge>
              </div>
              <h1 className="mt-5 text-[2.2rem] leading-[1.08] font-semibold text-navy-900 sm:text-5xl">
                Contabilidade em {unit.city} com a Classe A.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">{unit.description}</p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                    <Icon name="map-pin" size={17} />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">Endereço</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-medium text-navy-900">
                      {unit.address}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                    <Icon name="clock" size={17} />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">Horário</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-medium text-navy-900">
                      {unit.hours}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                    <Icon name="phone" size={17} />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">WhatsApp da unidade</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-medium text-navy-900">
                      {unit.phoneLabel}
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink
                  unit={unit.id}
                  message={WA_MESSAGES.unit(unit.id)}
                  campaign={`unidade_${unit.id}_cta`}
                  content={`unidade_${unit.id}_hero`}
                  size="lg"
                >
                  Falar com a unidade de {unit.city}
                </WhatsAppLink>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900/40 hover:bg-white"
                >
                  <Icon name="map-pin" size={16} />
                  Como chegar
                </a>
              </div>
            </div>

            <div className="animate-fade-up delay-2 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold-500/30" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-navy-900 shadow-lift">
                <Picture
                  src={unit.image}
                  alt={unit.imageAlt}
                  width={1600}
                  height={1000}
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="block aspect-[16/11] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/15 bg-navy-950/70 p-4 text-cream-50 backdrop-blur-md">
                  <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">
                    {isDracena ? "Unidade Dracena" : "Unidade Junqueirópolis"}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {isDracena ? "Av. José Bonifácio, 925 – Centro" : "Junqueirópolis/SP"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-cream-100/75">
                    {isDracena
                      ? "Atendimento próximo, com a estrutura de um escritório com duas unidades."
                      : "Contabilidade e abertura de empresa para quem faz a Alta Paulista acontecer."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-10 sm:py-12">
        <div className="shell grid gap-4 sm:grid-cols-3">
          {[
            { icon: "shield" as const, title: "Equipe própria", text: "Atendimento por pessoas da Classe A, não por robôs." },
            { icon: "map-pin" as const, title: "Proximidade local", text: `Atendimento em ${unit.city} e região da Alta Paulista.` },
            { icon: "clock" as const, title: "Rotina organizada", text: "Prazos e obrigações acompanhados de perto." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-xl border border-line bg-cream-50 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gold-600 shadow-soft">
                <Icon name={item.icon} size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">{item.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow={`Unidade ${unit.city}`}
              title={`Contabilidade em ${unit.city} para quem quer decidir com segurança.`}
              description={`A Classe A Contabilidade atua ao lado de empresários e futuros empresários de ${unit.city} e região. O atendimento é próximo, sem juridiquês, e cobre desde a abertura da empresa até a rotina de obrigações do dia a dia.`}
            />
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
              <p>
                Se você está abrindo o primeiro CNPJ, precisa organizar os impostos ou quer trocar de contador, a nossa
                equipe ajuda a entender o caminho mais adequado para o seu momento. O escritório tem{" "}
                {SITE.yearsInMarket} anos de mercado e duas unidades na Alta Paulista: Junqueirópolis e Dracena.
              </p>
              <p>
                O atendimento pode ser presencial na unidade de {unit.city} ou por WhatsApp, com envio de documentos
                digitais. A ideia é simples: você cuida do negócio, a gente cuida dos números.
              </p>
            </div>
            <CheckList
              className="mt-5"
              items={[
                "Abertura de empresa, MEI, Simples Nacional e LTDA",
                "Contabilidade geral, folha de pagamento e impostos",
                "Troca de contabilidade e desenquadramento do MEI",
              ]}
            />
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <WhatsAppLink
                unit={unit.id}
                message={WA_MESSAGES.unit(unit.id)}
                campaign={`unidade_${unit.id}_conteudo`}
                content={`unidade_${unit.id}_conteudo`}
                variant="whatsapp"
              >
                Falar com um contador em {unit.city}
              </WhatsAppLink>
              <Link
                to="/abrir-empresa"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-50"
              >
                Abrir minha empresa
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                  <Icon name="map-pin" size={16} className="text-gold-600" />
                  Mapa da unidade
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-navy-800 underline decoration-gold-500 underline-offset-2"
                >
                  Abrir o mapa
                </a>
              </div>
              <iframe
                title={`Mapa da unidade da Classe A em ${unit.city}`}
                src={unit.mapsEmbed}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[300px] w-full border-0"
              />
              <div className="p-4">
                <p className="text-xs leading-5 text-muted">
                  {unit.address}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-cream-100/70 p-5">
              <h2 className="text-base font-semibold text-navy-900">Atendimento em {unit.city}</h2>
              <p className="mt-1.5 text-xs leading-5 text-muted">
                Empresários e futuros empresários de {unit.city}, Dracena, Junqueirópolis e demais cidades da Alta Paulista.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="outline">Abertura de empresa</Badge>
                <Badge tone="outline">Contabilidade</Badge>
                <Badge tone="outline">Folha de pagamento</Badge>
                <Badge tone="outline">Impostos</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Serviços na unidade"
            title={`O que a Classe A faz pela sua empresa em ${unit.city}.`}
            description="Um time próprio para cuidar da contabilidade, da folha e dos impostos, com atendimento próximo."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.id} className="rounded-xl border border-line bg-cream-50 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gold-600 shadow-soft">
                  <Icon name={service.icon} size={20} />
                </span>
                <h3 className="mt-3 text-base font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted">{service.short}</p>
                {service.route ? (
                  <Link
                    to={service.route}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600"
                  >
                    Saiba mais
                    <Icon name="arrow-right" size={13} />
                  </Link>
                ) : (
                  <WhatsAppLink
                    unit={unit.id}
                    message={service.whatsappMessage ?? WA_MESSAGES.unit(unit.id)}
                    campaign={`unidade_${unit.id}_${service.campaign}`}
                    content={`unidade_${unit.id}_servico_${service.id}`}
                    variant="ghost"
                    size="sm"
                    className="mt-2 -ml-2 px-2 text-xs text-navy-900 hover:bg-transparent hover:text-gold-600"
                  >
                    Falar sobre este serviço
                  </WhatsAppLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Dúvidas locais"
              title={`Atendimento em ${unit.city}, sem complicação.`}
              description="Se a sua dúvida não estiver aqui, fale com a equipe. A gente explica em linguagem simples."
            />
            <div className="mt-6">
              <WhatsAppLink
                unit={unit.id}
                message={`Olá! Tenho uma dúvida sobre contabilidade em ${unit.city}. Pode me ajudar?`}
                campaign={`unidade_${unit.id}_faq`}
                content={`unidade_${unit.id}_faq`}
                variant="outline"
              >
                Tirar uma dúvida
              </WhatsAppLink>
            </div>
          </div>
          <Accordion items={faq} />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-navy-900 p-6 text-cream-50 shadow-lift sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="eyebrow text-gold-400">Unidade {unit.city}/SP</p>
              <h2 className="mt-2 text-2xl font-semibold text-cream-50">Vamos cuidar dos números da sua empresa?</h2>
              <p className="mt-1.5 text-sm text-navy-100/75">
                Fale com a equipe de {unit.city} pelo WhatsApp. Atendimento sem compromisso.
              </p>
            </div>
            <WhatsAppLink
              unit={unit.id}
              message={WA_MESSAGES.unit(unit.id)}
              campaign={`unidade_${unit.id}_cta_final`}
              content={`unidade_${unit.id}_final`}
              variant="gold"
              size="lg"
            >
              Falar com a unidade
            </WhatsAppLink>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
            <p>
              Classe A Contabilidade · Unidade {unit.city}/SP · {SITE.cnpj}
            </p>
            <div className="flex gap-4">
              {UNITS.filter((other) => other.id !== unit.id).map((other) => (
                <Link key={other.id} to={`/unidades/${other.id}`} className="font-medium text-navy-800 hover:text-gold-600">
                  Ver unidade {other.city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
