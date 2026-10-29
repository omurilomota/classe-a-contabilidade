import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@/lib/router";
import { SITE, UNITS } from "@/lib/site";
import { WA_MESSAGES, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/utils/cn";
import { FacebookIcon, Icon, InstagramIcon, WhatsAppIcon } from "./Icons";
import { DemoNotice } from "./DemoNotice";

const NAV_ITEMS = [
  { label: "Início", to: "/" },
  { label: "Abrir empresa", to: "/abrir-empresa" },
  { label: "Simulador", to: "/simulador" },
  { label: "Prazos fiscais", to: "/prazos-fiscais" },
  { label: "Institucional", to: "/institucional" },
];

function isActive(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex shrink-0 items-center gap-3"
      aria-label="Classe A Contabilidade — ir para a página inicial"
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 shadow-soft transition-transform duration-200 group-hover:-translate-y-0.5">
        <span className="font-serif text-[1.6rem] leading-none font-semibold text-gold-500">A</span>
        <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-cream-50 bg-gold-500" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.35rem] font-semibold tracking-tight text-navy-900">Classe A</span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.26em] text-muted uppercase">Contabilidade</span>
      </span>
    </Link>
  );
}

function Header({ path }: { path: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);
  const unitsRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setUnitsOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    panel?.querySelector<HTMLAnchorElement>("a, button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!unitsOpen) return;
    const onClick = (event: MouseEvent) => {
      if (!unitsRef.current?.contains(event.target as Node)) setUnitsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setUnitsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [unitsOpen]);

  const unitsActive = path.startsWith("/unidades");

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy-950 text-cream-100">
        <div className="shell flex h-9 items-center justify-between gap-4 text-[0.7rem]">
          <p className="flex items-center gap-1.5">
            <Icon name="map-pin" size={13} className="text-gold-400" />
            <span>Junqueirópolis/SP</span>
            <span aria-hidden="true" className="text-cream-300/60">
              ·
            </span>
            <span>Dracena/SP</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden text-cream-100/75 sm:inline">Alta Paulista · {SITE.yearsInMarket} anos de mercado</span>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-gold-300"
            >
              <InstagramIcon size={13} />
              <span>{SITE.instagram.handle}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-cream-50/95 backdrop-blur-md">
        <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
          <Logo onClick={() => setMobileOpen(false)} />

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive(path, item.to) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(path, item.to)
                    ? "bg-navy-900/5 text-navy-900"
                    : "text-muted hover:bg-navy-900/5 hover:text-navy-900",
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={unitsRef}>
              <button
                type="button"
                onClick={() => setUnitsOpen((open) => !open)}
                aria-expanded={unitsOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  unitsActive ? "bg-navy-900/5 text-navy-900" : "text-muted hover:bg-navy-900/5 hover:text-navy-900",
                )}
              >
                Unidades
                <Icon name="chevron-down" size={14} className={cn("transition-transform", unitsOpen && "rotate-180")} />
              </button>
              {unitsOpen && (
                <div className="animate-fade-in absolute top-full left-0 mt-2 w-72 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                  {UNITS.map((unit) => (
                    <Link
                      key={unit.id}
                      to={`/unidades/${unit.id}`}
                      onClick={() => setUnitsOpen(false)}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-cream-50"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                        <Icon name="map-pin" size={16} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">{unit.city}/SP</span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted">
                          {unit.address}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-line px-3 pt-3 pb-1">
                    <p className="text-xs leading-5 text-muted">
                      Atendimento em toda a região da Alta Paulista.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/institucional"
              aria-current={isActive(path, "/institucional") ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(path, "/institucional")
                  ? "bg-navy-900/5 text-navy-900"
                  : "text-muted hover:bg-navy-900/5 hover:text-navy-900",
              )}
            >
              Institucional
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={buildWhatsAppUrl({
                unit: "dracena",
                message: WA_MESSAGES.general,
                campaign: "whatsapp_header",
                content: "header",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-800 sm:inline-flex"
            >
              <WhatsAppIcon size={16} className="text-gold-400" />
              Falar com um contador
            </a>
            <button
              ref={mobileButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-navy-900 xl:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          className="animate-fade-in max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-b border-line bg-cream-50 shadow-lift xl:hidden"
        >
          <nav aria-label="Navegação mobile" className="shell flex flex-col gap-1 py-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(path, item.to) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium",
                  isActive(path, item.to) ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-line pt-3">
              <p className="px-4 pb-2 text-[0.68rem] font-semibold tracking-[0.18em] text-muted uppercase">Unidades</p>
              {UNITS.map((unit) => (
                <Link
                  key={unit.id}
                  to={`/unidades/${unit.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-navy-900 hover:bg-white"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium">
                    <Icon name="map-pin" size={16} className="text-gold-600" />
                    {unit.city}/SP
                  </span>
                  <Icon name="arrow-up-right" size={15} className="text-muted" />
                </Link>
              ))}
            </div>
            <a
              href={buildWhatsAppUrl({
                unit: "dracena",
                message: WA_MESSAGES.general,
                campaign: "whatsapp_header_mobile",
                content: "header_mobile",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3.5 text-sm font-semibold text-white"
            >
              <WhatsAppIcon size={17} className="text-gold-400" />
              Falar com um contador no WhatsApp
            </a>
            <p className="mt-2 px-4 text-xs leading-5 text-muted">
              Unidades em Junqueirópolis e Dracena. Atendimento em toda a Alta Paulista.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-100">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3" aria-label="Classe A Contabilidade — página inicial">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <span className="font-serif text-[1.6rem] leading-none font-semibold text-gold-500">A</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[1.35rem] font-semibold text-cream-50">Classe A</span>
                <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.26em] text-cream-100/60 uppercase">
                  Contabilidade
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-cream-100/70">
              {SITE.tagline} Há {SITE.yearsInMarket} anos ao lado de empresários de Junqueirópolis, Dracena e região da
              Alta Paulista.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SITE.instagram.handle}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream-100 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SITE.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook: ${SITE.facebook.name}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream-100 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <FacebookIcon size={18} />
              </a>
              <span className="ml-2 text-xs text-cream-100/55">{SITE.instagram.handle}</span>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.18em] text-gold-400 uppercase">Navegação</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "Início", to: "/" },
                { label: "Abrir empresa", to: "/abrir-empresa" },
                { label: "Simulador de regime", to: "/simulador" },
                { label: "Prazos fiscais", to: "/prazos-fiscais" },
                { label: "Institucional", to: "/institucional" },
                { label: "Política de privacidade", to: "/politica-de-privacidade" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-cream-100/70 transition-colors hover:text-gold-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços no rodapé">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.18em] text-gold-400 uppercase">Serviços</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Abertura de empresa",
                "Contabilidade geral",
                "Folha de pagamento",
                "Impostos",
                "Troca de contabilidade",
                "Assessoria contábil",
              ].map((service) => (
                <li key={service}>
                  <Link to="/abrir-empresa" className="text-cream-100/70 transition-colors hover:text-gold-400">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.7rem] font-semibold tracking-[0.18em] text-gold-400 uppercase">Unidades</h2>
            <ul className="mt-4 space-y-4 text-sm">
              {UNITS.map((unit) => (
                <li key={unit.id}>
                  <Link to={`/unidades/${unit.id}`} className="font-semibold text-cream-50 hover:text-gold-400">
                    {unit.city}/SP
                  </Link>
                  <p className="mt-1 text-xs leading-5 text-cream-100/60">
                    {unit.address}
                  </p>
                  <p className="mt-1 text-xs text-cream-100/50">WhatsApp {unit.phoneLabel}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2 text-xs text-cream-100/60">
              <Icon name="clock" size={14} className="text-gold-400" />
              Segunda a sexta, 8h às 18h
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 text-cream-100/60 sm:p-5">
          <p>
            <strong className="font-semibold text-cream-100">Classe A Contabilidade</strong> · Unidades em Junqueirópolis/SP e
            Dracena/SP · CNPJ {SITE.cnpj}
          </p>
          <p className="mt-1.5">
            Site de demonstração: contatos, endereços, CNPJ e números de WhatsApp são fictícios. Nenhuma mensagem será
            enviada.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Classe A Contabilidade. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/politica-de-privacidade" className="transition-colors hover:text-gold-400">
              Política de privacidade
            </Link>
            <span>Feito para a Alta Paulista.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl({
        unit: "dracena",
        message: WA_MESSAGES.general,
        campaign: "whatsapp_flutuante",
        content: "home",
      })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com um contador da Classe A no WhatsApp"
      className="group fixed right-4 bottom-5 z-50 flex items-center gap-2 rounded-full bg-navy-900 py-3 pr-4 pl-3 text-white shadow-lift ring-1 ring-gold-500/40 transition-all duration-300 hover:bg-navy-800 hover:ring-gold-500 sm:right-6 sm:bottom-6"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-navy-950">
        <WhatsAppIcon size={18} />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">Fale com um contador</span>
      <span className="sr-only sm:hidden">Fale com um contador no WhatsApp</span>
    </a>
  );
}

export function Layout({ children, path }: { children: ReactNode; path: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header path={path} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <DemoNotice />
    </div>
  );
}
