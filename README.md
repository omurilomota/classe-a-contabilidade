# Classe A Contabilidade

Site institucional de um escritório de contabilidade com duas unidades na Alta Paulista. Apresenta serviços, abertura de empresa, simulador de regime tributário, calendário fiscal e páginas de unidade.

> **Demonstração pública.** Telefone, WhatsApp, e-mail, endereço, CNPJ e redes sociais são fictícios. Nenhum formulário envia mensagens reais.

**Demo:** [classe-a-contabilidade.vercel.app](https://classe-a-contabilidade.vercel.app)  
**Stack:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · SEO com JSON-LD

![Prévia do site Classe A Contabilidade](docs/preview.jpg)

## O que o site entrega

- Home com posicionamento, serviços, prazos e unidades.
- Página **Abrir empresa** com formulário guiado e prévia da mensagem.
- **Simulador de regime** (MEI, Simples ou análise com contador) com resultado explicado.
- **Prazos fiscais** com IRPF 2026, download de `.ics` e formulário de lembretes.
- Páginas de unidade com mapa aberto, horário e contato.
- Institucional com história, valores e estrutura.
- Política de privacidade em linguagem simples.
- SEO técnico: metadados, canonical, sitemap, robots, Open Graph e JSON-LD.
- Aviso global que intercepta contatos fictícios e explica a demonstração.

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run typecheck
npm test
npm run build
npm run preview
```

O build é single-file (`vite-plugin-singlefile`): CSS e JS ficam embutidos em `dist/index.html`; imagens e fontes permanecem em `dist/`.

## Estrutura

```
src/
  components/       # Layout, navegação, UI, Picture, DemoNotice
  lib/              # site.ts (dados), seo, simulador, whatsapp, router
  pages/            # Home, AbrirEmpresa, Simulador, Prazos, Unidade...
  index.css         # tokens, tipografia e utilitários
public/
  fonts/            # Inter + Fraunces variáveis (self-hosted)
  images/           # fotos ilustrativas
```

## Dados da demonstração

A fonte única é `src/lib/site.ts`:

| Campo | Valor |
| --- | --- |
| Unidade Junqueirópolis | Rua das Acácias, 120 — Centro |
| Unidade Dracena | Av. das Palmeiras, 450 — Centro |
| WhatsApp | (18) 0000-0000 e (18) 0000-0001 |
| E-mail | contato@exemplo.com.br |
| CNPJ | 00.000.000/0001-00 |
| Instagram | @exemplo.demo |

`src/components/DemoNotice.tsx` intercepta links de contato e formulários, abrindo um diálogo explicativo. Para usar com um cliente real, substitua os dados, remova o `DemoNotice` do `Layout` e troque as fotos ilustrativas.

## Qualidade

- `npm run typecheck` — TypeScript estrito.
- `npm test` — 5 testes do simulador (Vitest).
- `npm run build` — build de produção com typecheck.
- Teste manual: rotas, simulador, formulário, menu mobile, diálogo de demonstração e teclado.

## Deploy

Vercel, framework **Vite**, build `npm run build`, output `dist`. Sem variáveis de ambiente.

## Fluxo de desenvolvimento

Gitflow + Gitmoji. `main` recebe releases com tag; `develop` integra features; commits usam `<emoji> <tipo>: <descrição>`. Veja [CONTRIBUTING.md](CONTRIBUTING.md) e [AGENTS.md](AGENTS.md).

## Licença

Código sob MIT. Marca, textos comerciais e imagens de terceiros não estão incluídos. Veja [LICENSE](LICENSE).
