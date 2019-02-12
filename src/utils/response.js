const response = (state) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Vary': 'Origin'
	}
	const statusCode = 200
	const message = {
		methodError: 'Error. Invalid http method',
		parametersError: 'Error. Invalid parameters',
		executionError: 'Error. Internal execution error on runtime. Check logs',
		dataError: 'Error. Data provided is incorrect',
		calendarError: 'Error. Error on calendar API',
		ok: 'Success'
	}
	const body = JSON.stringify(message[state], null, 4) 
	return { headers, statusCode, body }
}

module.exports = response