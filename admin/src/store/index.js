import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggedToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const layoutType = localStorage.getItem('layoutType')
  ? localStorage.getItem('layoutType')
  : 'vertical';
const layoutWidth = localStorage.getItem('layoutWidth')
  ? localStorage.getItem('layoutWidth')
  : 'fluid';
const leftSideBarTheme = localStorage.getItem('leftSideBarTheme')
  ? localStorage.getItem('leftSideBarTheme')
  : 'light';
const leftSideBarType = localStorage.getItem('leftSideBarType')
  ? localStorage.getItem('leftSideBarType')
  : 'default';
const topbarTheme = localStorage.getItem('topbarTheme')
  ? localStorage.getItem('topbarTheme')
  : 'light';
const showRightSidebar = localStorage.getItem('showRightSidebar')
  ? JSON.parse(localStorage.getItem('showRightSidebar'))
  : false;
const isMobile = localStorage.getItem('isMobile')
  ? JSON.parse(localStorage.getItem('isMobile'))
  : false;

const initialState = {
  Login: {
    isAuthenticated: loggedToken !== null ? true : false,
    token: loggedToken,
  },
  Layout: {
    layoutType: layoutType,
    layoutWidth: layoutWidth,
    leftSideBarTheme: leftSideBarTheme,
    leftSideBarType: leftSideBarType,
    topbarTheme: topbarTheme,
    showRightSidebar: showRightSidebar,
    isMobile: isMobile,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
