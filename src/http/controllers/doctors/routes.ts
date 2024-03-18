import { FastifyInstance } from 'fastify';

import { RegisterDoctor } from './register-doctor';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { findAllDoctors } from './find-all-doctors';
import { updateDoctor } from './update-doctor';

export async function doctorRoutes(app: FastifyInstance) {
	app.post('/doctors', { onRequest: verifyJWT }, RegisterDoctor);
	app.get('/doctors', { onRequest: verifyJWT }, findAllDoctors);
	app.patch('/doctors/:id', { onRequest: verifyJWT }, updateDoctor);
}
