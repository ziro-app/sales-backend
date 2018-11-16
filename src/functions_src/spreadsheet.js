const saveToSheet = require('../saveToSheet')

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
			if (requestOk) {
				const id = '1'
				const cadastro = new Date().toString().substr(4,20)
				const atendimento_inicio = new Date(start_date).toString().substr(4,11)
				const assessor = representative
				const lojista = reseller
				const tipo = transaction_type
				const atendimento_fim = new Date(end_date).toString().substr(4,11)
				const status = 'Aberto'
				const { message, error } = await saveToSheet({
					id, cadastro, atendimento_inicio, assessor, lojista,
					tipo, atendimento_fim, status
				})
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