import router from '@/router/index.js';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider future={{ v7_startTransition: true }} router={router} />
		</Provider>
	);
};

export default App;
