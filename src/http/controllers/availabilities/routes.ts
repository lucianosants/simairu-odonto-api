import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { createAvailability } from './create-availability';
import { findAllAvailabilities } from './find-all-availabilities';

export async function availabilitiesRoutes(app: FastifyInstance) {
	app.post('/availabilities', { onRequest: verifyJWT }, createAvailability);
	app.get('/availabilities', { onRequest: verifyJWT }, findAllAvailabilities);
}
