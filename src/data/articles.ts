import { Article } from '../components/ArticleCard';

export const articles: Article[] = [
  {
    id: '1',
    title: 'A Importância do Design Responsivo',
    excerpt: 'Entenda por que ter um site responsivo é essencial para o sucesso dos negócios na era mobile.',
    date: '15 de março de 2024',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    context: `
O design responsivo é um dos pilares do desenvolvimento web moderno. Com a explosão do uso de smartphones e tablets, garantir que uma aplicação web funcione perfeitamente em qualquer tamanho de tela não é mais um diferencial, mas sim uma obrigação.

## O que é design responsivo?

É uma abordagem que permite que os layouts e conteúdos se adaptem automaticamente ao dispositivo do usuário, mantendo a legibilidade, a funcionalidade e a experiência de uso em qualquer resolução. Isso é feito através de:

- **Media queries no CSS**
- **Unidades relativas (em, rem, %, vw, vh)**
- **Layouts fluídos com Flexbox e CSS Grid**

## Por que é essencial?

- **Melhor experiência do usuário**: Navegação confortável e intuitiva em dispositivos móveis.
- **SEO otimizado**: O Google prioriza sites mobile-friendly no ranking de busca.
- **Conversão e retenção**: Sites responsivos tendem a reduzir a taxa de rejeição e aumentam a conversão.

Empresas que ignoram o design responsivo correm o risco de perder grande parte da audiência logo no primeiro acesso. Já aquelas que adotam essa abordagem oferecem uma experiência moderna, profissional e inclusiva.
`
  },
  {
    id: '2',
    title: 'Otimização de Performance em Sites',
    excerpt: 'Descubra estratégias essenciais para melhorar a velocidade e o desempenho do seu site.',
    date: '10 de março de 2024',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    context: `
A performance de um site é um dos fatores que mais impactam a experiência do usuário e o SEO. Um carregamento lento não apenas frustra o visitante, mas também afeta diretamente a autoridade da página nos buscadores.

## Principais estratégias de otimização

- **Minificação de arquivos CSS e JS**
- **Utilização de imagens em formatos modernos (WebP, AVIF)**
- **Lazy loading para imagens e componentes pesados**
- **Uso de CDN para distribuição de conteúdo**
- **Compressão de arquivos com Gzip ou Brotli**
- **Uso de cache inteligente (Cache-Control, Service Workers)**

## Ferramentas úteis

- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

Investir em performance é investir em retenção, SEO, e satisfação do usuário final. É uma prática contínua que deve acompanhar o crescimento do seu projeto.
`
  },
  {
    id: '3',
    title: 'Boas Práticas de SEO para 2024',
    excerpt: 'Fique por dentro das técnicas mais eficazes de SEO para melhorar seu posicionamento nos buscadores.',
    date: '5 de março de 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    context: `
SEO (Search Engine Optimization) é um conjunto de técnicas para melhorar a visibilidade de um site nos mecanismos de busca como Google, Bing e DuckDuckGo. Em 2024, o SEO está mais focado na **experiência do usuário** e **qualidade do conteúdo** do que nunca.

## Fatores mais relevantes hoje

- **Conteúdo de valor e original**
- **Mobile-first indexing**
- **Velocidade de carregamento (Core Web Vitals)**
- **Backlinks de qualidade**
- **Uso correto de meta tags (title, description, og)**

## E-E-A-T

O Google considera o modelo E-E-A-T como base para classificar a confiabilidade de um site:

- **Experience (experiência prática)**
- **Expertise (conhecimento técnico)**
- **Authoritativeness (autoridade no assunto)**
- **Trustworthiness (confiabilidade)**

## Boas práticas

- Use títulos (H1, H2, H3) com palavras-chave bem posicionadas
- Crie URLs amigáveis e com estrutura hierárquica
- Utilize Schema Markup para rich snippets
- Foque na intenção de busca do usuário

Um bom SEO exige consistência, paciência e atualização constante diante das mudanças de algoritmo.
`
  },
  {
    id: '4',
    title: 'Construindo Aplicações Web Modernas',
    excerpt: 'Um guia completo sobre como criar aplicações web escaláveis e modernas usando tecnologias atuais.',
    date: '1 de março de 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    context: `
Aplicações web modernas exigem escalabilidade, modularidade, segurança e performance. Para atingir esses objetivos, é essencial utilizar uma stack tecnológica atualizada e bem planejada.

## Stack moderna recomendada

- **Front-end**: React, Next.js, Vue ou Svelte
- **Back-end**: Node.js com Express ou Fastify, ou APIs serverless
- **Banco de dados**: PostgreSQL, MongoDB ou serviços gerenciados como Firebase
- **DevOps**: CI/CD com GitHub Actions, Docker, Kubernetes ou Vercel/Netlify

## Arquitetura limpa

A separação de responsabilidades, uso de padrões como MVC e Domain-Driven Design (DDD) ajudam a manter o projeto organizado e testável. Além disso:

- Use **TypeScript** para maior segurança no desenvolvimento
- Adote **design systems** para padronizar componentes
- Crie testes automatizados com Jest, Testing Library ou Cypress

## Performance e escalabilidade

Com SSR, SSG e reidratação parcial, frameworks modernos permitem que a performance seja mantida mesmo com cargas elevadas. Ao lado disso, ferramentas de observabilidade como Grafana, Sentry e Prometheus garantem monitoramento contínuo.

Aplicações modernas não são apenas funcionais — elas são construídas para evoluir.
`
  },
  {
    id: '5',
    title: 'O Futuro do Desenvolvimento Web',
    excerpt: 'Explore as tendências e tecnologias que moldarão o futuro da criação de sites e apps.',
    date: '28 de fevereiro de 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    context: `
O desenvolvimento web está passando por uma transformação silenciosa, mas profunda. Tecnologias que antes pareciam experimentais agora ganham espaço nos fluxos de trabalho de empresas de todos os tamanhos.

## Principais tendências

- **WebAssembly**: permite rodar linguagens como Rust e C++ no navegador com performance quase nativa.
- **Edge computing**: execução de código no limite da rede com soluções como Cloudflare Workers.
- **Inteligência artificial aplicada ao front-end**: geração de código, automação de testes, personalização em tempo real.
- **Design tokens e sistemas de design desacoplados**
- **PWAs** como alternativa leve a apps nativos

## O papel do desenvolvedor

Mais do que saber codar, o desenvolvedor do futuro será alguém capaz de **integrar dados, arquitetura e experiência do usuário**, trabalhando lado a lado com IA e ferramentas low-code/no-code.

As próximas gerações de sites e apps serão cada vez mais inteligentes, adaptáveis e conectados. E o seu stack também precisa evoluir junto com isso.
`
  },
  {
    id: '6',
    title: 'Dominando o CSS Grid Layout',
    excerpt: 'Aprenda a criar layouts complexos com facilidade usando CSS Grid e exemplos práticos.',
    date: '25 de fevereiro de 2024',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1200&q=80',
    context: `
O CSS Grid revolucionou a forma como criamos layouts na web. Com ele, é possível organizar elementos em duas dimensões (linhas e colunas) de forma intuitiva e poderosa.

## Por que usar CSS Grid?

- Permite layouts complexos com pouco código
- Dispensa uso de float, clearfix e hacks antigos
- Funciona muito bem com responsividade

## Conceitos principais

- **grid-template-columns / grid-template-rows**
- **grid-gap (gap)**
- **grid-area**
- **auto-fit e auto-fill**
- **minmax() para responsividade**
`
  }

]