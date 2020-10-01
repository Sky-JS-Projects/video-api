import express, { NextFunction, Request, Response } from "express";
import errorMiddleware from "./middleware/error";
import { videoUpload } from "./middleware/file_upload";
import Video from "./models/video";
import ApiError from "./models/api_error";

const app = express();

app.post('/video', videoUpload.single('video'), async (req: Request, res: Response, next: NextFunction) => {
	const title = req.body.title;
	const data = req.file.buffer;

	if (!title && !data) {
		return next(new ApiError({ status: 500, message: "title and data keys are compulsory" }));
	}

	const video = new Video({
		title,
		data,
		description: req.body.description,
	});

	await video.save();

	res.status(201).json({ _id: video._id, title, description: video.description });
}, errorMiddleware)

app.patch('/videos/:id', async (req: Request, res: Response, next: NextFunction) => {
	const video = await Video.findById(req.params.id).exec();

	if (!video) {
		return next(new ApiError({ status: 404, message: 'No file matches the id!' }));
	}

	const title = req.body.title;
	const description = req.body.description;

	video.set({
		title,
		description
	})

	await video.save({validateModifiedOnly: true});

	res.json({ _id: video._id, title, description: video.description });
}, errorMiddleware);

app.get('/videos/:id', async (req: Request, res: Response, next: NextFunction) => {
	const video = await Video.findById(req.params.id).exec();

	if (!video) {
		return next(new ApiError({ status: 404, message: 'No file matches the id!' }));
	}

	res.json(video.toJSON());
}, errorMiddleware);

export default app;
