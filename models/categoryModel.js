import mongoose from 'mongoose';

const cextraboxesSchema = mongoose.Schema({
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

const categorySchema = mongoose.Schema(
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
		folder: {
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
		extraboxes: [cextraboxesSchema],
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
