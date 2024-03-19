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

---


## Listar todos os médicos

Rota para listar e obter todos os médicos registrados.

```bash
GET: /doctors
```


### `Search Params(query) da requisição`

Por padrão é exibida uma lista com 20 médicos

| Query | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| take      | string | Número de médicos  |
| skip     | string | Quantidade a pular para próxima página |

### `Exemplo de URL com parâmetros`

```bash
GET: /doctors?take=10&skip=0
```


### `Resposta`

```http 
status: 200
```

```json
{
    "doctors": [
        {
            "id": "_some_id",
            "name": "Hans",
            "email": "hans@mail.com",
            "available": true,
            "created_at": "2024-03-12T18:40:15.938Z"
        }
    ],
    "count": 1,
    "totalPages": 1
}
```

---


## Atualizar médico

Rota para atualizar o status de um médico.


```bash

PATCH: /doctors/<doctor_id>

```

### `Parâmetros da requisição`

| Parâmetros | Tipo    | Descrição        |
| ---------- | ------- | ---------------- |
| id         | string  | ID do médico     |
| available  | boolean | Status do médico |


### `Corpo da solicitação`

  
```json

{

	"available": true,

}

```


### `Resposta`


```http

status: 201

```

  

```js

{

message: 'Doctor updated successfully!'

}

```





