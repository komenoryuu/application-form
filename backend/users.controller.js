const Users = require('./models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./constants')

async function addUser(email, password) {
	const passwordHash = await bcrypt.hash(password, 10)
	await Users.create({ email, password: passwordHash })
}

async function loginUser(email, password) {
	const user = await Users.findOne({ email })

	if (!user) {
		throw new Error('Пользователь не найден')
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password)

	if (!isPasswordCorrect) {
		throw new Error('Неверный пароль')
	}

	return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' })
}

module.exports = { loginUser, addUser }
