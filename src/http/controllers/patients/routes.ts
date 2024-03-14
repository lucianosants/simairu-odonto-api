import { FastifyInstance } from 'fastify';

import { registerPatient } from './register-patient';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { findAllPatients } from './find-all-patients';

export async function patientsRoutes(app: FastifyInstance) {
	app.post('/patients', { onRequest: verifyJWT }, registerPatient);
	app.get('/patients', { onRequest: verifyJWT }, findAllPatients);
}
