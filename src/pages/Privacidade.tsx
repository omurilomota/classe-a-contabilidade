import { Link } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { SITE, UNITS } from "@/lib/site";
import { Icon } from "@/components/Icons";
import { Badge, Breadcrumbs } from "@/components/ui";

const SECTIONS = [
  { id: "quem-somos", label: "Quem somos" },
  { id: "dados", label: "Dados que coletamos" },
  { id: "finalidade", label: "Para que usamos" },
  { id: "bases", label: "Bases legais" },
  { id: "compartilhamento", label: "Compartilhamento" },
  { id: "retencao", label: "Retenção" },
  { id: "direitos", label: "Seus direitos" },
  { id: "cookies", label: "Cookies" },
  { id: "seguranca", label: "Segurança" },
  { id: "contato", label: "Como falar com a gente" },
  { id: "alteracoes", label: "Alterações" },
];

export default function PrivacidadePage() {
  useSeo({
    title: "Política de Privacidade | Classe A Contabilidade",
    description:
      "Política de Privacidade da Classe A Contabilidade. Saiba como tratamos seus dados, seus direitos como titular e como exercer o consentimento, conforme a LGPD.",
    path: "/politica-de-privacidade",
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="shell relative py-8 sm:py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Início", to: "/" }, { label: "Política de Privacidade" }]} />
          <div className="max-w-3xl">
            <Badge tone="gold" icon="shield">
              LGPD
            </Badge>
            <h1 className="mt-5 text-[2.2rem] leading-[1.08] font-semibold text-navy-900 sm:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Esta página explica, em linguagem simples, como a Classe A Contabilidade trata os seus dados pessoais quando
              você navega no site, preenche formulários ou fala com a nossa equipe pelo WhatsApp.
            </p>
            <p className="mt-3 text-xs text-muted">
              Última atualização: outubro de 2026
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="shell grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-12">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
              <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">Nesta página</p>
              <nav aria-label="Índice da política de privacidade" className="mt-3">
                <ul className="space-y-1">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(section.id)}
                        className="w-full rounded-lg px-2 py-1.5 text-left text-sm text-muted transition-colors hover:bg-cream-50 hover:text-navy-900"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-4 rounded-2xl border border-gold-200 bg-gold-50 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                <Icon name="shield" size={17} className="text-gold-600" />
                Resumo rápido
              </p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-muted">
                <li>Não vendemos os seus dados.</li>
                <li>Você pode revogar o consentimento quando quiser.</li>
                <li>Fale com a gente para exercer os seus direitos.</li>
              </ul>
            </div>
          </aside>

          <div className="prose-lgpd min-w-0">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7">
              <h2 id="quem-somos" className="scroll-mt-28">
                1. Quem somos
              </h2>
              <p>
                A <strong>Classe A Contabilidade</strong> é um escritório de contabilidade com unidades em Junqueirópolis/SP e
                Dracena/SP. Para fins da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), a Classe A atua como
                controladora dos dados pessoais tratados neste site.
              </p>
              <ul>
                <li>Unidade Dracena: Av. das Palmeiras, 450 — Centro, Dracena/SP.</li>
                <li>Unidade Junqueirópolis: Rua das Acácias, 120 — Centro, Junqueirópolis/SP.</li>
                <li>CNPJ: {SITE.cnpj}</li>
                <li>E-mail de contato: {SITE.email}</li>
              </ul>

              <h2 id="dados" className="scroll-mt-28">
                2. Quais dados coletamos
              </h2>
              <p>Coletamos apenas os dados necessários para responder ao seu contato e prestar os nossos serviços:</p>
              <ul>
                <li>
                  <strong>Dados fornecidos por você:</strong> nome, e-mail, WhatsApp, cidade, atividade, faturamento
                  estimado, número de funcionários e outras informações que você decidir compartilhar nos formulários ou na
                  conversa.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> informações técnicas essenciais para o funcionamento do site, como
                  endereço IP, tipo de navegador e páginas visitadas, quando registradas pelo provedor de hospedagem.
                </li>
                <li>
                  <strong>Cookies:</strong> utilizamos apenas cookies essenciais para o funcionamento do site e para lembrar
                  a sua escolha no aviso de cookies.
                </li>
              </ul>
              <p>
                Este site não possui servidor próprio de banco de dados. Os formulários montam a mensagem no seu navegador e
                abrem o WhatsApp para que você conclua o contato. Nenhum dado de formulário é armazenado neste site.
              </p>

              <h2 id="finalidade" className="scroll-mt-28">
                3. Para que usamos os seus dados
              </h2>
              <ul>
                <li>Responder solicitações de contato, dúvidas e pedidos de orientação.</li>
                <li>Enviar lembretes de prazos fiscais, quando você autorizar.</li>
                <li>Prestar serviços de contabilidade, abertura de empresa, folha de pagamento e assessoria.</li>
                <li>Cumprir obrigações legais e regulatórias aplicáveis ao escritório.</li>
                <li>Melhorar a experiência de navegação e a segurança do site.</li>
              </ul>
              <p>Não utilizamos os seus dados para decisões automatizadas com efeitos jurídicos ou financeiros.</p>

              <h2 id="bases" className="scroll-mt-28">
                4. Bases legais do tratamento
              </h2>
              <ul>
                <li>
                  <strong>Consentimento:</strong> quando você preenche um formulário ou autoriza o recebimento de lembretes.
                </li>
                <li>
                  <strong>Legítimo interesse:</strong> para responder contatos, manter a segurança do site e melhorar a
                  experiência de navegação.
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal ou regulatória:</strong> quando o tratamento for necessário para
                  atender exigências legais.
                </li>
                <li>
                  <strong>Execução de contrato ou procedimentos preliminares:</strong> quando você contrata os serviços do
                  escritório.
                </li>
              </ul>

              <h2 id="compartilhamento" className="scroll-mt-28">
                5. Compartilhamento dos dados
              </h2>
              <p>
                Não vendemos os seus dados. O compartilhamento ocorre apenas quando necessário para prestar o serviço ou
                cumprir a lei:
              </p>
              <ul>
                <li>
                  <strong>WhatsApp (Meta):</strong> ao clicar em um botão de WhatsApp, você é direcionado para a plataforma,
                  que possui a sua própria política de privacidade. A conversa passa a ser tratada pela Meta e pelo
                  escritório.
                </li>
                <li>
                  <strong>Provedores de hospedagem e ferramentas essenciais:</strong> podem tratar dados técnicos para manter
                  o site disponível e seguro.
                </li>
                <li>
                  <strong>Autoridades públicas:</strong> quando houver obrigação legal ou ordem judicial.
                </li>
              </ul>

              <h2 id="retencao" className="scroll-mt-28">
                6. Por quanto tempo guardamos os dados
              </h2>
              <p>
                Os dados são mantidos pelo tempo necessário para atender à finalidade do contato, prestar os serviços e
                cumprir as obrigações legais aplicáveis. Depois disso, são eliminados ou anonimizados, salvo quando a lei
                exigir a guarda.
              </p>
              <p>
                As conversas de WhatsApp são armazenadas na plataforma pelo período definido pela Meta e pelo escritório,
                conforme a sua própria política.
              </p>

              <h2 id="direitos" className="scroll-mt-28">
                7. Seus direitos como titular
              </h2>
              <p>Você pode exercer os seguintes direitos, conforme a LGPD:</p>
              <ul>
                <li>Confirmação da existência de tratamento e acesso aos dados.</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
                <li>Portabilidade dos dados, quando aplicável.</li>
                <li>Eliminação dos dados tratados com base em consentimento.</li>
                <li>Informação sobre compartilhamentos realizados.</li>
                <li>Revogação do consentimento a qualquer momento.</li>
              </ul>
              <p>
                Para exercer os seus direitos, fale com a nossa equipe pelo WhatsApp ou pelo e-mail{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Responderemos no menor prazo possível.
              </p>

              <h2 id="cookies" className="scroll-mt-28">
                8. Cookies e tecnologias semelhantes
              </h2>
              <p>
                Utilizamos cookies essenciais para o funcionamento do site e para registrar a sua escolha no aviso de
                cookies. Não utilizamos rastreadores publicitários pesados. Você pode bloquear ou excluir cookies nas
                configurações do seu navegador; isso pode afetar a experiência de navegação.
              </p>
              <p>
                Ao aceitar o aviso de cookies, você concorda com o uso das tecnologias descritas nesta política. A escolha
                pode ser alterada limpando os dados do navegador.
              </p>

              <h2 id="seguranca" className="scroll-mt-28">
                9. Segurança da informação
              </h2>
              <p>
                Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acesso não autorizado,
                perda, alteração ou destruição. Nenhuma medida é totalmente imune a incidentes, mas trabalhamos para reduzir
                riscos e responder a eventuais ocorrências.
              </p>

              <h2 id="contato" className="scroll-mt-28">
                10. Como falar com a gente
              </h2>
              <p>
                Se você tiver dúvidas sobre esta política ou sobre o tratamento dos seus dados, fale com a Classe A
                Contabilidade:
              </p>
              <ul>
                {UNITS.map((unit) => (
                  <li key={unit.id}>
                    <strong>
                      Unidade {unit.city}/{unit.state}:
                    </strong>{" "}
                    {unit.address} · WhatsApp {unit.phoneLabel}
                  </li>
                ))}
                <li>
                  E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  Instagram: <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">{SITE.instagram.handle}</a>
                </li>
              </ul>
              <p>
                Encarregado de dados (DPO): {SITE.email}. As solicitações também podem ser feitas pelo WhatsApp de
                qualquer uma das unidades.
              </p>

              <h2 id="alteracoes" className="scroll-mt-28">
                11. Alterações desta política
              </h2>
              <p>
                Esta política pode ser atualizada para refletir mudanças na legislação ou nos nossos serviços. A data de
                última atualização será sempre indicada no topo da página. Recomendamos a leitura periódica.
              </p>

              <div className="mt-8 rounded-xl border border-line bg-cream-50 p-4">
                <p className="flex items-start gap-2 text-xs leading-5 text-muted">
                  <Icon name="info" size={15} className="mt-0.5 shrink-0 text-gold-600" />
                  Este é um texto informativo de demonstração. Antes de publicar, ele deve ser revisado pelo escritório e,
                  se necessário, por um profissional especializado em proteção de dados.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft sm:flex-row sm:items-center">
              <p className="text-sm text-muted">
                <strong className="font-semibold text-navy-900">Ficou com alguma dúvida?</strong> Fale com a nossa equipe.
              </p>
              <Link
                to="/institucional"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
              >
                Conhecer a Classe A
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
