# API Restful para Locadora de Carros

## Descrição
Este projeto consiste no desenvolvimento de uma API Restful utilizando Node.js e TypeScript para uma locadora de carros. A API permite operações CRUD para carros, usuários e reservas, além de autenticação JWT e paginação.

## Tecnologias Utilizadas
- Node.js com TypeScript
- Express
- MongoDB
- TypeORM
- Swagger para documentação
- JWT para autenticação
- Eslint e Prettier para manter o padrão do código
- Vitest para testes
- Zod para validação de rotas e payload/body
- Docker para subir o banco

## Estrutura de pastas e estratégia arquitetural
A estrutura de pastas foi pensado de forma modular e desacoplada, utilizando princípios como inversão de dependência e repository pattern.
A inversão de dependência serve para que a parte de conexão com a API (request + response) esteja em um ambiente isolado dos casos de uso.
Nesse caso estão sendo feitas chamadas HTTP, mas se caso for trocado os casos de uso estarão intactos em relação a isso.
Do modo que está, os casos de uso não instanciam suas dependências, mas sim as recebem como parâmetro.
Com isso em prática implementei a estratégia de in-memory-repository, que consegue testar os casos de uso de forma isolada,
trabalhando apenas com javascript puro e testando a funcionalidade de fato, sem haver interferências externas.

## Instalação

### Pré-requisitos
- Node.js
- MongoDB
- Docker

### Passos para subir o projeto
1. Clone o repositório:
   ```sh
   gh repo clone bernardobatistelli/flexi-lease-auto
   cd flexi-lease-auto
Instale as dependências:

npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

env
PORT=A porta da sua aplicação
JWT_SECRET=sua_chave_secreta

Suba um contâiner do docker rodando o comando docker compose up -d 
(A flag -d é para o contâiner rodar no modo dettached)

Inicie o servidor:

npm run start

Sincronize as entidades do typeorm

npm run typeorm

Testes
Comandos para manipular os testes:

npm run test (para rodar os testes unitários)
npm run test:watch (para rodar os testes unitários em modo watch)
npm run test:e2e (para rodar os testes end to end)
npm run test:e2e:watch (para rodar os testes end to end em modo watch)
npm run test:ui (para subir uma ferramenta de visualização dos testes no seu navegador)
npm runt test:coverage (para verificar a coverage dos testes da aplicação)

Documentação
A documentação da API pode ser acessada através do Swagger na rota /api/v1/docs.

O projeto conta com a pasta FlexiLease na raiz dele. Essa pasta é gerada automaticamente pelo Bruno, 
o API Client que escolhi para essa aplicação, pois é um projeto open source que foi abraçado pela comunidade. 
Nele você encontra todos os payloads e rotas da aplicação para testar.

Para conseguir um token de autenticação, crie um usuário e depois vá até a rota de autenticação e 
passe as credenciais. Será retornado um token que deve ser inserido no Bearer no header de suas requisições.
