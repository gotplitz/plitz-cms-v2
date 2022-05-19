import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';
import Login from './authentication/reducer';
import Activity from './activity/reducer';
import Folders from './folders/reducer';
import Series from './series/reducer';
import Categories from './categories/reducer';
import Products from './products/reducer';
import Pages from './pages/reducer';
import Blogposts from './blogposts/reducer';
import Noticias from './noticias/reducer';

const rootReducer = combineReducers({
	Login,
	Layout,
	Activity,
	Folders,
	Series,
	Categories,
	Products,
	Pages,
	Blogposts,
	Noticias,
});

export default rootReducer;
