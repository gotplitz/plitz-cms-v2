import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

// Import Routes
import { authProtectedRoutes, publicRoutes } from './routes/';
import AppRoute from './routes/route';

// layouts
import VerticalLayout from './components/VerticalLayout/';
import HorizontalLayout from './components/HorizontalLayout/';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

const App = ({ layout }) => {
	const userLogged = useSelector((state) => state.Login);

	const { isAuthenticated, user } = userLogged;
	/**
	 * Returns the layout
	 */
	const getLayout = () => {
		let layoutCls = VerticalLayout;

		switch (layout.layoutType) {
			case 'horizontal':
				layoutCls = HorizontalLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	};

	const layOut = getLayout();

	return (
		<React.Fragment>
			<Router>
				<Switch>
					{publicRoutes.map((route, idx) => (
						<AppRoute
							path={route.path}
							layout={NonAuthLayout}
							component={route.component}
							key={idx}
							isAuthProtected={false}
							verified={user ? user.verified : null}
							isAuthenticated={isAuthenticated}
						/>
					))}

					{authProtectedRoutes.map((route, idx) => (
						<AppRoute
							path={route.path}
							layout={layOut}
							component={route.component}
							key={idx}
							verified={user ? user.verified : null}
							isAuthProtected={true}
							isAuthenticated={isAuthenticated}
						/>
					))}
				</Switch>
			</Router>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		layout: state.Layout,
	};
};

export default connect(mapStateToProps, null)(App);
