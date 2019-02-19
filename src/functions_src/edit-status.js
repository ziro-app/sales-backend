require('dotenv').config()
const response = require('../utils/response')
const editStatus = require('../editStatus/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			state = await editStatus(JSON.parse(body))
		}
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"atendimento": "10136", "status": "Despachando"}' -X POST https://sales-backend.ziro.online/.netlify/functions/edit-status
// curl -d '{"atendimento": "10136", "status": "Despachando"}' -X POST http://localhost:9000/edit-status