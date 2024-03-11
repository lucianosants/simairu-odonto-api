import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function getUserToken(app: FastifyInstance) {
	const data = {
		name: 'John Doe',
		password: '12345678',
		email: 'john@mail.com',
	};

	await request(app.server)
		.post('/users/auth/register')
		.send({ ...data });

	const response = await request(app.server)
		.post('/users/auth/login')
		.send({ ...data });

	return { token: response.body.token };
}
