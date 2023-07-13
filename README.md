<h1>FoodExplorer</h1>

<br>

<p align="center">
  <img 
    alt="imagem de capa do projeto" 
    src=".github/capa.png" 
    width="100%"
  >
</p>

<br>

<h2> Sumário </h2>

1. [O projeto](#o-projeto)
2. [Tecnologias, Bibliotecas e Ferramentas](#tecnologias-bibliotecas-e-ferramentas)
3. [Funcionalidades](#funcionalidades)
<!--
4. [Utilizando a API](#utilizando-a-api)
-->
<br>

## O Projeto

O projeto foi desenvolvido como desafio final do programa [Explorer da Rocketseat](https://www.rocketseat.com.br/explorer). Ele segue a ideia de uma aplicação com cardápio interativo e digital para um restaurante fictício. Na aplicação temos duas personas: o usuário e o admin;

**usuário comum (cadastrado)**: irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.

**usuário admin**: é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

Quer conferir o FoodExplorer? [Visite o projeto online.]()

**OBS: Está sendo desenvolvido o frontend da aplicação.**
<br>

### Fluxograma da aplicação

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

<!--
<br>
### Diagrama do banco de dados

Utilizando a ferramenta online drawSQL criou-se o diagrama da estrutura do banco de dados da aplicação. Ele vai funcionar da seguinte forma:

<br>

<p align="center">
  <img 
    alt="Diagrama do banco de dados do FoodExplorer" 
    src=".github/diagram.png" 
    width="100%"
  >
</p>

<br>
-->

## Tecnologias, Bibliotecas e Ferramentas

Estão sendo utilizadas as seguintes tecnologias, bibliotecas e ferramentas para o desenvolvimento do backend desse projeto:

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

<br>

## Funcionalidades

A aplicação vai nos permitir:

- [x] Cadastrar usuário;
- [x] autenticar usuário para fazer login;
- [x] Atualizar e-mail, senha ou nome de um usuário;
- [x] Mostrar informações de um prato especifico;
- [x] Cadastrar, atualizar, mostrar ou deletar um prato (usuário admin).
<!--
## Utilizando a API
- [Iniciando a aplicação]()
-->