## Cadastro de Usuários e Signos

Este é um aplicativo simples para realizar operações CRUD (Create, Read, Update, Delete) em um banco de dados PostgreSQL para cadastro de usuários, incluindo a determinação do signo do usuário com base na data de nascimento fornecida.

### Pré-requisitos

Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina antes de começar.

### Instalação

1. Clone o repositório do projeto em sua máquina local:

    ```bash
    git clone <URL_do_repositório>
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd nome_do_diretório
    ```

3. Instale as dependências do projeto:

    ```bash
    npm install
    ```

4. Configure o PostgreSQL:

   - Certifique-se de ter um servidor PostgreSQL em execução.
   - Crie um banco de dados com o nome `cadastro_signo`.
   - Ajuste as credenciais do banco de dados conforme necessário no arquivo `index.js`.

### Uso

1. Inicie o servidor:

    ```bash
    node index.js
    ```

2. O servidor estará em execução em `http://localhost:4000`.

### Rotas

- `GET /cadastros`: Retorna todos os cadastros de usuários no banco de dados.
- `POST /cadastros`: Cria um novo cadastro de usuário. O corpo da solicitação deve incluir `nome`, `sobrenome`, `email` e `aniversario` (formato `YYYY-MM-DD`).
- `PUT /cadastros/:id`: Atualiza um cadastro de usuário existente com o ID fornecido. O corpo da solicitação deve incluir os campos a serem atualizados.
- `DELETE /cadastros/:id`: Exclui um cadastro de usuário com o ID fornecido.

### Observações

- Ao criar um novo cadastro de usuário, o aplicativo também determina automaticamente o signo e a idade do usuário com base na data de nascimento fornecida.

Espero que isso ajude! Se precisar de mais alguma coisa, estou à disposição.