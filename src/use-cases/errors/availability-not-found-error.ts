export class AvailabilityNotFoundError extends Error {
	constructor() {
		super('Availability not found');
	}
}
