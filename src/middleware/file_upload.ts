import multer from 'multer';
import { VIDEO_PATH } from '../constants/paths';
import ApiError from '../models/api_error';

export const videoUpload = multer({
	fileFilter(_req, file, cb) {
		if (!file.originalname.match(/\.(3gp|mp4|mpeg|avi|zip)$/)) {
			return cb(new ApiError({
				status: 500,
				message: 'Please upload an Video File!'
			}));
		}

		cb(null, true);
	},
});
