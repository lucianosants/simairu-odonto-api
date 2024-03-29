import { FastifyInstance } from 'fastify';

import { registerUser } from './register-user';
import { authenticateUser } from './authenticate-user';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users/auth/register', registerUser);
	app.post('/users/auth/login', authenticateUser);
}
