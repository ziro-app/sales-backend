try {
	exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
		/* check if method, parameters and data are all valid */
		const methodOk = httpMethod === 'POST'
		const parametersOk = Object.keys(queryStringParameters).length === 0
		const start_date = body.start_date
		console.log(start_date)
		// const { start_date, representative, reseller, transaction_type, end_date } = body
		const requestOk = methodOk && parametersOk && start_date && representative && reseller
			&& transaction_type && end_date
		console.log('requestOk',requestOk)
		/* define headers for client response */
		const headers = {
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': 'https://atendimento.ziro.online',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Vary': 'Origin'
		}
		if (requestOk)
			return {
				headers,
				statusCode: 200,
				body: JSON.stringify(body, null, 4)
			}
		else
			return {
				headers,
				statusCode: 200,
				body: JSON.stringify({
					message: 'Invalid method, parameters or data.',
					method: httpMethod,
					parameters: queryStringParameters,
					data: body
				}, null, 4)
			}
	}
} catch (error) {
	console.log(error)
}