import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { SITE, UNITS, VALUES } from "@/lib/site";
import { WA_MESSAGES } from "@/lib/whatsapp";
import { FacebookIcon, Icon, InstagramIcon } from "@/components/Icons";
import { Picture } from "@/components/Picture";
import { Badge, Breadcrumbs, CheckList, SectionHeading, WhatsAppLink } from "@/components/ui";

const INSTITUCIONAL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Institucional — Classe A Contabilidade",
  description:
    "Conheça a história, os valores e a equipe da Classe A Contabilidade, com unidades em Junqueirópolis/SP e Dracena/SP.",
  inLanguage: "pt-BR",
  mainEntity: {
    "@type": "AccountingService",
    "@id": `${SITE.url}/#organizacao`,
    name: SITE.name,
    url: SITE.url,
    slogan: SITE.tagline,
    description:
      "Escritório de contabilidade com unidades em Junqueirópolis/SP e Dracena/SP, fundado em 2013, com expansão para Dracena em 2023.",
    areaServed: [
      { "@type": "City", name: "Junqueirópolis", address: { "@type": "PostalAddress", "addressRegion": "SP", "addressCountry": "BR" } },
      { "@type": "City", name: "Dracena", address: { "@type": "PostalAddress", "addressRegion": "SP", "addressCountry": "BR" } },
    ],
    sameAs: [SITE.instagram.url],
    knowsAbout: [
      "Abertura de empresa",
      "Contabilidade geral",
      "Folha de pagamento",
      "Impostos",
      "Assessoria contábil",
      "Troca de contabilidade",
      "Desenquadramento do MEI",
    ],
  },
};

const TIMELINE = [
  {
    period: "O começo",
    title: "Uma contabilidade próxima, em Junqueirópolis",
    text: "A Classe A começou a construir sua história na Alta Paulista em 2013, com a ideia de oferecer uma contabilidade acessível, humana e sem juridiquês.",
  },
  {
    period: "2023",
    title: "Expansão para Dracena",
    text: "A Classe A abriu a unidade de Dracena, na Av. José Bonifácio, 925 – Centro, ampliando o atendimento a empresários e futuros empresários da região.",
    confirmed: true,
  },
  {
    period: "Hoje",
    title: "Duas unidades, uma equipe própria",
    text: "São 13 anos de mercado, duas unidades e um time próprio acompanhando a rotina contábil de empresas de Junqueirópolis, Dracena e região.",
    confirmed: true,
  },
  {
    period: "Próximo capítulo",
    title: "Crescer junto com a região",
    text: "Seguimos acompanhando o desenvolvimento da Alta Paulista, com atendimento próximo e estrutura para apoiar quem quer abrir, crescer ou trocar de contabilidade.",
    confirmed: true,
  },
];

