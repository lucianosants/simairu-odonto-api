import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { RegisterDoctorUseCase } from './register-doctor';

let doctorsRepository: DoctorsRepository;
let sut: RegisterDoctorUseCase;

describe('Register Doctor Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		sut = new RegisterDoctorUseCase(doctorsRepository);
	});

	it('should be able to register a new doctor', async () => {
		const { doctor } = await sut.execute({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		expect(doctor.id).toEqual(expect.any(String));
		expect(doctor).contain({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});
	});

	it('should be register doctor with an valid email', async () => {
		const { doctor } = await sut.execute({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		expect(doctor.email).toEqual(expect.stringMatching(emailRegex));
	});
});
