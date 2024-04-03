# Rotas de Disponibilidades (Availabilities)

A seguir estão as rotas de disponibilidades com todos os detalhes necessários,

### Base URL

```bash
<http://localhost:3000>
```


## Registrar disponibilidade

Rota para criar uma disponibilidade de dia e ter acesso às funcionalidades.

```bash
POST: /availabilities
```


### `Parâmetros da requisição`

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| day | string | data de disponibilidade |
| doctorId     | string | ID do médico |

### `Corpo da solicitação`

```json
{
	"day": "04-26-2024",
	"doctorId": "doctor_id"
}
```


### `Resposta`

```http 
status: 201
```

```json
{
	"message": "Availability created successfully!"
}
```

---


## Listar todas as disponibilidades


Rota para listar e obter todas as disponibilidades registradas.

```bash
GET: /availabilities
```

  
### `Search Params(query) da requisição`

  
Por padrão é exibida uma lista com 20 disponibilidades por página.

| Query | Tipo | Descrição |
| --------- | ------ | ----------------- |
| take | string | Número de disponibilidades |
| skip | string | Quantidade a pular para próxima página |


### `Exemplo de URL com parâmetros`
  
```bash
GET: /availabilities?take=10&skip=0
```

  
### `Resposta`

```http
status: 200
```

```json
{
	"availabilities": [
		{
			"id": "<availability_id>",
			"day": "04-26-2024",
			"doctor_id": "<doctor_id>",
	    }
	],
	"count": 1,
	"totalPages": 1
}
```

---