export default function InstitucionalPage() {
  useSeo({
    title: "Institucional | Classe A Contabilidade em Junqueirópolis e Dracena/SP",
    description:
      "Conheça a Classe A Contabilidade: 13 anos de mercado, unidades em Junqueirópolis/SP e Dracena/SP, valores e equipe. Atendimento humano para empresários da Alta Paulista.",
    path: "/institucional",
    image: "/images/equipe.jpg",
    jsonLd: INSTITUCIONAL_JSON_LD,
  });

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-8 sm:py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Institucional" }]} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="animate-fade-up">
              <Badge tone="gold" icon="heart">
                Institucional
              </Badge>
              <h1 className="mt-5 text-[2.2rem] leading-[1.08] font-semibold text-navy-900 sm:text-5xl">
                Gente que cuida de números e de relações.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                A Classe A Contabilidade nasceu na Alta Paulista com uma ideia simples: contabilidade boa é aquela que você
                entende. Há 13 anos, unimos técnica e proximidade para apoiar empresários de Junqueirópolis, Dracena e
                região.
              </p>
              <CheckList
                className="mt-6"
                items={[
                  "13 anos de mercado",
                  "Duas unidades: Junqueirópolis/SP e Dracena/SP",
                  "Equipe própria e atendimento próximo",
                ]}
              />
              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <WhatsAppLink
                  unit="dracena"
                  message={WA_MESSAGES.institutional()}
                  campaign="institucional_cta"
                  content="institucional_hero"
                  size="lg"
                >
                  Conversar com a nossa equipe
                </WhatsAppLink>
                <Link
                  to="/unidades/dracena"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900/40 hover:bg-white"
                >
                  Conhecer as unidades
                  <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </div>

            <div className="animate-fade-up delay-2 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold-500/30" aria-hidden="true" />
              <figure className="relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-navy-900 shadow-lift">
                <Picture
                  src="/images/equipe"
                  alt="Imagem ilustrativa de uma equipe de contadores reunida em um escritório claro, com vestimentas profissionais e expressões acolhedoras"
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="block aspect-[16/11] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" aria-hidden="true" />
                <figcaption className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/15 bg-navy-950/70 p-4 text-cream-50 backdrop-blur-md">
                  <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">Nosso time</p>
                  <p className="mt-1 text-sm font-semibold">Imagem ilustrativa da equipe</p>
                  <p className="mt-1 text-xs leading-5 text-cream-100/75">
                    Estrutura de atendimento da Classe A.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Nossa história"
            title="Uma trajetória construída na Alta Paulista."
            description="De Junqueirópolis para Dracena, a Classe A cresceu mantendo o que importa: atendimento próximo e compromisso com o prazo."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((item) => (
              <li key={item.title} className="relative rounded-2xl border border-line bg-cream-50 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.confirmed ? "navy" : "warning"}>{item.period}</Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-navy-900">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted">
            <Icon name="info" size={14} className="mt-0.5 shrink-0 text-gold-600" />
            O ano exato de fundação será confirmado com o cliente e publicado aqui.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Nossos valores"
            title="O jeito Classe A de cuidar da sua empresa."
            description="Princípios que orientam o atendimento e a relação com quem confia no nosso trabalho."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <article key={value.title} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 font-serif text-lg font-semibold text-gold-600">
                    0{index + 1}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-navy-900">{value.title}</h2>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{value.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-100/60 py-14 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Nossos espaços"
              title="Um ambiente pensado para conversar, não para intimidar."
              description="Ambientes que recebem os nossos clientes em Junqueirópolis e Dracena."
            />
            <Badge tone="warning" icon="info">
              Imagens ilustrativas
            </Badge>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                src: "/images/hero-consultoria.jpg",
                alt: "Imagem ilustrativa de um atendimento consultivo em uma sala clara, com contadores e um empresário",
                caption: "Atendimento próximo",
              },
              {
                src: "/images/unidade-junqueiropolis.jpg",
                alt: "Imagem ilustrativa da recepção de um escritório de contabilidade, com mesa clara e detalhes em azul-marinho",
                caption: "Recepção Junqueirópolis",
              },
              {
                src: "/images/unidade-dracena.jpg",
                alt: "Imagem ilustrativa de uma sala de reunião de escritório de contabilidade, com mesa de madeira e janela ampla",
                caption: "Sala de reunião Dracena",
              },
            ].map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <Picture
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 640px) 92vw, 30vw"
                  className="block aspect-[4/3] w-full"
                />
                <figcaption className="px-4 py-3 text-xs font-medium text-muted">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Por que a Classe A"
              title="A estrutura de um escritório, a proximidade de quem está perto."
              description="Duas unidades na Alta Paulista e uma equipe própria para acompanhar a sua empresa de perto, sem você precisar repetir a história toda."
            />
            <CheckList
              className="mt-5"
              items={[
                "Atendimento em Junqueirópolis e Dracena",
                "Contabilidade, folha, impostos e assessoria no mesmo lugar",
                "Troca de contabilidade e desenquadramento do MEI",
                "Linguagem simples, sem juridiquês",
              ]}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {UNITS.map((unit) => (
              <div key={unit.id} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                  <Icon name="map-pin" size={19} />
                </span>
                <h2 className="mt-3 text-lg font-semibold text-navy-900">
                  {unit.city}/{unit.state}
                </h2>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {unit.address}
                </p>
                <Link
                  to={`/unidades/${unit.id}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600"
                >
                  Ver unidade
                  <Icon name="arrow-right" size={13} />
                </Link>
              </div>
            ))}
            <div className="rounded-2xl border border-line bg-cream-50 p-5 sm:col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gold-600 shadow-soft">
                  <InstagramIcon size={19} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Acompanhe a Classe A</p>
                  <p className="text-xs text-muted">{SITE.instagram.handle} · Facebook</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:border-gold-500"
                >
                  <InstagramIcon size={14} />
                  Instagram
                </a>
                <a
                  href={SITE.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:border-gold-500"
                >
                  <FacebookIcon size={14} />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-navy-900 p-6 text-cream-50 shadow-lift sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="eyebrow text-gold-400">Vamos conversar</p>
              <h2 className="mt-2 text-2xl font-semibold text-cream-50">Você cuida do negócio. A gente cuida dos números.</h2>
              <p className="mt-1.5 text-sm text-navy-100/75">
                Fale com a equipe da Classe A em Junqueirópolis ou Dracena.
              </p>
            </div>
            <WhatsAppLink
              unit="dracena"
              message={WA_MESSAGES.institutional()}
              campaign="institucional_cta_final"
              content="institucional_final"
              variant="gold"
              size="lg"
            >
              Falar com um contador
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
