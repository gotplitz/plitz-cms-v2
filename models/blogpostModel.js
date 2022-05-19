import mongoose from 'mongoose';

const blogpostSchema = mongoose.Schema(
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
		fmlink: {
			type: String,
		},
		fmcontent: {
			type: String,
			required: true,
		},
		seotitle: {
			type: String,
		},
		fmcategory: {
			type: [],
		},
		featuredimg: {
			type: String,
		},
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

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

export default Blogpost;
