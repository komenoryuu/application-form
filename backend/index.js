const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { getTable, fillTable } = require('./table.controller')
const { loginUser } = require('./users.controller')
const { auth } = require('./middlewares/auth')
const { MONGO_URL } = require('./constants')

const port = 3000
const app = express()

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
)
app.use(express.json())
app.use(cookieParser())
app.use(
	express.urlencoded({
		extended: true,
	}),
)

// FILL FORM
app.post('/api/clinic', async (req, res) => {
	try {
		await fillTable(req.body.userName, req.body.phone, req.body.problem)

		res.status(201).json({ message: 'Форма отправлена успешно!' })
	} catch (error) {
		return res.status(500).json({
			message: 'Ошибка отправки формы. Попробуйте позже...',
		})
	}
})

// lOGIN
app.post('/api/clinic/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password)

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'Lax',
		})

		return res.status(200).json({ message: 'Успешный вход' })
	} catch (error) {
		return res.status(401).json({ message: error.message })
	}
})

// GET TABLE DATA
app.get('/api/clinic', async (req, res) => {
	try {
		const table = await getTable()

		res.status(200).json({ data: table })
	} catch (error) {
		return res.status(500).json({
			message: 'Ошибка получения данных...',
		})
	}
})

// GET USER EMAIL
app.get('/api/me', auth, (req, res) => {
	return res.json({ email: req.user.email })
})

mongoose.connect(MONGO_URL).then(() => {
	app.listen(port, () => {
		console.log(chalk.bgGreen(`Сервер запущен. Порт: ${port}...`))
	})
})
