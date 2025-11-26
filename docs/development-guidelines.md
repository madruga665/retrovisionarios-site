# Guia de Desenvolvimento - Retrovisionários Site

Este documento serve como referência para os padrões de código, arquitetura e fluxo de trabalho do projeto.

## 🛠 Stack Tecnológica

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Testes:** [Jest](https://jestjs.io/) + React Testing Library
- **Linting/Formatting:** ESLint + Prettier
- **Node Version:** 22 (Gerenciado via `.nvmrc`)

## 📂 Estrutura de Diretórios

A estrutura segue o padrão do Next.js App Router:

```
/
├── .gemini/            # Configurações e memórias do assistente Gemini
├── .github/            # Workflows de CI/CD e templates
├── docs/               # Documentação do projeto
├── prisma/             # Schemas e migrações do banco de dados
├── public/             # Assets estáticos (imagens, ícones)
├── src/
│   ├── app/            # Rotas, páginas e layouts (App Router)
│   │   ├── api/        # Rotas de API (Route Handlers)
│   │   └── types/      # Definições de tipos globais/compartilhados
│   ├── components/     # Componentes React reutilizáveis
│   ├── generated/      # Código gerado automaticamente (ex: Prisma Client customizado)
│   └── middleware.ts   # Middleware do Next.js
└── tests/              # (Opcional) Testes de integração/e2e
```

## 📏 Padrões de Código

### Naming Conventions
- **Componentes:** `PascalCase` (ex: `EventCard.tsx`)
- **Arquivos de Componentes:** `kebab-case` (ex: `event-card.tsx`)
- **Funções/Variáveis:** `camelCase`
- **Constantes:** `UPPER_SNAKE_CASE` (para valores fixos)
- **Interfaces/Types:** `PascalCase`

### TypeScript
- Evite `any`. Use tipos explícitos ou inferência sempre que possível.
- Utilize interfaces ou types definidos em `src/app/types` para modelos de dados compartilhados.

## 🔄 Fluxo de Trabalho (Git Flow)

### Branches
- **main:** Código em produção. Protegida.
- **feature/nome-da-feature:** Novas funcionalidades.
- **fix/nome-do-bug:** Correção de erros.
- **chore/tarefa-tecnica:** Configurações, atualizações de deps, refatorações sem mudança de comportamento.
- **docs/assunto:** Alterações apenas em documentação.

### Commits
Utilizamos **Conventional Commits**:
- `feat: adiciona componente de calendário`
- `fix: corrige erro de hidratação no header`
- `chore: atualiza versão do next`
- `docs: cria guia de desenvolvimento`

### Pull Requests
1. Crie o PR apontando para `main`.
2. O sistema preencherá automaticamente o corpo com o template (`.github/pull_request_template.md`).
3. **Obrigatório:** Preencha as seções "O que está sendo feito?" e "Como isso está sendo feito?".
4. O CI rodará automaticamente lint e testes.

## ✅ Testes e Qualidade

### Execução
- Rodar testes unitários: `npm test`
- Rodar cobertura: `npm test -- --coverage`
- Lint: `npm run lint`

### Cobertura (Coverage)
- O projeto possui uma regra estrita no CI.
- **Mínimo exigido:** 80% de cobertura em Statements, Branches, Functions e Lines.
- O CI falhará se a cobertura baixar desse limite.

## 🤖 Assistente Gemini
- O projeto possui instruções específicas para o agente Gemini em `.gemini/GEMINI.md`.
- Ao usar o CLI, o agente seguirá as diretrizes deste guia e do arquivo de memória.
