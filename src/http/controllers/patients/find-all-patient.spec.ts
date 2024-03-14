import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { createPatients } from '@/utils/test/create-patient';

describe('Find All Patients (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register a new patient', async () => {
		const { auth } = await createPatients(app);

		const response = await request(app.server)
			.get('/patients')
			.set(auth.field, auth.val)
			.query({ take: '20', skip: '0' });

		expect(response.statusCode).toEqual(200);
	});
});
