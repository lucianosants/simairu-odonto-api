import { FastifyInstance } from 'fastify';

import { registerPatient } from './register-patient';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function patientsRoutes(app: FastifyInstance) {
	app.post('/patients', { onRequest: verifyJWT }, registerPatient);
}
