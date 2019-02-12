require('dotenv').config()
const response = require('../utils/response')
const createRow = require('../createRow/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			state = await createRow(JSON.parse(body))
		}
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"start_date": "2019-01-02T20:00:00.000Z", "representative":"Alan", "reseller":"ADRIANA ALVES SILVA", "category":"Venda", "type":"Offline", "end_date":"2019-01-03T20:00:00.000Z" }' -X POST https://sales-backend.ziro.online/.netlify/functions/create-row
// curl -d '{"is_complete": "true","start_date": "2019-05-02T20:00:00.000Z","representative":"Alan","reseller":"ADRIANA ALVES SILVA","category":"Venda","type":"Offline","end_date":"2019-08-03T20:00:00.000Z","time": "09:05","shipping": "DIRETO DO FORNECEDOR","address": "PC MONS JOSE MARIA MONTEIRO, 28, SAO PAULO, SP","packaging": "Livre","invoice": "Sem Nota","comments": "Urgente"}' -X POST http://localhost:9000/create-row
// curl -d '{"is_complete": "false","start_date": "2019-05-02T20:00:00.000Z","representative":"Alan","reseller":"ADRIANA ALVES SILVA","category":"Venda","type":"Offline","end_date":"2019-08-03T20:00:00.000Z"}' -X POST http://localhost:9000/create-row