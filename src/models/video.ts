import mongoose, { Model, Document } from "mongoose";

const videoSchema = new mongoose.Schema<VideoSchema>({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String
	},
	data: {
		type: Buffer,
		required: true
	}
}, {
	timestamps: true
});

export interface VideoSchema extends Document {
	title: string,
	description?: string,
	data: Buffer
}

const Video = mongoose.model<VideoSchema, Model<VideoSchema>>('video', videoSchema);

export default Video;