import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	isAuthenticated,
	verified,
	...rest
}) => (
	<Route
		{...rest}
		render={(props) => {
			if (isAuthProtected && !isAuthenticated) {
				return (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				);
			} else if (
				isAuthProtected &&
				isAuthenticated &&
				verified !== null &&
				!verified
			) {
				return (
					<Redirect
						to={{
							pathname: '/not-approved',
							state: { from: props.location },
						}}
					/>
				);
			}

			return (
				<Layout>
					<Component {...props} />
				</Layout>
			);
		}}
	/>
);

export default AppRoute;
