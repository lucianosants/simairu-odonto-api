import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createPatients } from '@/utils/test/create-patient';

describe('Register Patient (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register a new patient', async () => {
		const { auth, current_doctor } = await createPatients(app);

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
