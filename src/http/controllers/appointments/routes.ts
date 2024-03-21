import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { createAppointment } from './create-appointment';

export async function appointmentsRoutes(app: FastifyInstance) {
	app.post('/appointments', { onRequest: verifyJWT }, createAppointment);
}
