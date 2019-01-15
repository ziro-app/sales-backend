const editRow = require('../editRow/index')

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
			const { atendimento, inicio, assessor, lojista, categoria, tipo, fim, status } = JSON.parse(body)
			const requestOk = parametersOk && atendimento && inicio && assessor && lojista && categoria && tipo && fim && status
			if (requestOk) {
				const { message, error } = await editRow({ atendimento, inicio, assessor, lojista, categoria, tipo, fim, status })
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

// curl -d '{"atendimento": "10018", "inicio": "14/ago/2019", "assessor": "Alan", "lojista": "TRIBUNA ROUPAS", "categoria": "Troca", "tipo": "Offline", "fim": "15/set/2019", "status": "Entregue"}' -X POST https://sales-backend.ziro.online/.netlify/functions/edit-row
// curl -d '{"atendimento": "10018", "inicio": "14/ago/2019", "assessor": "Alan", "lojista": "TRIBUNA ROUPAS", "categoria": "Troca", "tipo": "Offline", "fim": "15/set/2019", "status": "Entregue"}' -X POST http://localhost:9000/edit-row