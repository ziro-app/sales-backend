// const editStatusInSheet = require('../saveToSheet')

try {
	exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
		const headers = {
			// 'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Origin': 'https://atendimento.ziro.online',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Vary': 'Origin'
		}
		const methodOk = httpMethod === 'POST'
		const parametersOk = Object.keys(queryStringParameters).length === 0
		if (methodOk) {
			const { status } = JSON.parse(body)
			const requestOk = parametersOk && status
			if (requestOk) {
				// const { message, error } = await saveToSheet({ status })
				console.log(status)
				const message = 'SUCCESS'
				if (message === 'SUCCESS')
					return {
						headers,
						statusCode: 200,
						body: JSON.stringify({ message: 'SUCCESS' }, null, 4)
					}
				else
					return {
						headers,
						statusCode: 200,
						body: JSON.stringify({ message: error })
					}
			} else
				return {
					headers,
					statusCode: 200,
					body: JSON.stringify({ message: 'Invalid query parameters or data' })
				}
		} else
			return {
				headers,
				statusCode: 200,
				body: JSON.stringify({ message: 'Invalid httpMethod. Use POST' })
			}
	}
} catch (error) {
	console.log(error)
}

// curl -d '{"status": "despachado"}' -X POST https://sales-backend.ziro.online/.netlify/functions/edit-status
// curl -d '{"status": "despachado"}' -X POST http://localhost:9000/edit-status