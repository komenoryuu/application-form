import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { applicationSchema } from './applicationSchema'
import { applicationHandler } from './applicationHandler'
import { SuccessMessage } from './SuccessMessage'
import { Input, Error, Button } from '../../components'

export const ApplicationForm = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState,
		formState: { errors },
	} = useForm({
		defaultValues: {
			userName: '',
			phone: '',
			problem: '',
		},
		resolver: yupResolver(applicationSchema),
	})
	const [serverError, setServerError] = useState(null)
	const [formStatus, setFormStatus] = useState(null)
	const [timer, setTimer] = useState(5)
	const errorSchema =
		errors?.userName?.message || errors?.phone?.message || errors?.problem?.message
	const errorMessage = errorSchema || serverError

	const onSubmit = async ({ userName, phone, problem }) => {
		const response = await applicationHandler(userName, phone, problem)

		if (response.status === true) {
			setFormStatus(response.message)
		} else {
			setServerError(response.message)
		}
	}

	useEffect(() => {
		let countdown = null
		let timeout = null

		if (formState.isSubmitSuccessful) {
			if (serverError) return

			// disable button
			setServerError(true)

			countdown = setInterval(() => {
				setTimer(prev => {
					if (prev <= 1) {
						clearInterval(countdown)
						return 0
					}
					return prev - 1
				})
			}, 1000)

			timeout = setTimeout(() => {
				setFormStatus(null)
				setServerError(null)
				setTimer(5)
				reset()
			}, 5000)
		}

		return () => {
			if (countdown) clearInterval(countdown)
			if (timeout) clearTimeout(timeout)
		}
	}, [formState.isSubmitSuccessful, reset, serverError])


	return (
		<>
			{formStatus && <SuccessMessage timer={timer} />}
			<div className='flex flex-col items-center'>
				<h2 className='text-3xl mb-5 text-slate-300'>Запись к врачу</h2>
				<form
					className='w-[500px] flex flex-col gap-5 mb-5'
					onSubmit={handleSubmit(onSubmit)}>
					{errorMessage && <Error message={errorMessage} />}
					<Input
						type='text'
						placeholder='ФИО...'
						{...register('userName', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type='tel'
						placeholder='Номер телефона...'
						mask='+7 999 999 99 99'
						{...register('phone', {
							onChange: () => setServerError(null),
						})}
					/>
					<textarea
						className='h-52 w-full border-solid border-[1px] border-zinc-500 rounded-lg pl-3 text-lg outline-none focus:outline-1 focus:outline-zinc-300 focus:outline focus:border-none resize-none'
						placeholder='Опишите вашу проблему...'
						{...register('problem', {
							onChange: () => setServerError(null),
						})}
					/>
					<Button error={errorMessage}>Отправить</Button>
				</form>
			</div>
		</>
	)
}
