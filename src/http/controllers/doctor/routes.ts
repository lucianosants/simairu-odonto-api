import { FastifyInstance } from 'fastify';

import { RegisterDoctor } from './register-doctor';

export async function doctorRoutes(app: FastifyInstance) {
	app.post('/doctors', RegisterDoctor);
}
