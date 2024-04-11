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


## Listar todos os pacientes

Rota para listar e obter todos os pacientes cadastrados.

```bash
GET: /patients
```

### `Search Params(query) da requisição`

Por padrão é exibida uma lista com 20 pacientes por página.

| Query | Tipo   | Descrição         |
| --------- | ------ | ----------------- |
| take      | string | Número de pacientes  |
| skip     | string | Quantidade a pular para próxima página |

### `Exemplo de URL com parâmetros`

```bash
GET: /patients?take=10&skip=0
```


### `Resposta`

```http 
status: 200
```

```json
{
    "patients": [
        {
          "id": "<id_do_paciente>",
      	  "name": "John Doe",
          "email": "john@mail.com",
          "created_at": "2024-03-14T20:11:53.587Z",
          "doctorId": "<id_do_medico>"
        }
    ],
    "count": 1,
    "totalPages": 1
}
```



## Buscar pacientes por nome

  

Rota para obter uma lista de pacientes.

```bash
GET: /patients/<patient_id>
```

  
### `Resposta`

```http
status: 200
```


```json
{
	"patients": [
        {
            "id": "patient_id",
            "name": "John Doe",
            "email": "john@mail.com",
            "created_at": "2024-04-11T12:45:27.169Z",
            "doctorId": "doctor_id"
        }
    ]
}
```


---


