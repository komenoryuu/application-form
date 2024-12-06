import { Link } from 'react-router'

export const NotFound = () => {
	return (
		<div className='flex flex-col items-center gap-6 text-4xl'>
			Страница не найдена
			<Link
				className='text-xl text-zinc-400 underline hover:text-inherit transition-all'
				to='/'>
				на главную
			</Link>
		</div>
	)
}
