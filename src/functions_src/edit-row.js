const { formatDate } = require('../utils/formatDate')
const editRow = require('../editRow/index')

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
			const { sale, start_date, representative, reseller, category, type, end_date } = JSON.parse(body)
			const atendimento = sale
			const inicio = formatDate(start_date)
			const assessor = representative
			const lojista = reseller
			const categoria = category
			const tipo = type
			const despacho = formatDate(end_date)
			const requestOk = parametersOk && atendimento && inicio && assessor && lojista && categoria && tipo && despacho
			if (requestOk) {
				const { message, error } = await editRow({ atendimento, inicio, assessor, lojista, categoria, tipo, despacho })
				if (message === 'SUCCESS')
					return {
						headers,
						statusCode: 200,
						body: JSON.stringify({ message: message }, null, 4)
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

// curl -d '{"sale": "10018", "start_date": "2019-01-02T20:00:00.000Z", "representative":"Alan", "reseller":"ADRIANA ALVES SILVA", "category":"Venda", "type":"Offline", "end_date":"2019-01-03T20:00:00.000Z" }' -X POST https://sales-backend.ziro.online/.netlify/functions/edit-row
// curl -d '{"sale": "10018", "start_date": "2019-05-02T20:00:00.000Z", "representative":"Alan", "reseller":"ADRIANA ALVES SILVA", "category":"Venda", "type":"Offline", "end_date":"2019-08-03T20:00:00.000Z" }' -X POST http://localhost:9000/edit-row