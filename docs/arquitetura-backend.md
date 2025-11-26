# Arquitetura do Backend

O backend deste projeto segue uma **Arquitetura em Camadas** (Layered Architecture), utilizando o padrão **Controller-Service-Repository**. Esta abordagem foi escolhida por promover uma clara separação de responsabilidades, o que torna o código mais organizado, manutenível e testável.

As camadas são divididas da seguinte forma:

### 1. Controller (Route Handler)

*   **Localização**: `src/app/api/**/route.ts`
*   **Responsabilidade**: É a porta de entrada da API. Lida diretamente com as requisições HTTP, valida os dados de entrada (parâmetros, corpo da requisição), gerencia o fluxo da requisição e formata as respostas HTTP (por exemplo, retornando um JSON com o status code apropriado).
*   **Não deve**: Conter lógica de negócio ou acesso direto ao banco de dados.

### 2. Service (Serviço)

*   **Localização**: `src/app/api/**/service.ts`
*   **Responsabilidade**: Contém a lógica de negócio (regras de negócio) da aplicação. Orquestra as operações, chamando um ou mais métodos do repositório e processando os dados para atender aos requisitos da funcionalidade. Por exemplo, buscar eventos e ordená-los por data.
*   **Não deve**: Lidar com a lógica de HTTP (request/response) ou ter conhecimento direto sobre a implementação do banco de dados.

### 3. Repository (Repositório)

*   **Localização**: `src/app/api/**/repository.ts`
*   **Responsabilidade**: É a camada de acesso a dados. Abstrai toda a comunicação com o banco de dados (neste caso, utilizando o Prisma Client). Expõe métodos para criar, ler, atualizar e deletar registros (CRUD), sem expor os detalhes da implementação do banco de dados.
*   **Não deve**: Conter lógica de negócio.

## Fluxo de uma Requisição

Um exemplo de fluxo para uma requisição `GET /api/events` é:

1.  O **Controller** (`route.ts`) recebe a requisição.
2.  O **Controller** chama o método `getAllEvents` do **Service**.
3.  O **Service** chama o método `getAllEventsRepository` do **Repository**.
4.  O **Repository** utiliza o Prisma para buscar os eventos no banco de dados e os retorna para o **Service**.
5.  O **Service** recebe os dados, aplica qualquer regra de negócio necessária (como ordenação) e os retorna para o **Controller**.
6.  O **Controller** formata os dados em uma resposta JSON e a envia de volta para o cliente.
