import express from 'express';
import fs from 'fs';

import fileUpload from 'express-fileupload';
import path from 'path';

const router = express.Router();
router.use(fileUpload());

const __dirname = path.resolve(path.dirname(''));

// POST Type
// Upload one file
// Public Route
router.post('/', async (req, res) => {
	const file = req.files.newimg;

	var newpath = path.resolve(
		__dirname,
		'uploads',
		`${file.name
			.replace(/&/g, 'and')
			.replace(/-/g, ' ')
			.replace(/[.](?=.*[.])/g, '')
			.replace(/[^a-zA-Z0-9. ]./g, '')
			.replace(/ /g, '-')
			.toLowerCase()}`
	);

	const splitname = file.name
		.replace(/&/g, 'and')
		.replace(/-/g, ' ')
		.replace(/[.](?=.*[.])/g, '')
		.replace(/[^a-zA-Z0-9. ]./g, '')
		.replace(/ /g, '-')
		.toLowerCase()
		.split('.');
	let number = 0;
	let fileExist;

	if (fs.existsSync(newpath)) {
		while (fs.existsSync(newpath)) {
			var newname = splitname[0] + '-' + number++ + '.' + splitname[1];
			newpath = path.resolve(__dirname, 'uploads', `${newname}`);
			number++;
			if (!fs.existsSync(newpath)) {
				newpath = `uploads/${newname}`;
				fileExist = false;
				break;
			}
		}
	} else {
		var newname = splitname[0] + '.' + splitname[1];
		newpath = `uploads/${newname}`;
		fileExist = false;
	}

	if (!fileExist) {
		file.mv(`${newpath}`, (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}

			res.json({
				newimage: newpath,
				filePath: newpath,
				msg: 'Upload is completed',
			});
		});
	}
});

// POST Type
// Upload multiple files
// Public Route
router.post('/multiple', async (req, res) => {
	if (req.files === null) {
		return res.status(500).json({
			msg: `The Server didn't receive the right data`,
			type: 'warning',
		});
	}

	const files =
		req.files.gallery.length > 0 ? req.files.gallery : [req.files.gallery];

	const final = [];

	for (var i = 0; i < files.length; i++) {
		var newpath = path.resolve(
			__dirname,
			'uploads',
			`${files[i].name
				.replace(/&/g, 'and')
				.replace(/-/g, ' ')
				.replace(/[.](?=.*[.])/g, '')
				.replace(/[^a-zA-Z0-9. ]./g, '')
				.replace(/ /g, '-')
				.toLowerCase()}`
		);

		const splitname = files[i].name
			.replace(/&/g, 'and')
			.replace(/-/g, ' ')
			.replace(/[.](?=.*[.])/g, '')
			.replace(/[^a-zA-Z0-9. ]./g, '')
			.replace(/ /g, '-')
			.toLowerCase()
			.split('.');
		let number = 0;
		let fileExist;

		if (fs.existsSync(newpath)) {
			while (fs.existsSync(newpath)) {
				var newname = splitname[0] + '-' + number++ + '.' + splitname[1];
				newpath = path.resolve(__dirname, 'uploads', `${newname}`);
				number++;
				if (!fs.existsSync(newpath)) {
					newpath = `uploads/${newname}`;
					fileExist = false;
					break;
				}
			}
		} else {
			var newname = splitname[0] + '.' + splitname[1];
			newpath = `uploads/${newname}`;
			fileExist = false;
		}

		if (!fileExist) {
			final.push(newpath);
			files[i].mv(`${newpath}`, (err) => {
				if (err) {
					console.error(err);
					return res.status(500).send(err);
				}
			});
		}
	}

	res.json(final);
});

export default router;
