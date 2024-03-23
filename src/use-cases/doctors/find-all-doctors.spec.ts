import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { FindAllDoctorsUseCase } from './find-all-doctors';

let doctorsRepository: DoctorsRepository;
let sut: FindAllDoctorsUseCase;

describe('Find All Doctors Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		sut = new FindAllDoctorsUseCase(doctorsRepository);
	});

	it('should be able to find all doctors', async () => {
		await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		await doctorsRepository.create({
			name: 'John Doe',
			email: 'john@email.com',
			available: true,
		});

		const doctors = await sut.execute({ take: 2, skip: 0 });

		expect(doctors?.doctors).toHaveLength(2);
		expect(doctors?.count).toEqual(2);
		expect(doctors?.totalPages).toEqual(1);
	});

	it('should be able to find an empty list', async () => {
		const doctors = await sut.execute({ take: 2, skip: 0 });

		expect(doctors?.doctors).toHaveLength(0);
		expect(doctors?.count).toEqual(0);
		expect(doctors?.totalPages).toEqual(0);
	});
});
