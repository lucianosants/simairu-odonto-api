# Rotas de usuário

A seguir estão as rotas de usuário com todos os detalhes necessários,

### Base URL

```bash
<http://localhost:3000>
```


## Registrar usuário

Rota para criar um novo usuário e ter acesso às funcionalidades.

```bash
POST: /users/auth/register
```


### `Parâmetros da requisição`

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| name      | string | Nome de usuário   |
| email     | string | E-mail do usuário |
| password  | string | Senha do usuário  |

### `Corpo da solicitação`

```json
{
	"name": "Seu Nome",
	"email": "seu_email@exemplo.com",
	"password": "12345678"
}
```


### `Resposta`

```http 
status: 201
```

```js
{
	message: 'User registered successfully!'
}
```


---

## Autenticar usuário

Rota para autenticar usuário e ter acesso às funcionalidades.

```bash
POST: /users/auth/login
```


### `Parâmetros da requisição`

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| email     | string | E-mail do usuário |
| password  | string | Senha do usuário  |

### Corpo da solicitação

```json
{
	"email": "seu_email@exemplo.com",
	"password": "12345678"
}
```


### Resposta

```http 
status: 200
```

```js
{  
 token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9<any_token_generated>'  
}
```



