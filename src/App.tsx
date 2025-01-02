import React from 'react';
import router from '@/router/index.js';
import { RouterProvider } from 'react-router-dom';
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
