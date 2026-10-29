# AGENTS.md — Classe A Contabilidade

## Contexto

Site institucional de demonstração de um escritório de contabilidade. Sem backend, banco de dados ou envio real de mensagens. Formulários montam uma mensagem e, nesta versão, abrem apenas o aviso de demonstração.

## Stack

- React 19 + TypeScript estrito
- Vite 7 + `vite-plugin-singlefile`
- Tailwind CSS 4
- Roteador próprio em `src/lib/router.tsx` (History API)
- Vitest
- Fontes variáveis self-hosted (Inter e Fraunces)

## Comandos

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

Antes de concluir qualquer alteração: typecheck, testes e build.

## Arquitetura

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Rotas e layout |
| `src/lib/site.ts` | Fonte única de dados, serviços, prazos e unidades |
| `src/lib/seo.ts` | Title, description, canonical, JSON-LD por página |
| `src/lib/simulator.ts` | Regras do simulador de regime |
| `src/lib/whatsapp.ts` | Mensagens e URLs de WhatsApp |
| `src/lib/router.tsx` | Navegação SPA |
| `src/components/Layout.tsx` | Header, footer, CTA flutuante e `DemoNotice` |
| `src/components/DemoNotice.tsx` | Diálogo e bloqueio de contatos fictícios |
| `src/pages/` | Home e páginas internas |

## Regras de conteúdo

1. Não adicionar telefone, WhatsApp, e-mail, endereço, CNPJ ou redes sociais reais em repositório público.
2. Toda informação institucional passa por `src/lib/site.ts`.
3. Não criar depoimentos, números ou prêmios sem fonte e autorização.
4. O simulador é educativo: mantenha os avisos de que não substitui análise contábil.
5. O `DemoNotice` deve permanecer montado no `Layout` e interceptar `tel:`, `mailto:`, `wa.me`, Instagram e Facebook.
6. Formulários não podem usar `window.open` para WhatsApp nesta versão; dispare `demo:contact`.

## Convenções

- TypeScript estrito, sem `any` sem justificativa.
- Tailwind para layout; CSS global apenas para tokens, fontes e utilitários.
- Paleta: navy `#0f2a43`, dourado `#c8a24a`, creme `#f7f4ec`.
- Tipografia: Fraunces para títulos e Inter para texto.
- Um `h1` por página; hierarquia de headings preservada.
- Imagens com `alt`, dimensões intrínsecas e `loading="lazy"` fora da primeira dobra.
- Não remover o skip link nem os estados de foco.

## Testes

- `src/lib/simulator.test.ts` cobre os cinco caminhos do simulador.
- Ao alterar regras de negócio, atualize os testes primeiro.
- Verificação manual: navegação entre rotas, simulador completo, formulários e menu mobile.

## Git e deploy

Gitflow + Gitmoji. `main` é produção com tag `vX.Y.Z`; `develop` integra; features em `feature/*`. Deploy na Vercel com framework Vite, sem env vars.
