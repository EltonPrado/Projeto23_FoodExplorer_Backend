<h1>FoodExplorer</h1>

<br>

<p align="center">
  <img 
    alt="imagem de capa do projeto" 
    src=".github/cover.png" 
    width="100%"
  >
</p>

<br>

<h2> Sumário </h2>

1. [Aviso](#aviso)
2. [O projeto](#o-projeto)
3. [Funcionalidades](#funcionalidades)
4. [Utilizando a API](#utilizando-a-api)
5. [Tecnologias, Bibliotecas e Ferramentas](#tecnologias-bibliotecas-e-ferramentas)
6. [Autor](#autor)


## Aviso
**IMPORTANTE: O backend e o frontend da aplicação estão finalizados. Porem, poderão sofrer alterações, sendo acrescentados novas funcionalidades.**

- Para mais informações, acessar o [Frontend da aplicação](https://github.com/EltonPrado/Projeto23_FoodExplorer_Frontend).

- Você pode clonar o repositório e executar a aplicação localmente.


## O Projeto
O projeto foi desenvolvido como desafio final do programa [Explorer da Rocketseat](https://www.rocketseat.com.br/explorer). Ele segue a ideia de uma aplicação com cardápio interativo e digital para um restaurante fictício. 

**OBS**: O layout da aplicação está disponível e pode ser acessado através do [Figma](https://www.figma.com/file/GkqG5AUJe3ppcUEHfvOX6z/food-explorer?type=design&node-id=0-1&mode=design&t=wB70PWRN3XpNKK4t-0).
<br>

Na aplicação temos duas personas:

- **usuário comum (cliente)**: irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.

- **usuário admin**: é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato contem uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

### Fluxograma e Diagrama
Visto que temos duas personas, o fluxograma da aplicação ou as rotas de acesso de cada usuário é dividido da seguinte maneira:

<br>

<p align="center">
  <img 
    alt="imagem do fluxograma da aplicação" 
    src=".github/flowchart.png" 
    width="100%"
  >
</p>

<br>

Já para o diagrama foi utilizando a ferramenta online drawSQL. Com ela criou-se a estrutura do banco de dados da aplicação, que por sua vez, funcionará da seguinte forma:

<br>

<p align="center">
  <img 
    alt="Diagrama do banco de dados do FoodExplorer" 
    src=".github/diagram.png" 
    width="100%"
  >
</p>


### Deploy

Quer conferir o FoodExplorer? [Visite o projeto online.]()

Acesse utilizando uma das duas opções de login abaixo ou crie seu próprio usuário.

```bash
# Login como admin:
$ email: admin@email.com
$ password: 123321
```

```bash
# Login como user (já cadastrado):
$ email: user@email.com
$ password: 123321
```


## Funcionalidades

A aplicação vai nos permitir:

- [x] Cadastrar usuário;
- [x] autenticar usuário para fazer login;
- [x] Atualizar e-mail, senha ou nome de um usuário;
- [x] Mostrar informações de um prato especifico;
- [x] Favoritar pratos;
- [x] Cadastrar, atualizar, mostrar ou deletar um prato.


## Utilizando a API

- [Pré-requisitos de inicialização](#pré-requisitos-de-inicialização)
- [Iniciando o servidor](#iniciando-o-servidor)
- [Trabalhando as requisições](#trabalhando-as-requisições)
  - [Usuários](#usuários)
  - [Seções](#seções)
  - [Ingredientes](#ingredientes)
  - [Pratos](#pratos)
  - [Fotos](#fotos)

<br>

A aplicação FoodExplorer é dividida em duas partes:
1. Servidor/ Backend (API)
2. Frontend

**IMPORTANTE**: O backend precisa estar rodando na mesma maquina que o frontend para que ele seja renderizado de maneira correta.

### Pré-requisitos de inicialização

Antes de começar a usar a API é necessário ter instalado em sua máquina as seguintes ferramentas de trabalho:
- [VSCode](https://code.visualstudio.com/download) (ou algum editor de código)
- [Git](https://git-scm.com/download/) (de acordo com o seu sistema operacional)
- [Node.js](https://nodejs.org/pt-br/download/current) (de acordo com o seu sistema operacional)

### Iniciando o servidor

**DICA**: Comece criando uma pasta na sua area de trabalho ou local desejado, pois facilitará na busca pelos arquivos/ pasta clonada.

- Acesse a sua pasta dentro do terminal/ cmd
```bash
# Comando
$ cd + caminhoDaSuaPasta
```
**DICA**: Arraste a pasta para dentro do cmd, assim o caminho será colocado automaticamente.

- Clone o projeto para dentro da sua pasta
```bash
# Comando
$ git clone https://github.com/EltonPrado/Projeto23_FoodExplorer_Backend.git
```

- Entre no diretório
```bash
# Comando
$ cd Projeto23_FoodExplorer_Backend
```

- Instale as dependências
```bash
# Comando
$ npm install
```

- Execute as migrations e o seed
```bash
# Comando
$ npm run migrate
$ npm run seed
```
**OBS**: Para simplificar os comandos `npx knex migrate:latest` e `npx knex seed:run` para `npm run migrate` e `npm run seed` foi criado scripts dentro do arquivo package.json.

- Inicie o servidor local da aplicação
```bash
# Comando
$ npm run dev
```

Se tudo ocorrer bem, a seguinte mensagem vai aparecer no terminal:

```bash
Server is running on port 3333.
```

Isso significa que o servidor estará sendo inicializado na porta:3333. Utilize a URL base: `https://localhost:3333` dentro do Insomnia para fazer as requisições e acessar os recursos da API.

### Trabalhando as requisições

#### Usuários
- **Cadastrar/ Criar usuário** <br>
  Para cadastrar/ criar um usuário devemos:
  - Criar o recurso: `users`
  - URL da rota: `http://localhost:3333/users`
  - Método de requisição: `POST`
  - Padrão do corpo da requisição: `JSON`

  ```bash
  # Ficará assim:
    {
      "name": "user",
      "email": "user@email.com",
      "password": "123",
    }
  ```
  Será retornado uma resposta com o status code 201 se ok.

- **Atualizar usuário** <br>
  Para atualizar o usuário devemos:
  - Usar o recurso: `users`
  - URL da rota: `http://localhost:3333/users/`
  - Método de requisição: `PUT`
  - Padrão do corpo da requisição: `JSON`
  - bearer token (JWT)

  ```bash
  # Ficará assim:
    {
      "name": "user",
      "email": "user@email.com",
      "password": "123321",
      "old_password": "123"
    }
  ```
  **IMPORTANTE**: Apenas as informações passadas serão atualizadas.

  Será retornado uma resposta com o status code 200 se ok.


#### Seções
- **Criar seção** <br>
  Para gerar um token de autenticação para a seção vamos usar:
    - URL da rota: `http://localhost:3333/sessions`
    - Método de requisição: `POST`
    - Padrão do corpo da requisição: `JSON`

  ```bash
  # Ficará assim:
    {
      "email": "user@email.com",
      "password": "123321"
    }
  ```
  Se tudo der certo e o usuário estiver autenticado, você receberá como resposta as informações do usuário e o token da seguinte maneira:

  ```bash
    {
      "user": {
        "id": 2,
        "name": "user",
        "email": "user@email.com",
        "password": "$2a$08$JoaSt12TYsNavQqWq8wp3.s.zgOYOnkhAfJinKdHMk9B2BFw6heva",
        "isAdmin": 0,
        "created_at": "2023-07-14 15:00:08",
        "updated_at": "2023-07-14 15:00:08"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODkzNDY4NzAsImV4cCI6MTY4OTQzMzI3MCwic3ViIjoiNSJ9.SKLGqoYrp8u6kE2eU-6Zx1gg-Q9BgEPYEPlZ0H8VXRc"
    }
  ```
  **IMPORTANTE**: Deve-se utilizar o bearer token (JWT) no header da requisição, pois o usuário precisa estar autenticado em quase todas as requisições da aplicação. Não precisarão de autenticação os recursos: Criar conta e Fazer login.


#### Ingredientes
- **mostrar os ingredientes** <br>
  Para mostrar todos os ingredientes devemos:
  - Usar o recurso: `ingredients`
  - URL da rota: `http://localhost:3333/ingredients`
  - Método de requisição: `GET`
  - Padrão do corpo da requisição: `body` (padrão)
  - bearer token (JWT)

  Será retornado as seguintes informações:

  ```bash
    [
      {
        "id": 1,
        "name": "alface",
        "food_id": 1
      },

      [...]
    ]
  ```
  **OBS**: Será retornado todos os ingredientes cadastrados junto com os pratos, porem aqui foi utilizado [...] para reduzir por questão de exemplificação.


#### Pratos
- **Cadastrar/ Criar prato** <br>
  Para cadastrar/ criar um prato devemos:
  - Criar o recurso: `foods`
  - URL da rota: `http://localhost:3333/foods`
  - Método de requisição: `POST`
  - Padrão do corpo da requisição: `JSON`
  - bearer token (JWT)

  ```bash
  # Ficará assim:
    {
      "title": "Pomo bourbon",
      "category": "Bebidas",
      "description": "Maçã, whisky, canela. On the rocks.",
      "price": "29.97",
      "ingredients": ["maçã", "whisky", "canela"]
    }
  ```
  Será retornado uma resposta com o status code 201 se ok.

- **Atualizar prato** <br>
  Para atualizar um prato devemos:
  - Usar o recurso: `foods`
  - URL da rota: `http://localhost:3333/foods/1` (id do prato que será atualizado)
  - Método de requisição: `PUT`
  - Padrão do corpo da requisição: `JSON`
  - bearer token (JWT)

  ```bash
  # Ficará assim:
    {
      "title": "Pomo bourbon",
      "category": "Bebidas",
      "description": "Maçã, whisky, canela. On the rocks.",
      "price": "19.97",
      "ingredients": ["maçã", "whisky", "canela"]
    }
  ```
  **IMPORTANTE**: Apenas as informações passadas serão atualizadas.
  
  Será retornado uma resposta com o status code 200 se ok.

- **Atualizar foto do prato** <br>
  Para atualizar a foto de um prato devemos:
  - Usar o recurso: `foods`
  - URL da rota: `http://localhost:3333/foods/1` (1 = id do prato que terá a foto atualizada)
  - Método de requisição: `PATCH`
  - Padrão do corpo da requisição: `Multipart` (formulário)
  - bearer token (JWT)

  Deverá ser enviar um formulário contendo os campos name e value, onde devem ser preenchidos com os dados:

      name
      - image

      value
      - file (tipo de arquivo em formato de imagem)
  
  Será retornado uma resposta com o status code 200 se ok e as seguintes informações:

  ```bash
    {
      "id": 2,
      "category": "Bebidas",
      "title": "Pomo bourbon",
      "description": "Maçã, whisky, canela. On the rocks.",
      "price": 29.97,
      "image": "b57a812f239ccf880439-Mask group-11.png",
      "created_at": "2023-08-20 02:11:32",
      "updated_at": "2023-08-20 02:11:32"
    }
  ```

- **mostrar todos os pratos** <br>
  Para mostrar todos os pratos devemos:
  - Usar o recurso: `foods`
  - URL da rota: `http://localhost:3333/foods`
  - Método de requisição: `GET`
  - Padrão do corpo da requisição: `body` (padrão)
  - bearer token (JWT)

  Será retornado as seguintes informações:

  ```bash
    [
      {
        "id": 1,
        "category": "Refeições",
        "title": "Salada Ravanello",
        "description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
        "price": 49.97,
        "image": "dc892ae64ff157ff6306-Mask group.png",
        "created_at": "2023-07-13 14:21:53",
        "updated_at": "2023-07-13 15:02:47",
        "ingredients": [ <- 4 -> ]
      },

      [...]
    ]
  ```
  **OBS**: Será retornado todos os pratos, porem aqui foi utilizado [...] para reduzir por questão de exemplificação.

- **Pesquisar por prato especifico** <br>
  Para pesquisar por um prato especifico devemos:
  - Usar o recurso: `foods`
  - URL da rota: `http://localhost:3333/foods/1` (1 = id do prato que será exibido)
  - Método de requisição: `GET`
  - Padrão do corpo da requisição: `Body` (padrão)
  - bearer token (JWT)

  Será retornado as seguintes informações:

  ```bash
    {
      "id": 1,
      "category": "Refeições",
      "title": "Salada Ravello",
      "description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.",
      "price": 49.97,
      "image": "b7bf99ffe8a9c479cb1f-Mask group.png",
      "created_at": "2023-08-21 18:37:14",
      "updated_at": "2023-08-21 18:37:54",
      "ingredients": [ <- 4 -> ]
    }
  ```

- **Deletar prato** <br>
  Para deletar um prato devemos:
  - Usar o recurso: `foods`
  - URL da rota: `http://localhost:3333/foods/1` (1 = id do prato que será excluído)
  - Método de requisição: `DELETE`
  - Padrão do corpo da requisição: `Body` (padrão)

  Será retornado uma resposta com o status code 200 se ok.


#### Fotos
- **Mostrar foto de um prato** <br>
  Para mostrar a foto de um prato cadastrado/ criado devemos:
  - Criar o recurso: `files`
  - URL da rota: `http://localhost:3333/files/dc892ae64ff157ff6306-Mask group.png`
  - Método de requisição: `GET`
  - Padrão do corpo da requisição: `Body` (padrão)
  
  Será retornado a imagem do prato como resposta.


## Tecnologias, Bibliotecas e Ferramentas

Foram utilizadas as seguintes tecnologias, bibliotecas e ferramentas para o desenvolvimento do backend desse projeto:

- **JavaScript** - Faz toda a lógica da aplicação;
- **NodeJS** - Executa o JavaScript fora do navegador;
  - **Express** - Framework responsável por lidar com as requisições HTTP;
  - **Middleware** - Intercepta as solicitações-respostas da aplicação;
  - **SQlite** - Faz o armazenamento dos dados;
  - **bcryptjs** - Criptografa as senhas de usuário;
  - **Knex** - Gera os comandos SQL;
  - **JWT (JSONwebtoken)** - Faz a troca de informações no fluxo de autenticação entre aplicação e a API;
  - **multer** - Gerencia o upload de imagens;
  - **API Restful** - API que pode ser consumida cumprindo e aplicando as diretrizes RESTful;
  - **Cors** - Faz a conexão entre o backend e o frontend da aplicação;
  - **dotenv** - Cria variáveis de ambiente para lidar com dados sensíveis da aplicação;
  - **PM2** - Mantém a API sempre em execução;
  - **Deploy com render** - Utilizando o render para fazer a hospedagem do backend;
  - **Jest** - Realiza testes automatizados de integração;
- **Insomnia** - Lida com os testes da API fora do navegador;
- **Beekeper Studio** - Auxilia na visualização e execução de funções em nosso banco da dados;
- **Git** - Responsável por realizar o gerenciamento de versionamento do código;
- **GitHub** - Utilizado para armazenar a aplicação em nuvem.


## Autor

Desenvolvido por [Elton Prado](https://www.linkedin.com/in/elton-prado/). :rocket: