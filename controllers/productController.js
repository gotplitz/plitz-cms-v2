import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';

// Models
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/products
// DESCRIPTION: Get Products
// Public Route
const getProducts = expressAsyncHandler(async (req, res) => {
	const products = await Product.find().sort({ date: -1 });
	res.json(products);
});

// ROUTE: GET api/products/:catid
// DESCRIPTION: Get Products by Category ID
// Public Route
const getProductsInCategory = expressAsyncHandler(async (req, res) => {
	const products = await Product.find({
		product: { $elemMatch: { id: req.params.catid } },
	}).sort({
		date: -1,
	});

	if (products.length > 0) {
		res.json(products);
	} else {
		res.status(404);
		throw new Error('There is no products with this Product ID');
	}
});

// ROUTE: POST api/products/ser
// DESCRIPTION: Get Products by Category ID
// Public Route
const getProductsInSer = expressAsyncHandler(async (req, res) => {
	var theshoulds = [];

	if (req.body.id1 !== 0 && req.body.id2 !== 0) {
		theshoulds.push(
			{ 'category.id': req.body.id1 },
			{ 'secondCategory.id': req.body.id1 },
			{ 'category.id': req.body.id2 },
			{ 'secondCategory.id': req.body.id2 }
		);
	} else if (req.body.id1 !== 0 && req.body.id2 === 0) {
		theshoulds.push(
			{ 'category.id': req.body.id1 },
			{ 'secondCategory.id': req.body.id1 }
		);
	} else if (req.body.id1 === 0 && req.body.id2 !== 0) {
		theshoulds.push(
			{ 'category.id': req.body.id2 },
			{ 'secondCategory.id': req.body.id2 }
		);
	}

	const categorizedProducts = await Product.aggregate()
		.match({
			$or: theshoulds,
		})
		.project({
			_id: 1,
			fmtitle: 1,
			fmlink: 1,
			id: 1,
			category: 1,
			secondCategory: 1,
			manufacturer: 1,
			sizeDiagonal: 1,
			resolutionMax: 1,
			technology: 1,
			brightness: 1,
			perspective: 1,
			interface: 1,
			perspective: 1,
			temperatureRange: 1,
			touch: 1,
			cpu: 1,
			chipset: 1,
			memory: 1,
		});

	const groups = await Product.aggregate()
		.match({
			$or: theshoulds,
		})
		.facet({
			manufacturer: [
				{ $match: { manufacturer: { $exists: 1 } } },
				{ $unwind: '$manufacturer.title' },
				{ $sortByCount: '$manufacturer.title' },
			],
			sizeDiagonal: [
				{ $match: { sizeDiagonal: { $exists: 1 } } },
				{ $unwind: '$sizeDiagonal.title' },
				{ $sortByCount: '$sizeDiagonal.title' },
			],
			resolutionMax: [
				{ $match: { resolutionMax: { $exists: 1 } } },
				{ $unwind: '$resolutionMax.title' },
				{ $sortByCount: '$resolutionMax.title' },
			],
			brightness: [
				{ $match: { brightness: { $exists: 1 } } },
				{ $unwind: '$brightness.title' },
				{ $sortByCount: '$brightness.title' },
			],
			interface: [
				{ $match: { interface: { $exists: 1 } } },
				{ $unwind: '$interface' },
				{ $sortByCount: '$interface' },
			],
			perspective: [
				{ $match: { perspective: { $exists: 1 } } },
				{ $unwind: '$perspective.title' },
				{ $sortByCount: '$perspective.title' },
			],
			temperatureRange: [
				{ $match: { temperatureRange: { $exists: 1 } } },
				{ $unwind: '$temperatureRange' },
				{ $sortByCount: '$temperatureRange' },
			],
			touch: [{ $sortByCount: '$touch' }],
		});

	if (categorizedProducts.length > 0) {
		const products = [groups, ...categorizedProducts];
		res.json(products);
	} else {
		res.status(404);
		throw new Error('There is no products with this Category or Series');
	}
});

