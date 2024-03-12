import { FastifyInstance } from 'fastify';

import { RegisterDoctor } from './register-doctor';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { findAllDoctors } from './find-all-doctors';

export async function doctorRoutes(app: FastifyInstance) {
	app.post('/doctors', { onRequest: verifyJWT }, RegisterDoctor);
	app.get('/doctors', { onRequest: verifyJWT }, findAllDoctors);
}
