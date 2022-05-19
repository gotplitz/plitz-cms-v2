import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// Email setup
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

// Models
import User from '../models/userModel.js';

const __dirname = path.resolve(path.dirname(''));

const mailgunAuth = {
	auth: {
		api_key: '',
		domain: 'mg.ferociousmediaweb.com',
	},
};

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

// ROUTE: POST api/users/login
// DESCRIPTION: Authenticate user and get token
// Public Route
const authUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			verified: user.verified,
			fullname: user.fullname,
			email: user.email,
			isAdmin: user.isAdmin,
			photo: user.photo,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error('Invalid email or password');
	}
});

// ROUTE: GET api/users/profile
// DESCRIPTION: Get User profile
// Private Route
const getUserProfile = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			verified: user.verified,
			fullname: user.fullname,
			email: user.email,
			isAdmin: user.isAdmin,
			photo: user.photo,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// ROUTE: GET api/users/forgot
// DESCRIPTION: Forgot Password Request
// Public Route
const forgotPassword = expressAsyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });

	const emailTemplate = fs.readFileSync(
		path.join(__dirname, 'emailtemplates/forgot-password.hbs'),
		'utf-8'
	);

	const template = handlebars.compile(emailTemplate);

	if (user) {
		try {
			const htmlToSend = template({
				fullname: user.fullname,
				token: generateToken(user._id),
			});

			const mailOptions = {
				from: `"Apollo Display Technologies" <postmaster@mg.ferociousmediaweb.com>`,
				to: `${user.email}`,
				// bcc: `websites@ferociousmedia.com`,
				// replyTo: `no-reply@ferociousmedia.com`,
				subject: 'Change password request',
				html: htmlToSend,
			};

			smtpTransport.sendMail(mailOptions, (err, data) => {
				if (err) {
					res.json({
						msg: 'There was an error sending the email, please try again later',
					});
				} else {
					res.json({
						msg:
							'Your request has been sent, check your email for further instructions',
					});
				}
			});
		} catch (error) {
			res.status(500);
			throw new Error(error);
		}
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// ROUTE: PUT api/users/changepass
// DESCRIPTION: Change Password
// Private Route
const changePassword = expressAsyncHandler(async (req, res) => {
	const { password } = req.body;
	const user = await User.findById(req.user._id);

	if (user) {
		if (password) {
			user.password = password;
		}

		const updatedUser = await user.save();

		res.status(201).json({
			_id: updatedUser._id,
			verified: updatedUser.verified,
			fullname: updatedUser.fullname,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			photo: updatedUser.photo,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// ROUTE: POST api/users
// DESCRIPTION: Register a user
// Public Route
const registerUser = expressAsyncHandler(async (req, res) => {
	const { fullname, email, password, photo } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		fullname,
		email,
		password,
		photo,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			verified: user.verified,
			fullname: user.fullname,
			email: user.email,
			isAdmin: user.isAdmin,
			photo: user.photo,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid User Data');
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	forgotPassword,
	changePassword,
};
