exports.handler = async (event, context) => {
	return {
		/* change Access-Control-Allow-Origin to '*' during development */
		headers: {
			'Access-Control-Allow-Origin': 'https://atendimento.ziro.online'
			// 'Vary': 'Origin'
		},
		statusCode: 200,
		body: JSON.stringify(event, null, 4)
	}
}