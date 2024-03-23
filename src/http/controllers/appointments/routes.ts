import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { createAppointment } from './create-appointment';
import { findAllAppointments } from './find-all-appointments';

export async function appointmentsRoutes(app: FastifyInstance) {
	app.post('/appointments', { onRequest: verifyJWT }, createAppointment);
	app.get('/appointments', { onRequest: verifyJWT }, findAllAppointments);
}
