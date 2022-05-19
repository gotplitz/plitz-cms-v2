import expressAsyncHandler from 'express-async-handler';

// Models
import Serie from '../models/serieModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/series
// DESCRIPTION: Get Series
// Public Route
const getSeries = expressAsyncHandler(async (req, res) => {
	const series = await Serie.find().sort({ date: -1 });
	res.json(series);
});

// ROUTE: GET api/series/:fmlink
// DESCRIPTION: Get a Serie by its slug
// Public Route
const getSerieBySlug = expressAsyncHandler(async (req, res) => {
	const serie = await Serie.findOne({
		fmlink: req.params.fmlink,
	});

	if (serie) {
		res.json(serie);
	} else {
		res.status(404);
		throw new Error('Serie not found');
	}
});

// ROUTE: POST api/series
// DESCRIPTION: Post a new Serie
// Private Route
const postSerie = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const serie = await Serie.create(req.body);

		if (serie) {
			res.status(201).json({
				serie,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Serie Data');
		}
	}
});

// ROUTE: PUT api/series
// DESCRIPTION: Edit serie
// Private Route
const editSerie = expressAsyncHandler(async (req, res) => {
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
			title,
			id,
		} = req.body;

		const serie = await Serie.findById(_id);

		if (serie) {
			if (isLive) {
				serie.isLive = true;
			} else {
				serie.isLive = false;
			}
			if (isMenu) {
				serie.isMenu = true;
			} else {
				serie.isMenu = false;
			}
			if (fmtitle) serie.fmtitle = fmtitle;
			if (fmsubtitle) serie.fmsubtitle = fmsubtitle;
			if (fmlabel) serie.fmlabel = fmlabel;
			if (fmlink) serie.fmlink = fmlink;
			if (fmcontent) serie.fmcontent = fmcontent;
			if (fmposition) serie.fmposition = fmposition;
			if (seotitle) serie.seotitle = seotitle;
			if (underFolder) serie.underFolder = underFolder;
			if (featuredimg) serie.featuredimg = featuredimg;
			if (title) serie.title = title;
			if (id) serie.id = id;
			if (extraboxes) serie.extraboxes = extraboxes;

			const updatedSerie = await serie.save();

			res.status(201).json({
				_id: updatedSerie._id,
				isLive: updatedSerie.isLive,
				isMenu: updatedSerie.isMenu,
				fmtitle: updatedSerie.fmtitle,
				fmsubtitle: updatedSerie.fmsubtitle,
				fmlabel: updatedSerie.fmlabel,
				fmlink: updatedSerie.fmlink,
				fmcontent: updatedSerie.fmcontent,
				fmposition: updatedSerie.fmposition,
				seotitle: updatedSerie.seotitle,
				underFolder: updatedSerie.underFolder,
				featuredimg: updatedSerie.featuredimg,
				extraboxes: updatedSerie.extraboxes,
				title: updatedSerie.title,
				id: updatedSerie.id,
				folderId: updatedSerie.folderId,
			});
		} else {
			res.status(404);
			throw new Error('Serie does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/series
// DESCRIPTION: Remove serie
// Private Route
const removeSerie = expressAsyncHandler(async (req, res) => {
	const serie = await Serie.findById(req.params.id);

	if (serie) {
		res.json({
			msg: `The serie "${serie.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await serie.remove();
	} else {
		res.status(404);
		throw new Error('Serie Not Found');
	}
});

export { getSeries, getSerieBySlug, postSerie, editSerie, removeSerie };
