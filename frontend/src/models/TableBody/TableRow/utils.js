export const formatDate = date => {
	const newDate = new Date(date)

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	})

	return formatter.format(newDate)
}
