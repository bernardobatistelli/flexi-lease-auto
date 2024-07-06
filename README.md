# API Restful para Gerenciamento de Vendedores

## Descrição
Este projeto consiste no desenvolvimento de uma API Restful utilizando Node.js e TypeScript para o gerenciamento de vendedores em oficinas. A API permite operações CRUD para vendedores, oficinas e seus respectivos relacionamentos, além de autenticação JWT e paginação.

## Tecnologias Utilizadas
- Node.js com TypeScript
- Express
- MongoDB
- Mongoose ou TypeORM
- Swagger para documentação
- JWT para autenticação
- Eslint e Prettier para manter o padrão do código
- Jest para testes
- Joi, express-validator, yup ou zod para validação de rotas e payload/body

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

### Passos
1. Clone o repositório:
   ```sh
   gh repo clone bernardobatistelli/flexi-lease-auto
   cd flexi-lease-auto
Instale as dependências:

sh
Copy code
npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

env
Copy code
MONGO_URI=sua_mongo_uri
JWT_SECRET=sua_chave_secreta
Inicie o servidor:

sh
Copy code
npm run start

Endpoints da API
Vendedores
Listar todos os vendedores
http
GET /api/v1/vendedores

Obter um vendedor específico
http
GET /api/v1/vendedores/:id

Criar um novo vendedor
http
POST /api/v1/vendedores

Atualizar um vendedor existente
http
PUT /api/v1/vendedores/:id

Deletar um vendedor
http
DELETE /api/v1/vendedores/:id

Oficinas
Listar todas as oficinas
http
GET /api/v1/oficinas

Obter uma oficina específica
http
GET /api/v1/oficinas/:id

Criar uma nova oficina
http
POST /api/v1/oficinas

Atualizar uma oficina existente
http
PUT /api/v1/oficinas/:id

Deletar uma oficina
http
DELETE /api/v1/oficinas/:id

Autenticação

Registrar um novo usuário
http
POST /api/v1/auth/register

Realizar login de um usuário
http
POST /api/v1/auth/login

Testes
Para rodar os testes, utilize:
sh
npm run test
Documentação
A documentação da API pode ser acessada através do Swagger na rota /api-docs.
