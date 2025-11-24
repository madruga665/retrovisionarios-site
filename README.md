# Retrôvisionários

Este é o repositório oficial do site da banda Retrôvisionários.

**Acesse o site em produção:** [https://retrovisionarios.vercel.app/](https://retrovisionarios.vercel.app/)

## Sobre o Projeto

O site serve como a presença online oficial da banda autoral Retrôvisionários, de Guarujá - SP. O principal objetivo é apresentar a banda, fornecer links para redes sociais e divulgar a agenda de shows e eventos através de um calendário interativo.

## Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **Deployment:** [Vercel](https://vercel.com/)

## Começando

Siga as instruções abaixo para rodar o projeto em seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 22)
* Um banco de dados PostgreSQL em execução.

### Instalação e Configuração

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/madruga665/retrovisionarios-site.git
    cd retrovisionarios-site
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**
    * Copie o arquivo `.env.exemple` para `.env`.
    * Abra o arquivo `.env` e adicione a URL de conexão do seu banco de dados PostgreSQL:

      ```env
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
      ```

4. **Aplique as migrações do banco de dados:**
    O Prisma usará o schema para criar as tabelas no seu banco.

    ```bash
    npx prisma db push
    ```

### Rodando o Projeto

Após a instalação, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.
