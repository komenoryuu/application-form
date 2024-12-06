export const loginHandler = async (email, password) => {
	try {
		const response = await fetch('http://localhost:3000/api/clinic/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include',
		})

		if (!response.ok) {
			const serverData = await response.json()
			throw new Error(serverData.message || 'Неизвестная ошибка сервера...')
		}

		return false
	} catch (error) {
		return error.message
	}
}
