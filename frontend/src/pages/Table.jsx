import { TableBody } from '../models'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

export const Table = () => {
	const [userLogin, setUserLogin] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		fetch('http://localhost:3000/api/me', {
			method: 'GET',
			credentials: 'include',
		})
			.then(response => {
				if (!response.ok) navigate('/')

				return response.json()
			})
			.then(data => {
				setUserLogin(data.email)
			})
	}, [])

	if (!userLogin) return null

	return <TableBody userLogin={userLogin} />
}
