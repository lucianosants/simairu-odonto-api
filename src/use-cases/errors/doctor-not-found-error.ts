export class DoctorNotFoundError extends Error {
	constructor() {
		super('Doctor not found');
	}
}
