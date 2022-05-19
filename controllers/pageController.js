import expressAsyncHandler from 'express-async-handler';

// Models
import Page from '../models/pageModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/pages
// DESCRIPTION: Get Pages
// Public Route
const getPages = expressAsyncHandler(async (req, res) => {
	const pages = await Page.find().sort({ date: -1 });
	res.json(pages);
});

// ROUTE: GET api/pages/:fmlink
// DESCRIPTION: Get a Page by its slug
// Public Route
const getPageBySlug = expressAsyncHandler(async (req, res) => {
	const page = await Page.findOne({
		fmlink: req.params.fmlink,
	});

	if (page) {
		res.json(page);
	} else {
		res.status(404);
		throw new Error('Page not found');
	}
});

// ROUTE: POST api/pages
// DESCRIPTION: Post a new Page
// Private Route
const postPage = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const newPage = {
			isLive: req.body.isLive,
			isMenu: req.body.isMenu,
			fmtitle: req.body.fmtitle,
			fmsubtitle: req.body.fmsubtitle,
			fmlabel: req.body.fmlabel,
			fmlink: req.body.fmlink,
			fmcontent: req.body.fmcontent,
			fmposition: req.body.fmposition,
			seotitle: req.body.seotitle,
			featuredimg: req.body.featuredimg,
			extraboxes: req.body.extraboxes,
			gallery: req.body.gallery,
			user: req.user._id,
			fullname: user.fullname,
			photo: user.photo,
		};

		const page = await Page.create(newPage);

		if (page) {
			res.status(201).json({
				page,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Page Data');
		}
	}
});

// ROUTE: PUT api/pages
// DESCRIPTION: Edit page
// Private Route
const editPage = expressAsyncHandler(async (req, res) => {
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
			featuredimg,
			extraboxes,
			gallery,
		} = req.body;

		const page = await Page.findById(_id);

		if (page) {
			if (isLive) {
				page.isLive = true;
			} else {
				page.isLive = false;
			}
			if (isMenu) {
				page.isMenu = true;
			} else {
				page.isMenu = false;
			}
			if (fmtitle) page.fmtitle = fmtitle;
			if (fmsubtitle) page.fmsubtitle = fmsubtitle;
			if (fmlabel) page.fmlabel = fmlabel;
			if (fmlink) page.fmlink = fmlink;
			if (fmcontent) page.fmcontent = fmcontent;
			if (fmposition) page.fmposition = fmposition;
			if (seotitle) page.seotitle = seotitle;
			if (featuredimg) page.featuredimg = featuredimg;
			if (extraboxes) page.extraboxes = extraboxes;
			if (gallery) page.gallery = gallery;

			const updatedPage = await page.save();

			res.status(201).json({
				_id: updatedPage._id,
				isLive: updatedPage.isLive,
				isMenu: updatedPage.isMenu,
				fmtitle: updatedPage.fmtitle,
				fmsubtitle: updatedPage.fmsubtitle,
				fmlabel: updatedPage.fmlabel,
				fmlink: updatedPage.fmlink,
				fmcontent: updatedPage.fmcontent,
				fmposition: updatedPage.fmposition,
				seotitle: updatedPage.seotitle,
				featuredimg: updatedPage.featuredimg,
				extraboxes: updatedPage.extraboxes,
				gallery: updatedPage.gallery,
				user: updatedPage.user,
				fullname: updatedPage.fullname,
				photo: updatedPage.photo,
			});
		} else {
			res.status(404);
			throw new Error('Page does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/pages
// DESCRIPTION: Remove page
// Private Route
const removePage = expressAsyncHandler(async (req, res) => {
	const page = await Page.findById(req.params.id);

	if (page) {
		res.json({
			msg: `The page "${page.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await page.remove();
	} else {
		res.status(404);
		throw new Error('Page Not Found');
	}
});

export { getPages, getPageBySlug, postPage, editPage, removePage };
