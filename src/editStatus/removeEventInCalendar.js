const post = require('axios').post

const removeEventInCalendar = async (eventData) => {
	const { data: status } = await post(`${process.env.CALENDAR_REMOVE_URL}`, eventData)
	if (status === 'Success')
		return 'ok'
	console.log(status)
	return 'calendarError'
}

module.exports = removeEventInCalendar