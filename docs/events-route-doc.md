# 📝 Documentação para route.ts

## Visão Geral

Este arquivo atua como um manipulador de rotas de API (API Route Handler) para uma aplicação Next.js. Sua principal responsabilidade é expor endpoints HTTP para gerenciar recursos de "Eventos". Ele lida com as requisições HTTP de entrada, delega a lógica de negócio para a camada de serviço (`service.ts`) e formata as respostas HTTP (seja de sucesso ou de erro) para o cliente.

As diretivas `export const dynamic = 'force-dynamic';` e `export const revalidate = 0;` garantem que esta rota seja renderizada dinamicamente a cada requisição, desativando qualquer tipo de cache estático ou de dados.

## Funções Exportadas

### `GET()`

Esta função assíncrona manipula requisições `GET` para o endpoint.

- **Propósito:** Buscar e retornar uma lista de todos os eventos.
- **Fluxo de Execução:**
    1. Invoca a função `getAllEvents()` do arquivo `service.ts` para obter os dados dos eventos.
    2. Em caso de sucesso, a função do serviço retorna uma lista de eventos, que é então enviada como uma resposta JSON com o status HTTP `200 OK`.
    3. Se ocorrer um erro durante a busca (por exemplo, falha na comunicação com o banco de dados), o bloco `catch` captura a exceção e retorna uma resposta de erro em JSON com a mensagem "Failed to fetch events" e o status HTTP `500 Internal Server Error`.

### `POST(request: NextRequest)`

Esta função assíncrona manipula requisições `POST` para o endpoint.

- **Propósito:** Criar um novo evento com base nos dados fornecidos no corpo da requisição.
- **Parâmetros:**
  - `request`: Um objeto `NextRequest` que contém os detalhes da requisição HTTP, incluindo o corpo (body) em formato JSON. O corpo deve estar no formato do tipo `EventBody` (`{ name: string; date: string; flyer: string; }`).
- **Fluxo de Execução:**
    1. Extrai e analisa o corpo da requisição (`body`) como JSON.
    2. Realiza uma validação básica para garantir que os campos obrigatórios `name` e `date` estejam presentes. Se algum estiver faltando, retorna uma resposta de erro em JSON com o status HTTP `400 Bad Request`.
    3. Se a validação for bem-sucedida, invoca a função `createEvent(body)` do arquivo `service.ts`, passando os dados do novo evento para a camada de serviço.
    4. Após a criação bem-sucedida, retorna uma resposta em JSON com uma mensagem de sucesso, o objeto do evento criado (`createdEvent`) e o status HTTP `201 Created`.
    5. Se ocorrer um erro durante o processo de criação, o bloco `catch` captura a exceção e retorna uma resposta de erro em JSON com a mensagem "Failed to create event" e o status HTTP `500 Internal Server Error`.

## Diagrama de Sequência

```mermaid
sequenceDiagram
    Client->>Next.js (route.ts): GET /api/events
    Next.js (route.ts)->>Service (service.ts): chama getAllEvents()
    Service (service.ts)->>Repository: chama getAllEventsRepository()
    Repository->>Database: Executa a consulta de eventos (SELECT)
    Database->>Repository: Retorna lista de eventos
    Repository->>Service (service.ts): Retorna lista de eventos
    Service (service.ts)->>Service (service.ts): Ordena os eventos por data
    Service (service.ts)->>Next.js (route.ts): Retorna eventos ordenados
    Next.js (route.ts)->>Client: Responde com JSON(events), status 200
    Client->>Next.js (route.ts): POST /api/events com dados do evento
    Next.js (route.ts)->>Next.js (route.ts): Analisa e valida o corpo da requisição
    Next.js (route.ts)->>Service (service.ts): chama createEvent(body)
    Service (service.ts)->>Repository: chama createEventRepository(event)
    Repository->>Database: Executa a inserção do evento (INSERT)
    Database->>Repository: Retorna o evento criado
    Repository->>Service (service.ts): Retorna createdEvent
    Service (service.ts)->>Next.js (route.ts): Retorna createdEvent
    Next.js (route.ts)->>Client: Responde com JSON({ message, event }), status 201
```
