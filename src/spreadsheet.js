try {
	exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
		/* check if method, parameters and data are all valid */
		const methodOk = httpMethod === 'POST'
		const parametersOk = Object.keys(queryStringParameters).length === 0
		const { start_date, representative, reseller, transaction_type, end_date } = body
		const requestOK = methodOk && parametersOk && start_date && representative && reseller
			&& transaction_type && end_date
		/* define headers for client response */
		const headers = {
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': 'https://atendimento.ziro.online',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Vary': 'Origin'
		}
		if (requestOK)
			return {
				headers: { headers },
				statusCode: 200,
				body: JSON.stringify(body, null, 4)
			}
		else
			return {
				headers: { headers },
				statusCode: 200,
				body: {
					message: 'Invalid method, parameters or data.',
					method: httpMethod,
					parameters: queryStringParameters,
					data: body
				}
			}
	}
} catch (error) {
	console.log(error)
}