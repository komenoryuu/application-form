const mongoose = require('mongoose')
const validator = require('validator')

const UsersSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Почта некорректна',
		},
	},
	password: {
		type: String,
		required: true,
	},
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users
