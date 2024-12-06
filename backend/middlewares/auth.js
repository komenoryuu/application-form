const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')

function auth(req, res, next) {
	const token = req.cookies.token

	const verifyResult = jwt.verify(token, JWT_SECRET)

	req.user = {
		email: verifyResult.email,
	}

	next()
}

module.exports = {
	auth,
}
