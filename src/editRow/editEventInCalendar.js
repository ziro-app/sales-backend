const post = require('axios').post

const editEventInCalendar = async (eventData) => {
	const { data: status } = await post(`${process.env.CALENDAR_EDIT_URL}`, eventData)
	if (status === 'Success')
		return 'ok'
	console.log(status)
	return 'calendarError'
}

module.exports = editEventInCalendar