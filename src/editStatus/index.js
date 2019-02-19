const editStatusInSheet = require('./editStatusInSheet')
const removeEventInCalendar = require('./removeEventInCalendar')

const editStatus = async ({ atendimento, status }) => {
	if (atendimento && status) {
		const sheetStatus = await editStatusInSheet({ atendimento, status })
		if (sheetStatus === 'ok' && status === 'Cancelado')
			return await removeEventInCalendar({ atendimento })
		return sheetStatus
	}
	return 'dataError'
}

module.exports = editStatus