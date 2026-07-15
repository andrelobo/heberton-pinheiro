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

## Design System Premium v3 (`css/style.css`)

### Design Tokens (CSS Custom Properties)
- **Paleta Light:** `--primary: #2563eb`, `--accent: #38bdf8`, `--bg-page: #f8fafc`
- **Paleta Dark:** `--primary: #3b82f6`, `--bg-page: #0b1120`, `--surface: #111827`
- **Sombras:** 8 níveis (`--shadow-xs` a `--shadow-2xl`) + `--shadow-glow` + `--shadow-glow-accent`
- **Border radius:** 6 níveis (`--radius-xs: 8px` a `--radius-full: 9999px`)
- **Transições:** 3 velocidades com `cubic-bezier` custom
- **Tema:** `[data-theme="dark"]` com tokens separados para cada tema

### Componentes Estilizados
- **Navbar:** Background sólido `--primary`, nav links com underline animado, sticky com `backdrop-filter: blur(24px)`
- **Cards:** `.feature-card`, `.service-item`, `.qualification-item`, `.partner-card`, `.team-item` — hover com `translateY(-8px)` + `shadow-xl` + `shadow-glow`
- **Service icons:** Rotação -45deg com gradiente
- **Footer:** Cards com `border-radius: var(--radius-lg)`
- **Botões:** Gradiente `--primary` → `--primary-light`, sombra colorida, hover com glow
- **Section titles:** Linha gradiente animada com dot
- **Hero header:** Gradiente com blobs decorativos animados (`hero-blob` keyframes)
- **Back to top:** Gradiente `--primary` → `--accent`
- **Theme toggle:** Botão circular com ícones sun/moon, hover com rotação

### Dark Blue Theme
- Toggle na navbar de todas as páginas (ícone sun/moon)
- Script inline no `<head>` previne flash de tema errado
- `localStorage` salva preferência do usuário
- Respeita `prefers-color-scheme` no primeiro acesso
- Transição suave via classe `.theme-transition`
- Ajustes específicos: `.bg-light`, `.text-muted`, imagens, forms, footer

### Acessibilidade no CSS
- **Skip link:** `.skip-link` — aparece no focus com `top: 0`
- **Focus visible:** `outline: 3px solid var(--accent)` em todos os elementos interativos
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` — desabilita animações
- **High contrast:** `@media (prefers-contrast: high)` — aumenta bordas e contraste
- **Print:** `@media print` — oculta navbar, footer, VLibras, spinner, theme toggle

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

### Design System Premium v3 (Dark Mode)
- Paleta de cores atualizada: `--primary: #2563eb`, `--accent: #38bdf8`
- Dark blue theme completo com `[data-theme="dark"]`
- Toggle sun/moon na navbar de todas as páginas (9 páginas)
- Script inline no `<head>` previne flash de tema errado
- `localStorage` salva preferência, respeita `prefers-color-scheme`
- Transição suave entre temas (classe `.theme-transition`)
- Blobs decorativos animados no hero header (`hero-blob` keyframes)
- Sombras com glow colorido (`--shadow-glow`, `--shadow-glow-accent`)
- Cards, botões e componentes com visual mais moderno
- Print styles incluem ocultação do theme toggle

### Imagens
- Otimização para WebP + fallback JPEG em todas as imagens principais
- `turma_libras_no_comercio_turma01` adicionada na seção Treinamentos
- 32 imagens não utilizadas removidas (redução de ~75% na pasta img/)
- `andrelobo.png` otimizada e adicionada à seção Nossa Equipe

### Formulários
- Formulário de voluntariado (`voluntario.html`) — campos: nome, email, telefone, área de interesse, disponibilidade, motivação
- Formulário de parceria (`parceiros.html`) — campos: empresa, contato, cargo, email, telefone, tipo de parceria, contribuição
- AJAX submission via Formspree com mensagem de sucesso
- CSS consistente com Design System v3

### Equipe
- André Lobo adicionado à seção Nossa Equipe (index.html)
- Cargo: Tecnologia
- LinkedIn: linkedin.com/in/andreloboweb

### Nome da Empresa
- Atualizado de "Heberton Pinheiro Treinamentos" para "Heberton Pinheiro Consultoria e Treinamento" em todos os arquivos (36 ocorrências, 12 arquivos)

## Git
- **Último commit:** `5e51944` — fix: atualiza cargo do André Lobo para Tecnologia
- **Commits recentes:** `5966099` (LinkedIn André Lobo), `7b3653d` (adiciona André Lobo ao time), `cb5f009` (formulários customizados), `dd6160a` (otimização de imagens)

## Deploy
- **Plataforma:** Vercel (deploy automático via GitHub)
- **Domínio:** hebertonpinheiro.com
- **Config:** `vercel.json` com redirects

## Pendências / Próximos Passos
- [ ] Formulários: configurar ID do Formspree (substituir `SEU_ID_AQUI` nos forms de voluntariado e parceria)
- [ ] André Lobo: confirmar cargo exato (atualmente "Tecnologia")
