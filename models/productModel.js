import mongoose from 'mongoose';

const controllerSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
});

const interfaceSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
});

const charaSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
});

const optionsSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
});

const catSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
});

const seccatSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	title: {
		type: String,
	},
});

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
});

const drawingSchema = mongoose.Schema({
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
});

const datasheetSchema = mongoose.Schema({
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
});

const manualSchema = mongoose.Schema({
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
});

// MAIN SCHEMA OF PRODUCTS
const productSchema = mongoose.Schema(
	{
		isLive: {
			type: Boolean,
			default: true,
		},
		fmtitle: {
			type: String,
		},
		fmlink: {
			type: String,
		},
		fmdesc: {
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
		url: {
			type: String,
		},
		subtitle: {
			type: String,
		},
		description: {
			type: String,
		},
		specialText: {
			type: String,
		},
		remark: {
			type: String,
		},
		touch: {
			type: Number,
			default: 0,
		},
		topSeller: {
			type: Boolean,
			default: false,
		},
		internalItemNumber: {
			type: String,
		},
		designation: {
			type: String,
		},
		converter: {
			type: String,
		},
		configurableControlRange: {
			type: String,
		},
		streamChannel: {
			type: String,
		},
		overallPerformance: {
			type: String,
		},
		type: {
			type: String,
		},
		glassStrength: {
			type: String,
		},
		controller: [controllerSchema],
		touchpoints: {
			type: String,
		},
		chip: {
			type: String,
		},
		housing: {
			type: String,
		},
		powerSupply: {
			type: String,
		},
		successor: {
			type: String,
		},
		diagonale: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		cpu: [],
		cpuModel: [],
		functionality: [],
		formfactor: {
			id: {
				type: Number,
			},
			folderId: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		chipset: [],
		manufacturer: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		sizeDiagonal: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		resolutionMin: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		resolutionMax: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		brightness: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		contrast: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		perspective: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		temperatureRange: [],
		temperatureRangeStoring: [],
		interface: [interfaceSchema],
		input: [],
		output: [],
		characteristics: [charaSchema],
		variants: [],
		technology: {
			id: {
				type: Number,
			},
			title: {
				type: String,
			},
		},
		similarOrAccessories: [],
		dimension: {
			type: String,
		},
		options: [optionsSchema],
		memory: {
			type: String,
		},
		tpm: {
			type: String,
		},
		category: [catSchema],
		secondCategory: [seccatSchema],
		eol: {
			type: Boolean,
			default: false,
		},
		newestProductDate: {
			date: {
				type: Date,
			},
			timezone_type: {
				type: Number,
			},
			timezone: {
				type: String,
			},
		},
		images: [imagesSchema],
		pcn: [],
		eolFile: [],
		drawing: [drawingSchema],
		datasheet: [datasheetSchema],
		manual: [manualSchema],
		allAccessories: [],
		accessoryForCategories: [],
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
