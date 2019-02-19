const editStatusInSheet = require('./editStatusInSheet')
// const editEventInCalendar = require('./editEventInCalendar')

const editStatus = async ({ atendimento, status }) => {
	if (atendimento && status) {
		const sheetStatus = await editStatusInSheet({ atendimento, status })
		// if (sheetStatus === 'ok' && status === 'cancelado')
		// 	return await editEventInCalendar({ atendimento })
		return sheetStatus
	}
	return 'dataError'
}

module.exports = editStatus