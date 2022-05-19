import mongoose from 'mongoose';

const mediaSchema = mongoose.Schema({
	altTitle: {
		type: String,
	},
	crDate: {
		trype: Date,
	},
	filename: {
		type: String,
	},
	id: {
		type: Number,
	},
	mimeType: {
		type: String,
	},
	extension: {
		type: String,
	},
	videoId: {
		type: String,
	},
	modDate: {
		type: Date,
	},
	size: {
		type: Number,
	},
	title: {
		type: String,
	},
	data: {
		type: String,
	},
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;
