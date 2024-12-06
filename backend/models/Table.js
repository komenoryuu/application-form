const mongoose = require('mongoose')

const TableSchema = mongoose.Schema({
	dispatchDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	problem: {
		type: String,
	},
})

const Table = mongoose.model('Table', TableSchema)

module.exports = Table
