const chalk = require('chalk')
const Table = require('./models/Table')

async function fillTable(userName, phone, problem) {
	await Table.create({ userName, phone, problem })

	console.log(chalk.bgGreen('Заявка создана!'))
}

async function getTable() {
	const table = await Table.find()

	return table
}

module.exports = {
	fillTable,
	getTable,
}
