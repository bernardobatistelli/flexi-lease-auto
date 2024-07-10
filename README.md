# API Restful para Gerenciamento de Vendedores

## Descrição
Este projeto consiste no desenvolvimento de uma API Restful utilizando Node.js e TypeScript para o gerenciamento de vendedores em oficinas. A API permite operações CRUD para vendedores, oficinas e seus respectivos relacionamentos, além de autenticação JWT e paginação.

## Tecnologias Utilizadas
- Node.js com TypeScript
- Express
- MongoDB
- TypeORM
- Swagger para documentação
- JWT para autenticação
- Eslint e Prettier para manter o padrão do código
- Jest para testes
- Zod para validação de rotas e payload/body

## Funcionalidades
- **Vendedores**: CRUD de vendedores.
- **Oficinas**: CRUD de oficinas.
- **Relacionamentos**: Gerenciamento de relacionamentos entre vendedores e oficinas.
- **Autenticação**: Sistema de login e registro utilizando JWT.
- **Paginação**: Implementação de paginação em rotas de listagem.

## Estrutura de Branches
- `main`: Branch principal.
- `develop`: Branch de desenvolvimento.
- Criar uma branch para cada funcionalidade.

## Boas Práticas
- Uso de Conventional Commits e pequenos commits.
- Manter histórico de commits visível.
- Cobertura de testes de 70%.
- Código seguindo boas práticas de desenvolvimento de software.

## Instalação

### Pré-requisitos
- Node.js
- MongoDB
- Docker

### Passos
1. Clone o repositório:
   ```sh
   gh repo clone bernardobatistelli/flexi-lease-auto
   cd flexi-lease-auto
Instale as dependências:

sh
npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

env
PORT=A porta da sua aplicação
JWT_SECRET=sua_chave_secreta

Suba um contâiner do docker rodando o comando docker compose up -d 
(A flag -d é para o contâiner rodar no modo dettached)

Inicie o servidor:

sh
npm run start

Testes
Para rodar os testes, utilize:
sh
npm run test

Ou em modo watch
sh 
npm run test:watch

Documentação
A documentação da API pode ser acessada através do Swagger na rota /api/v1/docs.

O projeto conta com a pasta FlexiLease na raiz dele. Essa pasta é gerada automaticamente pelo Bruno, 
o API Client que escolhi para essa aplicação, pois é 
um projeto open source que foi abraçado pela comunidade. Nele você encontra todos os payloads e rotas da aplicação para testar.