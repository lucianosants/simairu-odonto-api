import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { createPatients } from '@/utils/test/create-patient';

describe('Delete Availability (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to delete availability', async () => {
		const { auth, current_doctor: doctorId } = await createPatients(app);

		await request(app.server)
			.post('/availabilities')
			.set(auth.field, auth.val)
			.send({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId,
			});

		const availabilities = await request(app.server)
			.get('/availabilities')
			.set(auth.field, auth.val)
			.query({ skip: '0', take: '20' });

		const availability = availabilities.body.availabilities[0].id;

		const response = await request(app.server)
			.delete(`/availabilities/${availability}`)
			.set(auth.field, auth.val);

		expect(response.statusCode).toEqual(200);
	});
});
