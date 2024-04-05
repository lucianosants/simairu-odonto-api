import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { createAvailability } from './create-availability';
import { findAllAvailabilities } from './find-all-availabilities';
import { deleteAvailability } from './delete-availability';

export async function availabilitiesRoutes(app: FastifyInstance) {
	app.post('/availabilities', { onRequest: verifyJWT }, createAvailability);
	app.get('/availabilities', { onRequest: verifyJWT }, findAllAvailabilities);
	app.delete(
		'/availabilities/:id',
		{ onRequest: verifyJWT },
		deleteAvailability
	);
}
