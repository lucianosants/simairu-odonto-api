# Simairu Odonto API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)


## `Descrição`
Este projeto tem como objetivo, facilitar a realização de **agendamentos** para **consultas médicas**. Nele, poderá ser cadastrado **médicos**, **pacientes** e suas atribuições ao ser agendado de acordo com sua disponibilidade. Neste projeto, foi utilizado **padrões de arquitetura de software** e implementação de **Unit Tests (Teste unitários)** e **E2E Tests (testes de ponta a ponta)**.



##  `Tecnologias`

- Node.js
- Fastify
- Docker
- Prisma
- Vitest
- TypeScript


## `Funcionalidades`

  - [x] `RFs (Requisitos funcionais)`
	- [x] Deve ser possível se autenticar
	- [x] Deve ser possível obter o perfil de um usuário logado
	- [x] Deve ser possível criar o cadastro de um médico 
	- [x] Deve ser possível obter uma lista de médicos
	- [x] Deve ser possível Alterar informações de um médico
	- [x] Deve ser possível criar o cadastro de um paciente
	- [x] Deve ser possível obter uma lista de pacientes
	- [x] Deve ser possível atualizar o status do médico
	- [x] Deve ser possível obter uma lista de consultas
	- [x] Deve ser possível buscar uma consulta por id
	- [x] Deve ser possível buscar uma ou mais consultas por data
	- [x] Deve ser possível o obter uma lista de disponibilidade
	- [x] Deve ser possível buscar um pacientes por nome
	- [x] Deve ser possível mudar o dia da consulta
	- [x] Deve ser possível marcar a consulta como realizada
	- [x] Deve ser possível marcar uma consulta como não realizada
-  [x] `RN (Regras de negócio)` 
	- [x] Não poderá ter médicos e pacientes duplicados
-  [x] `RNFs (Requisitos não funcionais)`
	- [x] A senha precisa ser criptografada
	- [x] Os dados precisam persistir em um banco de dados postgreSQL
	- [x] Todas as listas precisam ser paginadas com até 20 itens
	- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

## `Instalação`

### Pré-requisitos
- Ter o Node.js instalado;
- Ter o Docker e Docker-compose instalados e configurados.

Para instalar a API, execute os seguintes comandos no terminal:

`Instalar dependências`

```shell
npm install
```


`Execute contêiner Docker`

```shell
docker compose up -d
```


`Rodar migrations do Prisma`

```shell 
npx prisma migrate dev
```


`Iniciar projeto`
```shell 
npm run start:dev
```



> Executar testes unitários e E2E

```shell 
# unit
npm run test:unit
npm run test:unit:watch

# e2e
npm run test:e2e
npm run test:e2e:watch
``` 

---

Desenvolvido com 💜 por [lucianosants](https://lucianosants.dev)
