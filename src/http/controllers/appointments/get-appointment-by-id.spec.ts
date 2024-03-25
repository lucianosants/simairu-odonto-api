import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createPatients } from '@/utils/test/create-patient';

describe('Get Appointment By Id (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should get an appointment by id', async () => {
		const { auth } = await createPatients(app);

		const patients = await request(app.server)
			.get('/patients')
			.set(auth.field, auth.val)
			.query({ take: '1', skip: '0' });

		const patientId = patients.body.patients[0].id;
		const doctorId = patients.body.patients[0].doctorId;

		await request(app.server)
			.post('/appointments')
			.set(auth.field, auth.val)
			.send({
				day: new Date(),
				doctorId,
				patientId,
				status: 'PENDING',
			});

		const appointments = await request(app.server)
			.get('/appointments')
			.set(auth.field, auth.val)
			.query({ skip: '0', take: '1' });

		const appointmentId = appointments.body.appointments[0].id;

		const response = await request(app.server)
			.get(`/appointments/${appointmentId}`)
			.set(auth.field, auth.val);

		expect(response.statusCode).toEqual(200);
	});
});
