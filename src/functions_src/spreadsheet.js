const auth = require('../auth')

try {
	exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
		const headers = {
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': 'https://atendimento.ziro.online',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Vary': 'Origin'
		}
		await auth()
		const methodOk = httpMethod === 'POST'
		const parametersOk = Object.keys(queryStringParameters).length === 0
		if (methodOk) {
			const { start_date, representative, reseller, transaction_type, end_date } = JSON.parse(body)
			const requestOk = parametersOk && start_date && representative && reseller && transaction_type && end_date
			if (requestOk)
				// console.log(await auth())
				return {
					headers,
					statusCode: 200,
					body: JSON.stringify({ message: 'SUCCESS' }, null, 4)
				}
			else
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