import { Routes, Route } from 'react-router'
import { Form, Login, Table, NotFound } from './pages'

export default function App() {
	return (
		<div className='flex items-center justify-center min-h-screen p-7 relative'>
			<Routes>
				<Route
					path='/'
					element={<Form />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/table'
					element={<Table />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</div>
	)
}
