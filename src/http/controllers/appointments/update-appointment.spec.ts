import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Update Appointment (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should be able to update an appointment', async () => {
		const { auth } = await getUserToken(app);

		const doctor = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		const patient = await prisma.patient.create({
			data: {
				name: 'Linus Torvalds',
				email: 'linus_t@mail.com',
				doctorId: doctor.id,
			},
		});

		const { id } = await prisma.appointment.create({
			data: {
				day: new Date('04-26-2024').toLocaleDateString(),
				doctor_id: doctor.id,
				patient_id: patient.id,
			},
		});

		const response = await request(app.server)
			.patch(`/appointments/${id}`)
			.set(auth.field, auth.val)
			.send({
				day: new Date('04-30-2024').toLocaleDateString(),
				status: 'HELD',
			});

		expect(response.statusCode).toEqual(201);
	});
});
