import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import cron from 'node-cron';
import axios from 'axios';
import path from 'path';
import cors from 'cors';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Models
import Product from './models/productModel.js';
import Folder from './models/folderModel.js';
import Category from './models/categoryModel.js';
import Serie from './models/serieModel.js';
import Noticia from './models/noticiaModel.js';

// Routes
import logRoutes from './routes/logRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadsRoutes from './routes/uploadsRoutes.js';
import productRoutes from './routes/productRoutes.js';
import folderRoutes from './routes/folderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import serieRoutes from './routes/serieRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import blogpostRoutes from './routes/blogpostRoutes.js';
import noticiaRoutes from './routes/noticiaRoutes.js';

// Enviroment
dotenv.config();

// Database
connectDB();

// Express Server
const app = express();

app.use(express.json());
app.use(cors());

// Static Folders
const __dirname = path.resolve(path.dirname(''));
let filesPath = path.join(__dirname, 'uploads');

// Static Folders
app.use('/uploads', express.static(filesPath));

// API endpoints
app.use('/api/logs', logRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/series', serieRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/blogposts', blogpostRoutes);
app.use('/api/noticias', noticiaRoutes);

app.use(express.static(path.join(__dirname, '/admin/build')));

if (process.env.NODE_ENV === 'production') {
	// Servicing
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html'));
	});
}

// Middleware to handle errors response
app.use(notFound);
app.use(errorHandler);

// Sync Data
// This will be run automatically in the server
// to additem the database from Distec
const config = {
	headers: { Authorization: `Bearer ${process.env.TOKEN}` },
};

cron.schedule('0 0 * * *', async () => {
	await axios
		.get('http://localhost/', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let prod = await Product.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					fmtitle: res.data.data[i].title,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!prod) {
					const newProduct = new Product(additem);
					newProduct.save();
				} else {
					Product.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true }
					);
				}
			}

			console.log(`Products has been synced`.green.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

cron.schedule('0 0 * * *', async () => {
	await axios
		.get('http://localhost/&offset=300', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let prod = await Product.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					fmtitle: res.data.data[i].title,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!prod) {
					const newProduct = new Product(additem);
					newProduct.save();
				} else {
					Product.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true }
					);
				}
			}

			console.log(`Products has been synced`.magenta.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

cron.schedule('0 0 * * *', async () => {
	await axios
		.get('http://localhost/&offset=600', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let prod = await Product.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					fmtitle: res.data.data[i].title,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!prod) {
					const newProduct = new Product(additem);
					newProduct.save();
				} else {
					Product.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true }
					);
				}
			}

			console.log(`Products has been synced`.cyan.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

cron.schedule('0 0 * * *', async () => {
	await axios
		.get('http://localhost/&offset=900', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let prod = await Product.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					fmtitle: res.data.data[i].title,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!prod) {
					const newProduct = new Product(additem);
					newProduct.save();
				} else {
					Product.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true }
					);
				}
			}

			console.log(`Products has been synced`.cyan.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

// Get Products Folders
cron.schedule('0 0 1 * *', async () => {
	await axios
		.get('http://localhost/rest/products_folders?lang=en', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let prod = await Folder.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					isLive: true,
					fmtitle: res.data.data[i].title,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!prod) {
					const newFolder = new Folder(additem);
					newFolder.save();
				} else {
					Folder.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true, new: true }
					);
				}
			}

			console.log(`Folders Information has been synced`.blue.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

// Get Products Series
cron.schedule('0 0 1 * *', async () => {
	await axios
		.get('http://localhost/rest/products_series?lang=en', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let ser = await Serie.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					fmtitle: res.data.data[i].title,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!ser) {
					const newSerie = new Serie(additem);
					newSerie.save();
				} else {
					Serie.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true, new: true }
					);
				}
			}

			console.log(`Series Information has been synced`.magenta.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

// Get Products Categories
cron.schedule('0 0 1 * *', async () => {
	await axios
		.get('http://localhost/rest/products_folders?lang=en', config)
		.then((res) => {
			let folders = res.data.data;

			folders.forEach(async (el) => {
				await axios
					.get(
						`http://localhost/rest/products_categories?lang=en&folders=${el.id}`,
						config
					)
					.then(async (res) => {
						for (var i = 0; i < res.data.data.length; i++) {
							let prod = await Category.findOne({
								id: res.data.data[i].id,
							});

							const fmcontent = {
								fmtitle: res.data.data[i].title,
								fmlink: res.data.data[i].title
									.replace('-', ' ')
									.replace(/&/g, 'and')
									.replace('?', '')
									.replace(/[^a-zA-Z0-9 ]/g, '')
									.replace(/ /g, '-')
									.toLowerCase(),
								folder: el.title,
							};

							const fromdistec = res.data.data[i];

							const additem = Object.assign(fmcontent, fromdistec);

							if (!prod) {
								const newCategory = new Category(additem);
								newCategory.save();
							} else {
								Category.findOneAndUpdate(
									{ id: res.data.data[i].id },
									{ $set: fromdistec },
									{ upsert: true, new: true }
								);
							}
						}

						console.log(`Categories Information has been synced`.white.inverse);
					})
					.catch((error) => {
						console.error(`${error}`.red.inverse);
						process.exit(1);
					});
			});
		});
});

// Get News from Distec
cron.schedule('0 0 1,16 * *', async () => {
	await axios
		.get('http://localhost/rest/news?lang=en', config)
		.then(async (res) => {
			for (var i = 0; i < res.data.data.length; i++) {
				let prod = await Noticia.findOne({
					id: res.data.data[i].id,
				});

				const addlink = {
					isLive: true,
					fmtitle: res.data.data[i].title,
					seotitle: res.data.data[i].title,
					fmcontent: res.data.data[i].bodytext,
					fmintro: res.data.data[i].teaser,
					fmlink: res.data.data[i].title
						.replace('-', ' ')
						.replace(/&/g, 'and')
						.replace('?', '')
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')
						.toLowerCase(),
				};

				const fromdistec = res.data.data[i];

				const additem = Object.assign(addlink, fromdistec);

				if (!prod) {
					const newNoticia = new Noticia(additem);
					newNoticia.save();
				} else {
					Noticia.findOneAndUpdate(
						{ id: res.data.data[i].id },
						{ $set: fromdistec },
						{ upsert: true, new: true }
					);
				}
			}

			console.log(`News Information has been synced`.yellow.inverse);
		})
		.catch((error) => {
			console.error(`${error}`.red.inverse);
			process.exit(1);
		});
});

// NodeJS Server Configuration
const PORT = process.env.PORT || 5079;

app.listen(
	PORT,
	console.log(`Ferocious Server running on port ${PORT}`.bgBlue.bold)
);
