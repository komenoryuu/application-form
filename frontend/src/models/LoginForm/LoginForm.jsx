import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { loginSchema } from './loginSchema'
import { loginHandler } from './loginHandler'
import { Input, Error, Button } from '../../components'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	})

	const [serverError, setServerError] = useState(null)
	const navigate = useNavigate()
	const errorSchema = errors?.email?.message || errors?.password?.message
	const errorMessage = errorSchema || serverError

	const login = async ({ email, password }) => {
		const hasError = await loginHandler(email, password)

		if (hasError) return setServerError(hasError)

		navigate('/table')
	}

	return (
		<div className='flex flex-col items-center'>
			<h2 className='text-3xl mb-5 text-slate-300'>Вход</h2>
			<form
				className='w-[500px] flex flex-col gap-5 mb-5'
				onSubmit={handleSubmit(login)}>
				{errorMessage && <Error message={errorMessage} />}
				<Input
					type='text'
					placeholder='Почта...'
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button error={errorMessage}>Войти</Button>
			</form>
		</div>
	)
}
