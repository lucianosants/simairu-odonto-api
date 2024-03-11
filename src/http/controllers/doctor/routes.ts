import { FastifyInstance } from 'fastify';

import { RegisterDoctor } from './register-doctor';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function doctorRoutes(app: FastifyInstance) {
	app.post('/doctors', { onRequest: verifyJWT }, RegisterDoctor);
}
