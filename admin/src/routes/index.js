import React from 'react';
import { Redirect } from 'react-router-dom';

// Pages Component
import Activity from '../pages/Administration/Activity';
import AllFolders from '../pages/Products/Folders/AllFolders';
import AddFolder from '../pages/Products/Folders/AddFolder';
import AllSeries from '../pages/Products/Series/AllSeries';
import AddSerie from '../pages/Products/Series/AddSerie';
import AllCategories from '../pages/Products/Categories/AllCategories';
import AddCategory from '../pages/Products/Categories/AddCategory';
import AllProducts from '../pages/Products/Products/AllProducts';
import AddProduct from '../pages/Products/Products/AddProduct';
import AllNoticias from '../pages/Noticias/AllNoticias';
import AddNoticia from '../pages/Noticias/AddNoticia';

// Post Types
import AllPages from '../pages/Pages/AllPages';
import AddPage from '../pages/Pages/AddPage';
import AllBlogposts from '../pages/Blogposts/AllBlogposts';
import AddBlogpost from '../pages/Blogposts/AddBlogpost';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import ForgetPwd from '../pages/Authentication/FogetPassword';
import NotApproved from '../pages/Authentication/NotApproved';
import ChangePassword from '../pages/Authentication/ChangePassword';

import Dashboard from '../pages/Dashboard';

import EmailInbox from '../pages/Apps/Email/inbox';
import EmailRead from '../pages/Apps/Email/read';

const authProtectedRoutes = [
	// Administration
	{ path: '/activity', component: Activity },

	// Clients
	{ path: '/all-folders', component: AllFolders },
	{ path: '/add-folder', component: AddFolder },
	{ path: '/all-series', component: AllSeries },
	{ path: '/add-serie', component: AddSerie },
	{ path: '/all-categories', component: AllCategories },
	{ path: '/add-category', component: AddCategory },
	{ path: '/all-products', component: AllProducts },
	{ path: '/add-product', component: AddProduct },

	// Post Types
	{ path: '/all-pages', component: AllPages },
	{ path: '/add-page', component: AddPage },
	{ path: '/all-blogposts', component: AllBlogposts },
	{ path: '/add-blogpost', component: AddBlogpost },
	{ path: '/all-noticias', component: AllNoticias },
	{ path: '/add-noticia', component: AddNoticia },

	// Email & Email Templates
	{ path: '/email-inbox', component: EmailInbox },
	{ path: '/email-read', component: EmailRead },

	{ path: '/dashboard', component: Dashboard },

	{ path: '/', exact: true, component: () => <Redirect to='/dashboard' /> },
];

const publicRoutes = [
	{ path: '/login', component: Login },
	{ path: '/forget-password', component: ForgetPwd },
	{ path: '/pages-register', component: Register },
	{ path: '/not-approved', component: NotApproved },
	{ path: '/change-password', component: ChangePassword },
];

export { authProtectedRoutes, publicRoutes };
