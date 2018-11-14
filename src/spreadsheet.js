exports.handler = async (event, context) => {
	return {
		headers: {
			'Access-Control-Allow-Origin', 'https://ziro.online'
		}
		statusCode: 200,
		body: JSON.stringify(event, null, 4)
	}
}