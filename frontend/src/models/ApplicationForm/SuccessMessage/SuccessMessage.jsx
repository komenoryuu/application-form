export const SuccessMessage = ({ timer }) => (
	<div className='absolute h-12 w-full top-0 flex justify-center gap-1 items-center text-lg bg-green-700'>
		<span>Форма отправлена успешно!</span>
		<span>Окно исчезнет через {timer}...</span>
	</div>
)
