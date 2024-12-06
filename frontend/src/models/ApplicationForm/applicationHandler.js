export const applicationHandler = async (userName, phone, problem) => {
	try {
		const response = await fetch('http://localhost:3000/api/clinic', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userName, phone, problem }),
		})

		if (!response.ok) {
			const serverData = await response.json()

			throw new Error(serverData.message || 'Неизвестная ошибка сервера...')
		}

		const serverData = await response.json()

		return {
			status: true,
			message: serverData.message,
		}
	} catch (error) {
		return {
			status: false,
			message: error.message,
		}
	}
}
