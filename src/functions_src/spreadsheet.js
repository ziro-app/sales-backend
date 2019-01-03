const generateId = require('../generateId')
const { formatDate, now } = require('../formatDate')
const saveToSheet = require('../saveToSheet')

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
			const { start_date, representative, reseller, category, type, end_date } = JSON.parse(body)
			const requestOk = parametersOk && start_date && representative && reseller && category && type && end_date
			if (requestOk) {
				const atendimento_id = await generateId()
				const cadastro = now()
				const atendimento_inicio = formatDate(start_date)
				const assessor = representative
				const lojista = reseller
				const categoria = category
				const tipo = type
				const atendimento_fim = formatDate(end_date)
				const status = 'Aberto'
				const { message, error } = await saveToSheet({
					atendimento_id, cadastro, atendimento_inicio, assessor, lojista,
					categoria, tipo, atendimento_fim, status
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

// curl -d '{"start_date": "2019-01-02T20:00:00.000Z", "representative":"Alan", "reseller":"ADRIANA ALVES SILVA", "category":"Venda", "type":"Offline", "end_date":"2019-01-03T20:00:00.000Z" }' -X POST https://sales-backend.ziro.online/.netlify/functions/spreadsheet
// curl -d '{"start_date": "2019-05-02T20:00:00.000Z", "representative":"Alan", "reseller":"ADRIANA ALVES SILVA", "category":"Venda", "type":"Offline", "end_date":"2019-08-03T20:00:00.000Z" }' -X POST http://localhost:9000/spreadsheet