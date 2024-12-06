import * as yup from 'yup'

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required('Почта обязательна')
		.email('Почта некорректна')
		.matches(/@[^.]*\./, 'Почта некорректна'),
	password: yup.string().required('Пароль обязателен'),
})
