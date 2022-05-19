import mongoose from 'mongoose';

const imagesSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	filename: {
		type: String,
	},
	crDate: {
		type: Date,
	},
	modDate: {
		type: Date,
	},
	size: {
		type: Number,
	},
	mimeType: {
		type: String,
	},
	title: {
		type: String,
	},
	altTitle: {
		type: String,
	},
	data: {
		type: String,
	},
});

const filesSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	filename: {
		type: String,
	},
	crDate: {
		type: Date,
	},
	modDate: {
		type: Date,
	},
	size: {
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
	title: {
		type: String,
	},
	altTitle: {
		type: String,
	},
	data: {
		type: String,
	},
});

const categorySchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
	crDate: {
		type: String,
	},
	modDate: {
		type: String,
	},
	parentId: {
		type: Number,
	},
});

const noticiaSchema = mongoose.Schema(
	{
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
		},
		fmintro: {
			type: String,
		},
		seotitle: {
			type: String,
		},
		featuredimg: {
			type: String,
		},
		id: {
			type: Number,
		},
		title: {
			type: String,
		},
		altTitle: {
			type: String,
		},
		isTopNews: {
			type: Boolean,
		},
		teaser: {
			type: String,
		},
		crDate: {
			type: String,
		},
		modDate: {
			type: String,
		},
		date: {
			type: String,
		},
		archive: {
			type: String,
		},
		bodytext: {
			type: String,
		},
		categories: [categorySchema],
		media: [imagesSchema],
		relatedFiles: [filesSchema],
	},
	{
		timestamps: true,
	}
);

const Noticia = mongoose.model('Noticia', noticiaSchema);

export default Noticia;
