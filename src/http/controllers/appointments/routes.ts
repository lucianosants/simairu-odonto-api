import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { createAppointment } from './create-appointment';
import { findAllAppointments } from './find-all-appointments';
import { getAppointmentById } from './get-appointment-by-id';
import { getAppointmentByDay } from './get-appointments-by-day';
import { updateAppointment } from './update-appointment';

export async function appointmentsRoutes(app: FastifyInstance) {
	app.post('/appointments', { onRequest: verifyJWT }, createAppointment);
	app.get('/appointments', { onRequest: verifyJWT }, findAllAppointments);
	app.get('/appointments/:id', { onRequest: verifyJWT }, getAppointmentById);
	app.post(
		'/appointments/day',
		{ onRequest: verifyJWT },
		getAppointmentByDay
	);
	app.patch('/appointments/:id', { onRequest: verifyJWT }, updateAppointment);
}
