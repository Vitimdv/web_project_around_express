# Around Express API (web_project_around_express)

API REST desenvolvida em Node.js com o framework Express para fornecer os dados do projeto **Around (EUA Afora)**.

## Descrição do Projeto e Funcionalidades

Este projeto é o back-end da aplicação "EUA Afora", responsável por fornecer dados estruturados de usuários e cartões de fotos para o front-end por meio de requisições HTTP RESTful. Os dados são carregados de arquivos JSON locais de forma assíncrona com tratamento de erros completo e respostas padronizadas.

### Rotas Disponíveis

- **`GET /users`**: Retorna a lista completa de usuários cadastrados no formato JSON.
- **`GET /users/:id`**: Retorna os detalhes de um usuário específico a partir do seu `_id`. Se o ID não for encontrado, retorna status `404` com a mensagem `{"message": "ID do usuário não encontrado"}`.
- **`GET /cards`** (e **`GET /card`**): Retorna a lista de todos os cartões cadastrados no formato JSON.
- **Qualquer rota inexistente** (ex: `GET /`): Retorna status `404` com a mensagem `{"message": "A solicitação não foi encontrada"}`.

Em caso de falhas inesperadas na leitura dos arquivos de dados, o servidor responde com status `500` e a mensagem `{"message": "Ocorreu um erro no servidor"}`.

---

## Tecnologias e Técnicas Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express.js**: Framework minimalista e flexível para criação de rotas e manipulação de requisições e respostas HTTP.
- **Módulos Nativos do Node.js**:
  - `fs.promises`: Manipulação assíncrona do sistema de arquivos para leitura dos dados em formato JSON.
  - `path`: Construção de caminhos de arquivos absolutos e normalizados multiplataforma (`path.join`).
- **Nodemon**: Ferramenta para recarga automática (*hot reload*) do servidor durante o desenvolvimento.
- **ESLint**: Linter para garantia da qualidade e padronização do código, utilizando o **Airbnb JavaScript Style Guide** (`eslint-config-airbnb-base`), com exceções para `_id` e desativação de `no-console` e `linebreak-style`.
- **EditorConfig**: Padronização de indentação (2 espaços), codificação UTF-8 e quebras de linha entre diferentes editores de código.
- **Clean Code & Arquitetura Modular**: Separação clara de responsabilidades entre ponto de entrada (`app.js`), roteadores modulares (`routes/`) e camada de dados (`data/`).

---

## Como Instalar e Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado na máquina (versão 14 ou superior recomendada).
- Gerenciador de pacotes npm.

### Passo a passo

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Executar o linter de código:**
   ```bash
   npm run lint
   ```

3. **Executar o servidor em modo de desenvolvimento (Hot Reload com Nodemon):**
   ```bash
   npm run dev
   ```

4. **Executar o servidor em modo de produção:**
   ```bash
   npm run start
   ```

O servidor estará rodando em `http://localhost:3000`.

---

## Demonstração e Capturas de Tela

### Estrutura dos Arquivos do Projeto
```
web_project_around_express/
├── data/
│   ├── cards.json
│   └── users.json
├── routes/
│   ├── cards.js
│   └── users.js
├── .editorconfig
├── .eslintrc
├── .gitignore
├── app.js
├── package.json
└── README.md
```

*(Imagens e vídeos de demonstração de testes via Postman/navegador podem ser incluídos nesta seção).*
