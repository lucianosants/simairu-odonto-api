import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Register Patient (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register a new patient', async () => {
		const { token } = await getUserToken(app);

		const auth = { field: 'Authorization', val: `Bearer ${token}` };

		await request(app.server)
			.post('/doctors')
			.set(auth.field, auth.val)
			.send({
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
			});

		const doctors = await request(app.server)
			.get('/doctors')
			.set(auth.field, auth.val)
			.query({ take: 1, skip: 0 });

		const current_doctor = doctors.body.doctors[0].id;

		const response = await request(app.server)
			.post('/patients')
			.set(auth.field, auth.val)
			.send({
				name: 'John Doe',
				email: 'john@mail.com',
				current_doctor,
			});

		expect(response.statusCode).toEqual(201);
	});
});
