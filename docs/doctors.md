# Rotas de Médicos (doctors)

A seguir estão as rotas de gerenciamento de médicos com todos os detalhes necessários,

### Base URL

```bash
<http://localhost:3000>
```


## Registrar médico

Rota para registrar um novo médico.

```bash
POST: /doctors
```


### `Parâmetros da requisição`

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| name      | string | Nome do médico   |
| email     | string | E-mail do médico |

### `Corpo da solicitação`

```json
{
	"name": "Hans Chucrutte",
	"email": "hans@exemplo.com",
}
```


### `Resposta`

```http 
status: 201
```

```js
{
	message: 'Doctor registered successfully!'
}
```

