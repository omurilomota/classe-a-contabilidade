import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { WA_MESSAGES } from "@/lib/whatsapp";
import { Icon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/ui";

export default function NotFoundPage() {
  useSeo({
    title: "Página não encontrada | Classe A Contabilidade",
    description:
      "A página que você procura não foi encontrada. Volte para a página inicial da Classe A Contabilidade em Junqueirópolis e Dracena/SP.",
    path: "/404",
    noindex: true,
  });

  return (
    <section className="relative overflow-hidden bg-cream-50 py-20 sm:py-28">
      <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative max-w-2xl text-center">
        <p className="font-serif text-6xl font-semibold text-gold-600 sm:text-7xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl">Página não encontrada.</h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          O endereço que você tentou acessar não existe ou foi movido. Mas a sua empresa pode continuar no caminho certo:
          fale com a nossa equipe ou volte para o início.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Voltar para o início
            <Icon name="arrow-right" size={16} />
          </Link>
          <WhatsAppLink
            unit="dracena"
            message={WA_MESSAGES.home("dracena")}
            campaign="404_whatsapp"
            content="404"
            variant="outline"
          >
            Falar com um contador
          </WhatsAppLink>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted">
          <Link to="/abrir-empresa" className="hover:text-navy-900">
            Abrir empresa
          </Link>
          <Link to="/simulador" className="hover:text-navy-900">
            Simulador de regime
          </Link>
          <Link to="/prazos-fiscais" className="hover:text-navy-900">
            Prazos fiscais
          </Link>
          <Link to="/unidades/dracena" className="hover:text-navy-900">
            Unidade Dracena
          </Link>
          <Link to="/unidades/junqueiropolis" className="hover:text-navy-900">
            Unidade Junqueirópolis
          </Link>
        </div>
      </div>
    </section>
  );
}
