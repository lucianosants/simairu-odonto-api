# Rotas de Consultas (Appointments)

A seguir estão as rotas de gerenciamento de consultas com todos os detalhes necessários,

  
### Base URL

```bash
<http://localhost:3000>
```

  
  
## Agendar consulta

Rota para agendar uma consulta.

```bash
POST: /appointments
```

  
### `Parâmetros da requisição`

| Parâmetros | Tipo   | Descrição           |
| ---------- | ------ | ------------------- |
| day        | Date   | Data de agendamento |
| doctorId   | String | ID do médico        |
| patientID  | String | ID do paciente      |
| status     | Enum   | Status da consulta  |


### `Corpo da solicitação`


```json
{
	"day": "2024-03-21T13:02:30.689Z",
	"doctorId": "<doctor_id>",
	"patientId": "<patient_id>",
	"status": "PENDING"
}
```

  

### `Resposta`

```http
status: 201
```

  
```js
{
	message: 'Appointment created successfully!'
}
```

  
---

 ## Listar todas as consultas


Rota para listar e obter todos as consultas registradas.

```bash
GET: /appointments
```

  
### `Search Params(query) da requisição`

  
Por padrão é exibida uma lista com 20 médicos

| Query | Tipo | Descrição |
| --------- | ------ | ----------------- |
| take | string | Número de consultas |
| skip | string | Quantidade a pular para próxima página |

  
### `Exemplo de URL com parâmetros`
  
```bash
GET: /appointments?take=10&skip=0
```

  
### `Resposta`

```http
status: 200
```


```json
{
	"appointments": [
		{
	      "id": "<appointment_id>",
	      "day": "2024-03-21T13:02:30.689Z",
	      "created_at": "2024-03-21T13:37:27.357Z",
	      "status": "PENDING",
	      "doctor_id": "<doctor_id>",
	      "patient_id": "<patient_id>"
	    }
	],
	"count": 1,
	"totalPages": 1
}
```

---
