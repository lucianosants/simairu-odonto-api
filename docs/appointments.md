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

 