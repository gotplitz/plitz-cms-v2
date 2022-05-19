import mongoose from 'mongoose';

const extraboxesSchema = mongoose.Schema({
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

const folderSchema = mongoose.Schema(
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
		id: {
			type: Number,
		},
		title: {
			type: String,
		},
		featuredimg: {
			type: String,
		},
		extraboxes: [extraboxesSchema],
	},
	{
		timestamps: true,
	}
);

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;
