import { useEffect, useState } from "react";
import { Icon } from "./Icons";

const CONTACT_SELECTOR = [
  'a[href^="tel:"]',
  'a[href^="mailto:"]',
  'a[href*="wa.me"]',
  'a[href*="api.whatsapp.com"]',
  'a[href*="instagram.com"]',
  'a[href*="facebook.com"]',
].join(",");

/**
 * Aviso global de demonstração.
 *
 * Protege contatos fictícios: qualquer clique em telefone, WhatsApp, e-mail ou
 * rede social abre este diálogo em vez de acionar um canal real. Formulários
 * disparam `demo:contact` no window para o mesmo comportamento.
 */
export function DemoNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (link && link.matches(CONTACT_SELECTOR)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    const onDemoContact = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("demo:contact", onDemoContact);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("demo:contact", onDemoContact);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/65 p-5 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            className="w-full max-w-md rounded-2xl border border-line bg-cream-50 p-6 shadow-lift sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-600">
              <Icon name="info" size={19} />
            </span>
            <p className="mt-4 text-[0.65rem] font-semibold tracking-[0.18em] text-gold-600 uppercase">
              Demonstração
            </p>
            <h2 id="demo-title" className="mt-1 font-serif text-2xl font-semibold text-navy-900">
              Este site é uma peça de portfólio
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Telefone, WhatsApp, e-mail, endereço e redes sociais são fictícios para preservar os
              dados do cliente. Nenhuma mensagem ou solicitação será enviada.
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Para falar sobre o projeto, use o contato do portfólio.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
