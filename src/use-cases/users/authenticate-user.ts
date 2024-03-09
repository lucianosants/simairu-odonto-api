import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface AuthenticateUserUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUserUseCaseResponse {
	user: User;
}

export class AuthenticateUserUseCase {
	constructor(private userRepository: UsersRepository) {}

	public async execute({
		email,
		password,
	}: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) throw new InvalidCredentialsError();

		const passwordMatch = await compare(password, user.password_hash);

		if (!passwordMatch) throw new InvalidCredentialsError();

		return { user };
	}
}
