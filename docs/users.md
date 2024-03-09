# Rotas de usuário

A seguir estão as rotas de usuário com todos os detalhes necessários,

## Base URL

```bash
<http://localhost:3000>
```


## Registrar usuário

Rota para criar um novo usuário e ter acesso às funcionalidades.

```bash
POST: /users
```


### `Parâmetros da requisição`

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| name      | string | Nome de usuário   |
| email     | string | E-mail do usuário |
| password  | string | Senha do usuário  |

### Corpo da solicitação

```json
{
	"name": "Seu Nome",
	"email": "seu_email@exemplo.com",
	"password": "12345678"
}
```


### Resposta

```http 
status: 201
```

```js
{
	message: 'User registered successfully!'
}
```



