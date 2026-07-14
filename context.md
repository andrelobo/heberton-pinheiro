# Context — Heberton Pinheiro Consultoria e Treinamento

## Visão Geral
Site institucional estático para a **Heberton Pinheiro Consultoria e Treinamento**, consultoria especializada em inclusão social, acessibilidade e Língua Brasileira de Sinais (Libras). O site é hospedado na Vercel e acessível em `hebertonpinheiro.com`.

## Stack
- **HTML5** — Páginas estáticas (sem gerador de build)
- **CSS3 / Bootstrap 5.0.0** — Layout responsivo com Design System premium v2
- **JavaScript (jQuery 3.4.1)** — Interações e plugins
- **OWL Carousel** — Carrosséis
- **WOW.js** — Animações ao scroll
- **Video.js 8.10.0** — Player de vídeo (página /videos.html)
- **VLibras Widget** — Acessibilidade para surdos (widget de tradução para Libras)
- **Font Awesome 5.10.0** + **Bootstrap Icons 1.4.1** — Ícones
- **Google Fonts** — Nunito (corpo) + Rubik (headings)

## Estrutura de Arquivos
```
heberton-pinheiro/
├── css/
│   ├── bootstrap.min.css
│   └── style.css              # Design System premium v2
├── img/                       # Imagens do site
├── js/
│   └── main.js                # Script principal
├── lib/
│   ├── animate/               # WOW animations
│   ├── counterup/             # Counter animations
│   ├── easing/                # Smooth scroll
│   ├── owlcarousel/           # Carousel plugin
│   ├── waypoints/             # Scroll detection
│   └── wow/                   # Scroll animations
├── videos/                    # Vídeos (.mp4)
├── index.html                 # Página principal
├── consultor.html             # Perfil do consultor
├── sobre.html                 # Missão, visão, valores
├── nossos-servicos.html       # Serviços oferecidos
├── contact.html               # Contato + mapa
├── videos.html                # Vídeos educativos
├── voluntario.html            # Voluntariado
├── parceiros.html             # Parceiros
├── vagas-inclusivas.html      # Portal de vagas PCD
├── vagas-script.js            # Lógica de vagas
├── vagas.json                 # Dados de vagas
├── vercel.json                # Configuração Vercel
├── sitemap.xml                # Sitemap SEO
├── robots.txt                 # Robots para crawlers
├── context.md                 # Contexto do projeto
└── README.md                  # README do projeto
```

## Páginas do Site
| Página | Descrição |
|---|---|
| `index.html` | Home — carrossel, sobre, serviços, equipe, contato |
| `consultor.html` | Perfil profissional de Heberton Pinheiro |
| `sobre.html` | Missão, visão, valores, vantagens da acessibilidade |
| `nossos-servicos.html` | Consultoria, treinamentos, oficinas, palestras |
| `contact.html` | Contato + mapa Google |
| `videos.html` | Vídeos educativos com Video.js |
| `voluntario.html` | Formulário de voluntariado (Typeform placeholder) |
| `parceiros.html` | Parceiros atuais + formulário de parceria |
| `vagas-inclusivas.html` | Portal de vagas inclusivas com filtros |

## Design System Premium v2 (`css/style.css`)

### Design Tokens (CSS Custom Properties)
- **Cores:** Paleta azul completa (`--blue-50` a `--blue-950`), `--primary: #044e91`, `--accent: #00c2ff`
- **Sombras:** 8 níveis (`--shadow-xs` a `--shadow-2xl`) + `--shadow-glow`
- **Border radius:** 6 níveis (`--radius-xs: 6px` a `--radius-full: 9999px`)
- **Transições:** 3 velocidades com `cubic-bezier` custom (`--transition-fast`, `--transition-base`, `--transition-slow`)
- **Backgrounds:** `--bg-page: #f4f7fc`, `--bg-hero: linear-gradient(160deg, ...)`

### Componentes Estilizados
- **Navbar:** Background sólido `--primary`, nav links com underline animado, sticky com `backdrop-filter: blur(20px)`
- **Cards:** `.feature-card`, `.service-item`, `.qualification-item`, `.partner-card`, `.team-item` — hover com `translateY(-8px)` + `shadow-xl`
- **Service icons:** Rotação -45deg com gradiente
- **Footer:** Cards com `border-radius: var(--radius-lg)`
- **Botões:** Gradiente, sombra colorida, hover com `translateY(-2px)`
- **Section titles:** Linha gradiente animada com dot
- **Hero header:** Gradiente de fundo com radials decorativos
- **Back to top:** Gradiente fixo no canto inferior direito

