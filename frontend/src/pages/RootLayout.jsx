import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SidebarLayout';
import Header from '../components/Header';
function RootLayout() {
	return (
		<Fragment>
			<div className="app-container">
				<Sidebar />
				<main>
					<Outlet />
				</main>
			</div>
		</Fragment>
	);
}
export default RootLayout;
