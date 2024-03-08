export class userAlreadyExistsError extends Error {
	constructor() {
		super('This user already exists');
	}
}
