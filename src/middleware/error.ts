import { ErrorRequestHandler } from 'express';
import ApiError from '../models/api_error';

const errorMiddleware: ErrorRequestHandler = (error: ApiError, _request, response, _next) => {
	const status = error.status || 400;
	const message = error.message || 'Something went wrong';
	response
		.status(status)
		.send({
			status,
			message,
		})
}

export default errorMiddleware;