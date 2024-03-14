import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { getUserToken } from './get-user-token';

export async function createPatients(app: FastifyInstance) {
	const { token } = await getUserToken(app);

	const auth = { field: 'Authorization', val: `Bearer ${token}` };

	await request(app.server).post('/doctors').set(auth.field, auth.val).send({
		name: 'Hans Chucrutte',
		email: 'hans@email.com',
	});

	const doctors = await request(app.server)
		.get('/doctors')
		.set(auth.field, auth.val)
		.query({ take: 1, skip: 0 });

	const current_doctor = doctors.body.doctors[0].id;

	await request(app.server).post('/patients').set(auth.field, auth.val).send({
		name: 'Linus Torvalds',
		email: 'linus_t@mail.com',
		current_doctor,
	});

	await request(app.server).post('/patients').set(auth.field, auth.val).send({
		name: 'Bill Bates',
		email: 'gates@mail.com',
		current_doctor,
	});

	return { auth, token, doctors, current_doctor };
}
