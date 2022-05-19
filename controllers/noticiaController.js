import expressAsyncHandler from 'express-async-handler';

// Models
import Noticia from '../models/noticiaModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/noticias
// DESCRIPTION: Get News
// Public Route
const getNoticias = expressAsyncHandler(async (req, res) => {
	const noticias = await Noticia.find().sort({ date: -1 });
	res.json(noticias);
});

// ROUTE: GET api/noticias/:fmlink
// DESCRIPTION: Get a News item by its slug
// Public Route
const getNoticiaBySlug = expressAsyncHandler(async (req, res) => {
	const noticia = await Noticia.findOne({
		fmlink: req.params.fmlink,
	});

	if (noticia) {
		res.json(noticia);
	} else {
		res.status(404);
		throw new Error('News Item not found');
	}
});

// ROUTE: POST api/noticias
// DESCRIPTION: Post a new News Item
// Private Route
const postNoticia = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const newNoticia = {
			isLive: req.body.isLive,
			fmtitle: req.body.fmtitle,
			fmlink: req.body.fmlink,
			fmcontent: req.body.fmcontent,
			fmintro: req.body.fmintro,
			altTitle: req.body.altTitle,
			seotitle: req.body.seotitle,
			categories: req.body.categories,
			featuredimg: req.body.featuredimg,
			isTopNews: req.body.isTopNews,
		};

		const noticia = await Noticia.create(newNoticia);

		if (noticia) {
			res.status(201).json({
				noticia,
			});
		} else {
			res.status(400);
			throw new Error('Invalid News Data');
		}
	}
});

// ROUTE: PUT api/noticias
// DESCRIPTION: Edit News Item
// Private Route
const editNoticia = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const {
			_id,
			isLive,
			fmtitle,
			altTitle,
			fmlink,
			fmcontent,
			fmintro,
			seotitle,
			categories,
			featuredimg,
			isTopNews,
		} = req.body;

		const noticia = await Noticia.findById(_id);

		if (noticia) {
			if (isLive) {
				noticia.isLive = true;
			} else {
				noticia.isLive = false;
			}
			if (isTopNews) {
				noticia.isTopNews = true;
			} else {
				noticia.isTopNews = false;
			}
			if (fmtitle) noticia.fmtitle = fmtitle;
			if (altTitle) noticia.altTitle = altTitle;
			if (fmlink) noticia.fmlink = fmlink;
			if (fmcontent) noticia.fmcontent = fmcontent;
			if (fmintro) noticia.fmintro = fmintro;
			if (seotitle) noticia.seotitle = seotitle;
			if (categories) noticia.categories = categories;
			if (featuredimg) noticia.featuredimg = featuredimg;

			const updatedNoticia = await noticia.save();

			res.status(201).json({
				_id: updatedNoticia._id,
				isLive: updatedNoticia.isLive,
				fmtitle: updatedNoticia.fmtitle,
				altTitle: updatedNoticia.altTitle,
				fmlink: updatedNoticia.fmlink,
				fmcontent: updatedNoticia.fmcontent,
				fmintro: updatedNoticia.fmintro,
				seotitle: updatedNoticia.seotitle,
				categories: updatedNoticia.categories,
				featuredimg: updatedNoticia.featuredimg,
				isTopNews: updatedNoticia.isTopNews,
			});
		} else {
			res.status(404);
			throw new Error('News Item does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/noticias
// DESCRIPTION: Remove News Item
// Private Route
const removeNoticia = expressAsyncHandler(async (req, res) => {
	const noticia = await Noticia.findById(req.params.id);

	if (noticia) {
		res.json({
			msg: `The news item "${noticia.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await noticia.remove();
	} else {
		res.status(404);
		throw new Error('News Item Not Found');
	}
});

export {
	getNoticias,
	getNoticiaBySlug,
	postNoticia,
	editNoticia,
	removeNoticia,
};
