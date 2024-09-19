// src/App.js

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Collections from './pages/Collections';
import CollectionDetailPage from './pages/CollectionDetailPage';
import CollectionData from './pages/CollectionData';
import { CollectionProvider } from './pages/CollectionContext'; // Import the context provider
import NewCollection from './pages/NewCollection';
// Define your routes
const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ path: '/', element: <Dashboard /> },
			{ path: '/collections', element: <Collections /> },
			{ path: '/collections/new', element: <NewCollection /> },
			{ path: '/collections/:collectionId', element: <CollectionDetailPage /> },
			{ path: '/collections/:collectionId/view', element: <CollectionData /> },
			{ path: '/settings', element: <Settings /> }
		]
	}
]);

function App() {
	return (
		// Wrap the RouterProvider with the CollectionProvider
		// <CollectionProvider>
		<RouterProvider router={router} />
		// </CollectionProvider>
	);
}

export default App;

// import React from 'react';
// import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
// import RootLayout from './pages/RootLayout';
// import Dashboard from './pages/Dashboard';
// import Settings from './pages/Settings';
// import Collections from './pages/Collections';
// import CollectionDetailPage from './pages/CollectionDetailPage';
// import CollectionData from './pages/CollectionData';

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <RootLayout />,
// 		children: [
// 			{ path: '/', element: <Dashboard /> },
// 			{ path: '/collections', element: <Collections /> },
// 			{ path: '/collections/:collectionId', element: <CollectionDetailPage /> },
// 			{ path: '/collections/:collectionId/view', element: <CollectionData /> },
// 			{ path: '/settings', element: <Settings /> }
// 		]
// 	}
// ]);

// function App() {
// 	return <RouterProvider router={router} />;
// }

// export default App;
