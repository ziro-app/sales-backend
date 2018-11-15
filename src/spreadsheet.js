try {
	exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
		const headers = {
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': 'https://atendimento.ziro.online',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Vary': 'Origin'
		}
		const methodOk = httpMethod === 'POST'
		const parametersOk = Object.keys(queryStringParameters).length === 0
		if (methodOk) {
			const { start_date, representative, reseller, transaction_type, end_date } = JSON.parse(body)
			const requestOk = parametersOk && start_date && representative && reseller && transaction_type && end_date
			if (requestOk)
				return {
					headers,
					statusCode: 200,
					body: JSON.stringify({ message: 'SUCCESS' }, null, 4)
				}
			else
				return {
					headers,
					statusCode: 200,
					body: JSON.stringify({
						message: 'Invalid query parameters or data.',
						parameters: queryStringParameters,
						data: body
					}, null, 4)
				}
		} else
				return {
					headers,
					statusCode: 200,
					body: JSON.stringify({
						message: 'Invalid httpMethod. Use POST',
						method: httpMethod
					}, null, 4)
				}
	}
} catch (error) {
	console.log(error)
}