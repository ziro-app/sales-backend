const post = require('axios').post

const addEventToCalendar = async (eventData) => {
	const { data: status } = await post(`${process.env.CALENDAR_INSERT_URL}`, eventData)
	if (status === 'Success')
		return 'ok'
	console.log(status)
	return 'calendarError'
}

module.exports = addEventToCalendar