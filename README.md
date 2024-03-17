# Manage Holidays

## Descrição
O **Manage Holidays** é uma aplicação desenvolvida para facilitar o gerenciamento de feriados. Com esta aplicação, os usuários podem visualizar, adicionar, editar e excluir informações sobre feriados. Isso pode incluir detalhes como a data do feriado, o nome do feriado e uma breve descrição.

## Como Rodar a Aplicação

Para rodar a aplicação localmente em seu ambiente de desenvolvimento, siga os passos abaixo:

1. **Primeira opção:**
   ```bash
   git clone https://github.com/KauetSilva/manage-holidays.git
   *******FRONTEND*******
   cd manage-holidays
   npm install || yarn
   npm run dev || yarn dev
   *******BACKEND*******
   cd server
   npm install || yarn
   npm run dev || yarn dev

2. **Segunda opção:**
    ```bash
    git clone https://github.com/KauetSilva/manage-holidays.git
    cd manage-holidays
    cd docker
    docker compose up -d


## Recursos Principais
- Visualização de feriados existentes
- Adição de novos feriados
- Edição de informações de feriados existentes
- Exclusão de feriados

## Tecnologias Utilizadas
- **Frontend:** Next.js.
- **Backend:** Node.js, Express.js.
- **Banco de Dados:** SQLite + Prisma.
- **Estilização:** Tailwind CSS.
- **Outras ferramentas e tecnologias conforme necessário**

## Melhorias a realizar no projeto
- **Frontend:** Tema dark para o site.
- **Frontend:** Criar multi linguagem na plataforma.
- **Backend:** Criar um middleware de autenticação onde só irá receber requisições com segurança.
- **Backend & Frontend:** Implementar testes unitários e de integração utilizando Jest ou Mocha.
- **Responsividade:** Aprimorar a responsividade do layout para dispositivos móveis.
- **Performance:** Aprimorar a performance para melhor experiência do usuário.

## Licença
Este projeto está sob licença [MIT](./LICENSE).
