import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { RegisterUserUseCase } from './register-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: UsersRepository;
let sut: RegisterUserUseCase;

describe('Register User Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUserUseCase(usersRepository);
	});

	it('should be able to register user', async () => {
		const { user } = await sut.execute({
			email: 'john@mail.com',
			name: 'John Doe',
			password: '12345678',
		});

		expect(user).contain({
			name: 'John Doe',
			email: 'john@mail.com',
		});
		expect(user.id).toEqual(expect.any(String));
	});

	it('should create a hash of the password', async () => {
		const { user } = await sut.execute({
			email: 'john@mail.com',
			name: 'John Doe',
			password: '12345678',
		});

		const comparedPassword = await compare('12345678', user.password_hash);

		expect(comparedPassword).toBe(true);
	});
});
