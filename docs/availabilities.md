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


