# Rotas de Pacientes (patients)

A seguir estão as rotas de gerenciamento de pacientes com todos os detalhes necessários,

### Base URL

```bash
<http://localhost:3000>
```


## Registrar paciente

Rota para registrar um novo paciente.

```bash
POST: /patients
```


### `Parâmetros da requisição`

| Parâmetro | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| name      | string | Nome do paciente   |
| email     | string | E-mail do paciente |
| current_doctor | string | ID de um médico |

### `Corpo da solicitação`

```json
{
	"name": "John Doe",
	"email": "john@exemplo.com",
    "current_doctor": "<id_do_medico>"
}
```


### `Resposta`

```http 
status: 201
```

```js
{
	message: 'Patient registered successfully!'
}
```

---


