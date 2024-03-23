import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { createPatients } from '@/utils/test/create-patient';

describe('Find All Appointments (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to find all appointments', async () => {
		const { auth } = await createPatients(app);

		const response = await request(app.server)
			.get('/appointments')
			.set(auth.field, auth.val)
			.query({ skip: '0', take: '20' });

		expect(response.statusCode).toEqual(200);
	});
});
