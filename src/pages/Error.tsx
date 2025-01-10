import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const routerError: any = useRouteError();
	return (
		<>
			<div className="flex justify-center items-center bg-white" style={{ height: '100vh' }}>
				<h1>this page is not found!</h1>
				<p>{routerError}</p>
			</div>
		</>
	);
}
