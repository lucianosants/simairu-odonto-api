import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createPatients } from '@/utils/test/create-patient';

describe('Create Availability (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should be able to create an Availability', async () => {
		const { auth, current_doctor: doctorId } = await createPatients(app);

		const response = await request(app.server)
			.post('/availabilities')
			.set(auth.field, auth.val)
			.send({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId,
			});

		expect(response.statusCode).toEqual(201);
	});
});
