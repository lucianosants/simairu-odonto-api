import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { UsersRepository } from '@/repositories/users-repository';
import { AuthenticateUserUseCase } from './authenticate-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

let usersRepository: UsersRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUserUseCase(usersRepository);
	});

	it('should be able to authenticate user', async () => {
		await usersRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			password_hash: await hash('12345678', 8),
		});

		const { user } = await sut.execute({
			email: 'john@mail.com',
			password: '12345678',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be possible to authenticate with wrong email', async () => {
		await usersRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			password_hash: await hash('12345678', 8),
		});

		await expect(
			sut.execute({ email: 'john_2@mail.com', password: '12345678' })
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should not be possible to authenticate with wrong password', async () => {
		await usersRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			password_hash: await hash('12345678', 8),
		});

		await expect(
			sut.execute({ email: 'john@mail.com', password: '123456789' })
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
