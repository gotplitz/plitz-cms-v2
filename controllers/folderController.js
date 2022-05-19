import expressAsyncHandler from 'express-async-handler';

// Models
import Folder from '../models/folderModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/folders
// DESCRIPTION: Get Folders
// Public Route
const getFolders = expressAsyncHandler(async (req, res) => {
	const folders = await Folder.find().sort({ date: -1 });
	res.json(folders);
});

// ROUTE: GET api/folders/:fmlink
// DESCRIPTION: Get a Folder by its slug
// Public Route
const getFolderBySlug = expressAsyncHandler(async (req, res) => {
	const folder = await Folder.findOne({
		fmlink: req.params.fmlink,
	});

	if (folder) {
		res.json(folder);
	} else {
		res.status(404);
		throw new Error('Folder not found');
	}
});

// ROUTE: POST api/folders
// DESCRIPTION: Post a new Folder
// Private Route
const postFolder = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const folder = await Folder.create(req.body);

		if (folder) {
			res.status(201).json({
				folder,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Folder Data');
		}
	}
});

// ROUTE: PUT api/folders
// DESCRIPTION: Edit folder
// Private Route
const editFolder = expressAsyncHandler(async (req, res) => {
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
			title,
			id,
		} = req.body;

		const folder = await Folder.findById(_id);

		if (folder) {
			if (isLive) {
				folder.isLive = true;
			} else {
				folder.isLive = false;
			}
			if (isMenu) {
				folder.isMenu = true;
			} else {
				folder.isMenu = false;
			}
			if (fmtitle) folder.fmtitle = fmtitle;
			if (fmsubtitle) folder.fmsubtitle = fmsubtitle;
			if (fmlabel) folder.fmlabel = fmlabel;
			if (fmlink) folder.fmlink = fmlink;
			if (fmcontent) folder.fmcontent = fmcontent;
			if (fmposition) folder.fmposition = fmposition;
			if (seotitle) folder.seotitle = seotitle;
			if (featuredimg) folder.featuredimg = featuredimg;
			if (extraboxes) folder.extraboxes = extraboxes;
			if (title) folder.title = title;
			if (id) folder.id = id;

			const updatedFolder = await folder.save();

			res.status(201).json({
				_id: updatedFolder._id,
				isLive: updatedFolder.isLive,
				isMenu: updatedFolder.isMenu,
				fmtitle: updatedFolder.fmtitle,
				fmsubtitle: updatedFolder.fmsubtitle,
				fmlabel: updatedFolder.fmlabel,
				fmlink: updatedFolder.fmlink,
				fmcontent: updatedFolder.fmcontent,
				fmposition: updatedFolder.fmposition,
				seotitle: updatedFolder.seotitle,
				featuredimg: updatedFolder.featuredimg,
				extraboxes: updatedFolder.extraboxes,
				title: updatedFolder.title,
				id: updatedFolder.id,
			});
		} else {
			res.status(404);
			throw new Error('Folder does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/folders
// DESCRIPTION: Remove folder
// Private Route
const removeFolder = expressAsyncHandler(async (req, res) => {
	const folder = await Folder.findById(req.params.id);

	if (folder) {
		res.json({
			msg: `The folder "${folder.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await folder.remove();
	} else {
		res.status(404);
		throw new Error('Folder Not Found');
	}
});

export { getFolders, getFolderBySlug, postFolder, editFolder, removeFolder };
