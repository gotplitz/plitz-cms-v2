import expressAsyncHandler from 'express-async-handler';

// Models
import Blogpost from '../models/blogpostModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/blogposts
// DESCRIPTION: Get Blogposts
// Public Route
const getBlogposts = expressAsyncHandler(async (req, res) => {
	const blogposts = await Blogpost.find().sort({ date: -1 });
	res.json(blogposts);
});

// ROUTE: GET api/blogposts/:fmlink
// DESCRIPTION: Get a Blogpost by its slug
// Public Route
const getBlogpostBySlug = expressAsyncHandler(async (req, res) => {
	const blogpost = await Blogpost.findOne({
		fmlink: req.params.fmlink,
	});

	if (blogpost) {
		res.json(blogpost);
	} else {
		res.status(404);
		throw new Error('Blogpost not found');
	}
});

// ROUTE: POST api/blogposts
// DESCRIPTION: Post a new Blogpost
// Private Route
const postBlogpost = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const newBlogpost = {
			isLive: req.body.isLive,
			fmtitle: req.body.fmtitle,
			fmlink: req.body.fmlink,
			fmcontent: req.body.fmcontent,
			seotitle: req.body.seotitle,
			fmcategory: req.body.fmcategory,
			featuredimg: req.body.featuredimg,
			user: req.user._id,
			fullname: user.fullname,
			photo: user.photo,
		};

		const blogpost = await Blogpost.create(newBlogpost);

		if (blogpost) {
			res.status(201).json({
				blogpost,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Blogpost Data');
		}
	}
});

// ROUTE: PUT api/blogposts
// DESCRIPTION: Edit blogpost
// Private Route
const editBlogpost = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const {
			_id,
			isLive,
			fmtitle,
			fmlink,
			fmcontent,
			seotitle,
			fmcategory,
			featuredimg,
		} = req.body;

		const blogpost = await Blogpost.findById(_id);

		if (blogpost) {
			if (isLive) {
				blogpost.isLive = true;
			} else {
				blogpost.isLive = false;
			}
			if (fmtitle) blogpost.fmtitle = fmtitle;
			if (fmlink) blogpost.fmlink = fmlink;
			if (fmcontent) blogpost.fmcontent = fmcontent;
			if (seotitle) blogpost.seotitle = seotitle;
			if (fmcategory) blogpost.fmcategory = fmcategory;
			if (featuredimg) blogpost.featuredimg = featuredimg;

			const updatedBlogpost = await blogpost.save();

			res.status(201).json({
				_id: updatedBlogpost._id,
				isLive: updatedBlogpost.isLive,
				fmtitle: updatedBlogpost.fmtitle,
				fmlink: updatedBlogpost.fmlink,
				fmcontent: updatedBlogpost.fmcontent,
				seotitle: updatedBlogpost.seotitle,
				fmcategory: updatedBlogpost.fmcategory,
				featuredimg: updatedBlogpost.featuredimg,
				fullname: updatedBlogpost.fullname,
				photo: updatedBlogpost.photo,
			});
		} else {
			res.status(404);
			throw new Error('Blogpost does not exist');
		}
	} else {
		res.status(500);
		throw new Error('Not Authorized');
	}
});

// ROUTE: DELETE api/blogposts
// DESCRIPTION: Remove blogpost
// Private Route
const removeBlogpost = expressAsyncHandler(async (req, res) => {
	const blogpost = await Blogpost.findById(req.params.id);

	if (blogpost) {
		res.json({
			msg: `The blogpost "${blogpost.fmtitle}" has been removed`,
			id: req.params.id,
		});
		await blogpost.remove();
	} else {
		res.status(404);
		throw new Error('Blogpost Not Found');
	}
});

export {
	getBlogposts,
	getBlogpostBySlug,
	postBlogpost,
	editBlogpost,
	removeBlogpost,
};
