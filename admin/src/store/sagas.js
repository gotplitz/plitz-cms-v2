import { all, fork } from 'redux-saga/effects';

// Parts
import LoginSaga from './authentication/saga';
import ActivitySaga from './activity/saga';
import LayoutSaga from './layout/saga';
import FoldersSaga from './folders/saga';
import SeriesSaga from './series/saga';
import CategoriesSaga from './categories/saga';
import ProductsSaga from './products/saga';
import PagesSaga from './pages/saga';
import BlogpostsSaga from './blogposts/saga';
import NoticiasSaga from './noticias/saga';

export default function* rootSaga() {
	yield all([
		fork(LoginSaga),
		fork(LayoutSaga),
		fork(ActivitySaga),
		fork(FoldersSaga),
		fork(SeriesSaga),
		fork(CategoriesSaga),
		fork(ProductsSaga),
		fork(PagesSaga),
		fork(BlogpostsSaga),
		fork(NoticiasSaga),
	]);
}
