# Context — Heberton Pinheiro Treinamentos

## Visão Geral
Site institucional estático para a **Heberton Pinheiro Treinamentos**, consultoria especializada em inclusão social, acessibilidade e Língua Brasileira de Sinais (Libras). O site é hospedado na Vercel e acessível em `hebertonpinheiro.com`.

## Stack
- **HTML5** — Páginas estáticas (sem gerador de build)
- **CSS3 / Bootstrap 5.0.0** — Layout responsivo
- **JavaScript (jQuery 3.4.1)** — Interações e plugins
- **OWL Carousel** — Carrosséis
- **WOW.js** — Animações ao scroll
- **Video.js 8.10.0** — Player de vídeo (página /videos.html)
- **VLibras Widget** — Acessibilidade para surdos (widget de tradução para Libras)

## Estrutura de Arquivos
```
heberton-pinheiro/
├── css/
│   ├── bootstrap.min.css
│   └── style.css              # Estilos customizados
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
└── READ-ME.md                 # README do projeto
```

## Páginas do Site
| Página | Descrição |
|---|---|
| `index.html` | Home — carrossel, sobre, serviços, equipe, contato |
| `consultor.html` | Perfil profissional de Heberton Pinheiro |
| `sobre.html` | Missão, visão, valores, vantagens da acessibilidade |
| `nossos-servicos.html` | Consultoria, treinamentos, oficinas, palestras |
| `contact.html` | Formulário de contato + mapa Google |
| `videos.html` | Vídeos educativos com Video.js |
| `voluntario.html` | Formulário de voluntariado |
| `parceiros.html` | Parceiros atuais + formulário de parceria |
| `vagas-inclusivas.html` | Portal de vagas inclusivas com filtros |

## Convenções de Código
- Lang: `pt-BR`
- Bootstrap grid system para layout
- Componentes com classes `wow fadeInUp` / `wow zoomIn` para animação
- WhatsApp CTA: `https://wa.me/5592984392169`
- Fontes: Nunito (corpo) + Rubik (headings)
- Cores: `--primary: #044e91`, `--secondary: #34AD54`, `--dark: #091E3E`

## Problemas Conhecidos (corrigidos)
- Tags VLibras `-- VLibras Widget -->` com `<` faltando
- Links quebrados (`service.html`, `nossos-sericos.html`, `sobre-nos.html`)
- VLibras duplicado em `voluntario.html`
- Acessibilidade insuficiente para empresa de inclusão
- Visual desatualizado

## Deploy
- **Plataforma:** Vercel
- **Domínio:** hebertonpinheiro.com (com redirect para www)
- **Config:** `vercel.json` com redirects
