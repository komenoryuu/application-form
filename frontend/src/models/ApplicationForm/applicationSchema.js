import * as yup from 'yup'

export const applicationSchema = yup.object().shape({
	userName: yup
		.string()
		.required('Фамилия, имя и отчество обязательны')
		.min(10, 'ФИО не может быть меньше 10 символов')
		.max(70, 'ФИО не может быть больше 70 символов'),
	phone: yup
		.string()
		.required('Телефон обязателен')
		.test('is-valid-phone', 'Введите телефон полностью', value => {
			const unmaskedValue = value.replace(/[^0-9]/g, '')
			return unmaskedValue.length === 11
		}),
	problem: yup.string().max(500, 'Описание не может быть больше 500 символов'),
})
