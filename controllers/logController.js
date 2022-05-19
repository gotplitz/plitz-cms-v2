import expressAsyncHandler from 'express-async-handler';

// Models
import Log from '../models/logModel.js';
import User from '../models/userModel.js';

// ROUTE: GET api/logs
// DESCRIPTION: Get Logs
// Public Route
const getLogs = expressAsyncHandler(async (req, res) => {
	const logs = await Log.find().sort({ date: -1 });
	res.json(logs);
});

// ROUTE: POST api/logs
// DESCRIPTION: Post Log from activity
// Private Route
const createLog = expressAsyncHandler(async (req, res) => {
	const { logtype, logcontent, email } = req.body;

	const user = await User.findOne({ email });

	const log = await Log.create({
		user: user._id ? user._id : 0,
		logtype,
		logcontent,
		fullname: user.fullname ? user.fullname : 'System',
		photo: user.photo ? user.photo : 'uploads/user-place-holder.jpg',
	});

	if (log) {
		res.status(201).json({
			_id: log._id,
			user: log.user,
			logtype: log.logtype,
			logcontent: log.logcontent,
			fullname: log.fullname,
			photo: log.photo,
			createdAt: log.createdAt,
		});
	} else {
		res.status(400);
		throw new Error('No activity has been created');
	}
});

export { getLogs, createLog };
