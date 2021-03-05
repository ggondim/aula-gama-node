# aula-gama-node

## Pré-requisitos

- `npm install` antes de rodar
- `nodemon` instalado global com `sudo npm i -g nodemon` ou opção local abaixo
- `json-server` instalado global caso queira utilizar a persistência em REST

## Como rodar a API

```shell
node server.js
``` 

ou utilizando o `nodemon`:

```shell
# global
nodemon server.js

# local
npx nodemon server.js
``` 

## Autenticação

Lembrando que as URLs precisam de um Authorization: Bearer válido (emitido no mesmo dia, com a assinatura HS256 utilizando a chave `chavesecreta` e qualquer payload.

Para emitir o token usando o JWT Debugger (https://jwt.io):
- Acesse o https://www.unixtimestamp.com/index.php e copie o timestamp em segundos atual
- Acesse https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.Rl7eTnsToImelR1WrrpYcCGPtE7GdSvKFpKBqSE5mh0
- Troque a chave da assinatura de `your-256-bit-secret` para `chavesecreta`
- Troque o claim `iat` para o timestamp copiado

## Trocando de persistência

Para configurar qual será o repositório utilizado para persistir os dados recebidos pela API, utilize o header `X-Persistence` na requisição, com um dos seguintes valores:

### `mongodb` - padrão

Precisa de um servidor de MongoDB rodando em `localhost` na porta 27017. O banco padrão para as operações é `"teste"`.

### `rest`

Tenta se conectar em uma API de REST rodando em `localhost` na porta 3030. A rota padrão para as operações é `/lançamentos`.

Para rodar o JSON Server usando como banco de dados o `db.json`, use o comando abaixo:

```shell
json-server "db.json" --port 3030
```

