import { FastifyInstance } from 'fastify';

import { registerUser } from './register-user';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', registerUser);
}
