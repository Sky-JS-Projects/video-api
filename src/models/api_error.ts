export default class ApiError extends Error {
	status?: number;

	constructor(settings?: { status?: number, message?: string }) {
		super(settings?.message);
		this.status = settings?.status;
	}
}