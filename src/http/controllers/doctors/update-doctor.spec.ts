import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { getUserToken } from '@/utils/test/get-user-token';

describe('Update Doctor (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to update a doctor', async () => {
		const { token } = await getUserToken(app);

		await request(app.server)
			.post('/doctors')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: false,
			});

		const doctors = await request(app.server)
			.get('/doctors')
			.set('Authorization', `Bearer ${token}`)
			.query({ take: 1, skip: 0 });

		const doctorId = doctors.body.doctors[0].id;

		const response = await request(app.server)
			.patch(`/doctors/${doctorId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({ available: true });

		expect(response.statusCode).toEqual(201);
	});
});