### Acessibilidade no CSS
- **Skip link:** `.skip-link` — aparece no focus com `top: 0`
- **Focus visible:** `outline: 3px solid var(--accent)` em todos os elementos interativos
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` — desabilita animações
- **High contrast:** `@media (prefers-contrast: high)` — aumenta bordas e contraste
- **Print:** `@media print` — oculta navbar, footer, VLibras, spinner

## Convenções de Código
- Lang: `pt-BR`
- Bootstrap grid system para layout
- Componentes com classes `wow fadeInUp` / `wow zoomIn` para animação
- WhatsApp CTA: `https://wa.me/5592984392169`
- Cores do logo: Azul `#004e90`/`#044e91` extraído via PIL do `img/logo.png`
- Skip link usa classe `.skip-link` (consistente em todas as páginas)
- Copyright year: `<span id="current-year">2025</span>` com JS dinâmico
- VLibras: carregamento lazy via `document.createElement('script')` em consultor.html; tag `<script>` defer nas demais
- Imagens: `loading="lazy"` onde aplicável
- Scripts: todos com `defer`

## Acessibilidade (WCAG)
- Skip to content em todas as páginas (`.skip-link`)
- `aria-label` em navegação, botões, formulários, iframe do mapa
- `aria-hidden="true"` em ícones decorativos
- `aria-current="page"` no link de navegação ativo
- `aria-expanded` no botão toggler do menu
- `role="search"` no container de busca
- `<label>` associado a todos os inputs (inclusive search com `visually-hidden`)
- `tabindex="0"` no iframe do Google Maps
- VLibras Widget em todas as páginas

## SEO
- **Open Graph** em todas as páginas (og:title, og:description, og:url, og:image, og:locale, og:site_name)
- **Twitter Card** em todas as páginas
- **Schema.org JSON-LD** em todas as páginas:
  - `LocalBusiness` / `ProfessionalService` (index, sobre, consultor, nossos-servicos, contact, voluntario)
  - `WebPage` (videos, parceiros, vagas-inclusivas)
- **Canonical URL** em todas as páginas
- **Meta description** e **keywords** otimizadas em todas as páginas
- `robots.txt` configurado

## Alterações Realizadas (Histórico)

### Correções de Bugs
- Corrigido `-- VLibras Widget -->` → `<!-- VLibras Widget -->` (6 páginas)
- Removido VLibras duplicado em `voluntario.html` (3x → 1x)
- Links quebrados corrigidos: `service.html` → `nossos-servicos.html`, `nossos-sericos.html` typo, `sobre-nos.html` → `sobre.html`
- Tag `</h4>` fechando `<h5>` em `parceiros.html`
- LinkedIn `href=""` vazio → URL real em todas as páginas
- `frameborder="0"` corrigido em `contact.html`
- `loop: true` duplicado removido em `js/main.js`
- Arquivos desnecessários removidos: `index_editado.html`, `lib/waypoints/links.php`

### Acessibilidade
- Skip link adicionado em todas as páginas (classe padronizada `.skip-link`)
- `aria-label` em navegação, botões, formulários, search modal
- `aria-hidden` em ícones decorativos
- `aria-expanded` no navbar toggler
- `role="search"` no container de busca
- `<label>` com `visually-hidden` em todos os inputs

### SEO e Meta Tags
- Open Graph + Twitter Card em todas as páginas
- Schema.org JSON-LD em todas as páginas
- Canonical URLs
- `robots.txt` criado
- `README.md` atualizado

### Design System Premium v2
- CSS completamente reescrito com design tokens
- Navbar com glass morphism (backdrop-filter blur)
- Cards com hover premium (shadow-xl, translateY)
- Service icons com gradiente e rotação
- Section titles com linha animada
- Hero headers com gradiente e radials decorativos
- Botões com gradiente e sombra
- Footer cards com border-radius
- Suporte a `prefers-reduced-motion` e `prefers-contrast: high`
- Print styles

### Nome da Empresa
- Atualizado de "Heberton Pinheiro Treinamentos" para "Heberton Pinheiro Consultoria e Treinamento" em todos os arquivos (36 ocorrências, 12 arquivos)

## Git
- **Último commit:** `f13ff55` — fix: remove partner logos section with missing images
- **Commits anteriores:** `27e27be` (copyright year 2025→2026), `66b5785` (company name update), `77324b7` (premium design system v2), `f8055c6` (bug fixes + accessibility + SEO)

## Deploy
- **Plataforma:** Vercel (deploy automático via GitHub)
- **Domínio:** hebertonpinheiro.com
- **Config:** `vercel.json` com redirects

## Pendências / Próximos Passos
- [ ] Formulário de voluntariado (`voluntario.html`) — link placeholder `https://seutypeform.aqui` será substituído pelo formulário próprio (em desenvolvimento)
- [ ] Formulário de parceria (`parceiros.html`) — link placeholder será substituído pelo formulário próprio (em desenvolvimento)
