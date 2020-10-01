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
		required: true,
	}
}, {
	timestamps: true
});

export interface VideoSchema extends Document {
	title: string,
	description?: string,
	data?: Buffer
}

videoSchema.statics.getMetaById = (_id: string) => {
	return Video.findById(_id).select(['title', 'description']).exec();
}

videoSchema.statics.getMetaAll = () => {
	return Video.find().select(['title', 'description']).exec();
}

videoSchema.statics.findMetaByIdAndDelete = (_id: string) => {
	return Video.findByIdAndDelete(_id).select(['title', 'description']).exec();
}

export interface VideoModel extends Model<VideoSchema> {
	getMetaById(_id: string): Promise<VideoSchema | null>;
	findMetaByIdAndDelete(_id: string): Promise<VideoSchema | null>;
	getMetaAll(): Promise<VideoSchema[]>
}

const Video = mongoose.model<VideoSchema, VideoModel>('video', videoSchema);

export default Video;