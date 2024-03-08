import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { userAlreadyExistsError } from '../errors/user-already-exists-error';

interface RegisterUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface RegisterUserUseCaseResponse {
	user: User;
}

export class RegisterUserUseCase {
	constructor(private userRepository: UsersRepository) {}

	public async execute({
		name,
		email,
		password,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const password_hash = await hash(password, 8);

		const userAlreadyExists = await this.userRepository.findByEmail(email);

		if (userAlreadyExists) throw new userAlreadyExistsError();

		const user = await this.userRepository.create({
			name,
			email,
			password_hash,
		});

		if (!user) throw new userAlreadyExistsError();

		return { user };
	}
}
