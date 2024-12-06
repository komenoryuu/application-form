export const Button = ({ error, children }) => (
	<button
		className='transition-all w-full h-12 bg-slate-300 rounded text-zinc-800 text-xl hover:bg-slate-400 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:bg-gray-600 disabled:hover:text-gray-400'
		type='submit'
		disabled={!!error}>
		{children}
	</button>
)
