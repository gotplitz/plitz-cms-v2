import mongoose from 'mongoose';

const extraBoxes = mongoose.Schema(
	{
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
	},
	{
		timestamps: true,
	}
);

const pageSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		isLive: {
			type: Boolean,
			default: false,
		},
		fmtitle: {
			type: String,
			required: true,
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
			required: true,
		},
		fmposition: {
			type: Number,
		},
		seotitle: {
			type: String,
		},
		isMenu: {
			type: String,
			equired: true,
		},
		featuredimg: {
			type: String,
		},
		extraboxes: [extraBoxes],
		gallery: [],
		fullname: {
			type: String,
		},
		photo: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Page = mongoose.model('Page', pageSchema);

export default Page;
