export class DoctorAlreadyExistsError extends Error {
	constructor() {
		super('This doctor already exists');
	}
}
