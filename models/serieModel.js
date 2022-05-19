import mongoose from 'mongoose';

const sextraboxesSchema = mongoose.Schema({
	etitle: {
		type: String,
	},
	eposition: {
		type: Number,
	},
	econtent: {
		type: String,
	},
	eimg: {
		type: String,
	},
});

const serieSchema = mongoose.Schema(
	{
		isLive: {
			type: Boolean,
			default: true,
		},
		fmtitle: {
			type: String,
		},
		fmsubtitle: {
			type: String,
		},
		fmlabel: {
			type: String,
		},
		fmlink: {
			type: String,
		},
		fmcontent: {
			type: String,
		},
		fmposition: {
			type: Number,
		},
		seotitle: {
			type: String,
		},
		isMenu: {
			type: Boolean,
			default: false,
		},
		underFolder: {
			type: String,
		},
		id: {
			type: Number,
		},
		folderId: {
			type: Number,
		},
		title: {
			type: String,
		},
		featuredimg: {
			type: String,
		},
		extraboxes: [sextraboxesSchema],
	},
	{
		timestamps: true,
	}
);

const Serie = mongoose.model('Serie', serieSchema);

export default Serie;
