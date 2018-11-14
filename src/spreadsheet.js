exports.handler = async (event, context) => {
	return {
		headers: {
			// 'Access-Control-Allow-Origin': 'https://atendimento.ziro.online',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Vary': 'Origin'
		},
		statusCode: 200,
		body: JSON.stringify(event, null, 4)
	}
}