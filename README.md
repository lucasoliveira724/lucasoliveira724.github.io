# Lucas Oliveira — Portfólio Profissional

Portfólio pessoal para apresentar a atuação de Lucas Oliveira em Salesforce Marketing Cloud, desenvolvimento de software, dados e automação.

## Stack
React, TypeScript, Vite, Tailwind CSS e Lucide React. Estilos customizados mantêm a interface leve e responsiva.

## Estrutura
- `src/App.tsx`: seções e componentes de apresentação reutilizáveis.
- `src/data/site.ts`: projetos, screenshots previstos, cases e links editáveis.
- `src/styles.css`: identidade visual, responsividade, foco e movimento reduzido.
- `public/`: favicon e assets estáticos.
- `.github/workflows/deploy.yml`: build e deploy automático no GitHub Pages.

## Instalação e execução
Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
npm run preview
```

O build gera o site na pasta `dist`.

## GitHub Pages
1. Crie o repositório no GitHub e envie estes arquivos para a branch `main`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como origem.
3. O workflow executa `npm install` em cada push à `main`, compila o Vite e publica o conteúdo de `dist`.
4. A URL do site aparecerá em **Settings → Pages** após a primeira execução.
5. Para atualizar o site, faça push das mudanças para `main`.

O workflow define automaticamente `VITE_BASE_PATH` com o nome do repositório, cobrindo URLs no formato `usuario.github.io/repositorio/`. Em domínio próprio/raiz, ajuste essa variável ou remova a base específica conforme necessário. Não requer Vercel ou Netlify.

## Atualizações de conteúdo
- **Novo projeto:** inclua um objeto em `projects` em `src/data/site.ts`. A apresentação e o carrossel são reutilizados.
- **Screenshots:** adicione imagens autorizadas a `public/images/`, amplie o tipo de slide com o caminho da imagem e troque o preview ilustrativo por `<img loading="lazy" ... alt="...">`. O carrossel já aceita gestos de arrastar no mobile e controles por teclado/foco.
- **Links:** altere o objeto `links` em `src/data/site.ts`; configure o endereço GitHub individual de cada projeto no próprio objeto. O link de Salesforce Cases permanece oculto enquanto o repositório não estiver definido.
- **Cases:** atualize a lista `cases` no mesmo arquivo.

Os previews atuais estão identificados como ilustrativos porque os assets reais não estavam presentes no workspace no momento da implementação. Links de repositórios de projetos/cases não foram inventados.

