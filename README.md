# Around The U.S. — Backend

API REST desenvolvida durante o curso de Desenvolvimento Web da TripleTen.

O projeto consiste no desenvolvimento do backend da aplicação Around The U.S., responsável pelo gerenciamento de usuários e cartões, utilizando Node.js, Express, MongoDB e Mongoose.

## Sobre o projeto

O Around The U.S. é uma aplicação onde os usuários podem compartilhar imagens de diferentes lugares.

Nesta etapa do projeto, foi desenvolvido o backend responsável por:

- Gerenciamento de usuários
- Criação e consulta de usuários
- Gerenciamento de cartões
- Criação de cartões
- Exclusão de cartões
- Armazenamento dos dados em MongoDB
- Validação dos dados utilizando Mongoose
- Organização da aplicação utilizando controllers, routes e models

## Tecnologias utilizadas

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon
- Git
- GitHub

## Estrutura do projeto

```text
web_project_around_express/
│
├── controllers/
│   ├── users.js
│   └── cards.js
│
├── models/
│   ├── user.js
│   └── card.js
│
├── routes/
│   ├── users.js
│   └── cards.js
│
├── app.js
├── package.json
└── package-lock.json
