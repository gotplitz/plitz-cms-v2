import expressAsyncHandler from 'express-async-handler';

// Models
import Category from '../models/categoryModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/categories
// DESCRIPTION: Get Categories
// Public Route
const getCategories = expressAsyncHandler(async (req, res) => {
	const categories = await Category.find().sort({ date: -1 });
	res.json(categories);
});

// ROUTE: GET api/categories/:fmlink
// DESCRIPTION: Get a Category by its slug
// Public Route
const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
	const category = await Category.findOne({
		fmlink: req.params.fmlink,
	});

	if (category) {
		res.json(category);
	} else {
		res.status(404);
		throw new Error('Category not found');
	}
});

// ROUTE: POST api/categories
// DESCRIPTION: Post a new Category
// Private Route
const postCategory = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const category = await Category.create(req.body);

		if (category) {
			res.status(201).json({
				category,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Category Data');
		}
	}
});

// ROUTE: PUT api/categories
// DESCRIPTION: Edit category
// Private Route
const editCategory = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const {
			_id,
			isLive,
			fmtitle,
			fmsubtitle,
			fmlabel,
			fmlink,
			fmcontent,
			fmposition,
			seotitle,
			isMenu,
			underFolder,
			featuredimg,
			extraboxes,
		} = req.body;

		const category = await Category.findById(_id);

		if (category) {
			if (isLive) {
				category.isLive = true;
			} else {
				category.isLive = false;
			}
			if (isMenu) {
				category.isMenu = true;
			} else {
				category.isMenu = false;
			}
			if (fmtitle) category.fmtitle = fmtitle;
			if (fmsubtitle) category.fmsubtitle = fmsubtitle;
			if (fmlabel) category.fmlabel = fmlabel;
			if (fmlink) category.fmlink = fmlink;
			if (fmcontent) category.fmcontent = fmcontent;
			if (fmposition) category.fmposition = fmposition;
			if (seotitle) category.seotitle = seotitle;
			if (underFolder) category.underFolder = underFolder;
			if (featuredimg) category.featuredimg = featuredimg;
			if (extraboxes) category.extraboxes = extraboxes;

			const updatedCategory = await category.save();

			res.status(201).json({
				_id: updatedCategory._id,
				isLive: updatedCategory.isLive,
				isMenu: updatedCategory.isMenu,
				fmtitle: updatedCategory.fmtitle,
				fmsubtitle: updatedCategory.fmsubtitle,
				fmlabel: updatedCategory.fmlabel,
				fmlink: updatedCategory.fmlink,
				fmcontent: updatedCategory.fmcontent,
				fmposition: updatedCategory.fmposition,
				seotitle: updatedCategory.seotitle,
				underFolder: updatedCategory.underFolder,
				featuredimg: updatedCategory.featuredimg,
				extraboxes: updatedCategory.extraboxes,
				title: updatedCategory.title,
				folderId: updatedCategory.folderId,
			});
		} else {
			res.status(404);
			throw new Error('Category does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/categories
// DESCRIPTION: Remove category
// Private Route
const removeCategory = expressAsyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (category) {
		res.json({
			msg: `The category "${category.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await category.remove();
	} else {
		res.status(404);
		throw new Error('Category Not Found');
	}
});

export {
	getCategories,
	getCategoryBySlug,
	postCategory,
	editCategory,
	removeCategory,
};
