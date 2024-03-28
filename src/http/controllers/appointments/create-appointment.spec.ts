import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createPatients } from '@/utils/test/create-patient';

describe('Create Appointment (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should be able to create an appointment', async () => {
		const { auth } = await createPatients(app);

		const patients = await request(app.server)
			.get('/patients')
			.set(auth.field, auth.val)
			.query({ take: '1', skip: '0' });

		const patientId = patients.body.patients[0].id;
		const doctorId = patients.body.patients[0].doctorId;

		const response = await request(app.server)
			.post('/appointments')
			.set(auth.field, auth.val)
			.send({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId,
				patientId,
				status: 'PENDING',
			});

		expect(response.statusCode).toEqual(201);
	});
});