// ROUTE: POST api/products/filter
// DESCRIPTION: Get Products by Category ID
// Public Route
const getFilteredProds = expressAsyncHandler(async (req, res) => {
	var filters = [];
	var theors = [];

	if (req.body.id1 !== 0 && req.body.id2 !== 0) {
		theors.push(
			{ 'category.id': req.body.id1 },
			{ 'secondCategory.id': req.body.id1 },
			{ 'category.id': req.body.id2 },
			{ 'secondCategory.id': req.body.id2 }
		);
	} else if (req.body.id1 !== 0 && req.body.id2 === 0) {
		theors.push(
			{ 'category.id': req.body.id1 },
			{ 'secondCategory.id': req.body.id1 }
		);
	} else if (req.body.id1 === 0 && req.body.id2 !== 0) {
		theors.push(
			{ 'category.id': req.body.id2 },
			{ 'secondCategory.id': req.body.id2 }
		);
	}

	if (req.body.forManu.length > 0) {
		filters.push({
			text: {
				query: req.body.forManu,
				path: 'manufacturer.title',
			},
		});
	}

	if (req.body.forDiag.length > 0) {
		filters.push({
			text: {
				query: req.body.forDiag,
				path: 'sizeDiagonal.title',
			},
		});
	}

	if (req.body.forRes.length > 0) {
		filters.push({
			text: {
				query: req.body.forRes,
				path: 'resolutionMax.title',
			},
		});
	}

	if (req.body.forBright.length > 0) {
		filters.push({
			text: {
				query: req.body.forBright,
				path: 'brightness.title',
			},
		});
	}

	if (req.body.forInter.length > 0) {
		filters.push({
			text: {
				query: req.body.forInter,
				path: 'interface.title',
			},
		});
	}

	if (req.body.forAngle.length > 0) {
		filters.push({
			text: {
				query: req.body.forAngle,
				path: 'perspective.title',
			},
		});
	}

	if (req.body.forTemp.length > 0) {
		filters.push({
			text: {
				query: req.body.forTemp,
				path: 'temperatureRange.title',
			},
		});
	}

	req.body.forTouch !== '' &&
		req.body.forTouch.forEach((el) =>
			filters.push({
				range: {
					gt: parseInt(el) - 1,
					lt: parseInt(el) + 1,
					path: 'touch',
				},
			})
		);

	const theprods = await Product.aggregate()
		.search({
			index: 'defaultFiltering',
			compound: {
				filter: filters,
			},
		})
		.match({
			$or: theors,
		})
		.project({
			_id: 1,
			fmtitle: 1,
			fmlink: 1,
			id: 1,
			category: 1,
			secondCategory: 1,
			manufacturer: 1,
			sizeDiagonal: 1,
			resolutionMax: 1,
			technology: 1,
			brightness: 1,
			perspective: 1,
			interface: 1,
			perspective: 1,
			temperatureRange: 1,
			touch: 1,
			cpu: 1,
			chipset: 1,
			memory: 1,
		});

	if (theprods.length > 0) {
		const finalresponse = theprods;
		res.json(finalresponse);
	} else {
		res.status(404);
		throw new Error('There is no products with this Filters');
	}
});

// ROUTE: GET api/products/single/:fmlink
// DESCRIPTION: Get a Product by its slug
// Public Route
const getSingleProduct = expressAsyncHandler(async (req, res) => {
	const product = await Product.findOne({
		fmlink: req.params.fmlink,
	});

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// ROUTE: POST api/products
// DESCRIPTION: Post a new Product
// Private Route
const postProduct = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const product = await Product.create(req.body);

		if (product) {
			res.status(201).json({
				product,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Product Data');
		}
	}
});

// ROUTE: PUT api/products
// DESCRIPTION: Edit a product
// Private Route
const editProduct = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const {
			_id,
			isLive,
			fmtitle,
			subtitle,
			fmlink,
			description,
			specialText,
			seotitle,
			featuredimg,
			category,
		} = req.body;

		const product = await Product.findById(_id);

		if (product) {
			if (isLive) {
				product.isLive = true;
			} else {
				product.isLive = false;
			}
			if (fmtitle) product.fmtitle = fmtitle;
			if (subtitle) product.subtitle = subtitle;
			if (fmlink) product.fmlink = fmlink;
			if (description) product.description = description;
			if (specialText) product.specialText = specialText;
			if (seotitle) product.seotitle = seotitle;
			if (featuredimg) product.featuredimg = featuredimg;
			if (category) product.category = category;

			const updatedProduct = await product.save();

			res.status(201).json(updatedProduct);
		} else {
			res.status(404);
			throw new Error('Product does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/products
// DESCRIPTION: Remove a product
// Private Route
const removeProduct = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json({
			msg: `The product "${product.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await product.remove();
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

// ROUTE: GET api/products/previews
// DESCRIPTION: Get Products Previews
// Public Route
const getPrevsProducts = expressAsyncHandler(async (req, res) => {
	const productsprevs = await Product.find(
		{},
		'fmtitle fmlink title url isLive id images category secondCategory createdAt updatedAt'
	).sort({ date: -1 });

	res.json(productsprevs);
});

// ROUTE: GET api/products/image/:id
// DESCRIPTION: Get Product Image
// Public Route
const getProductImage = expressAsyncHandler(async (req, res) => {
	const config = {
		headers: { Authorization: `Bearer ${process.env.DISTEC_TOKEN}` },
	};

	const { data } = await axios.get(
		`https://www.distec.de/rest/products_files/${req.params.id}`,
		config
	);

	if (data) {
		res.json(data);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {
	getProducts,
	getProductsInCategory,
	getProductsInSer,
	getFilteredProds,
	getSingleProduct,
	postProduct,
	editProduct,
	removeProduct,
	getPrevsProducts,
	getProductImage,
};
