const readline = require('readline')
const mongoose = require('mongoose')
const { addUser } = require('./users.controller')
const { MONGO_URL } = require('./constants')
const chalk = require('chalk')

mongoose
	.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		startCLI()
	})
	.catch(err => {
		console.error(chalk.bgRed('Ошибка подключения к базе данных:', err))
	})

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function startCLI() {
	console.log(chalk.bgBlue('Добро пожаловать! Введите данные для добавления пользователя.'))

	rl.question(chalk.blue('Введите email: '), email => {
		rl.question(chalk.blue('Введите пароль: '), async password => {
			try {
				await addUser(email, password)
				console.log(chalk.bgGreen(`Пользователь ${email} успешно добавлен!`))
			} catch (error) {
				console.error(chalk.bgRed(`Ошибка при добавлении пользователя: ${error}`))
			} finally {
				rl.close()
				mongoose.connection.close()
			}
		})
	})
}
