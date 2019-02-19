const editStatusInSheet = require('./editStatusInSheet')
const removeEventInCalendar = require('./removeEventInCalendar')

const editStatus = async ({ atendimento, status, saleIsComplete }) => {
	if (atendimento && status) {
		const sheetStatus = await editStatusInSheet({ atendimento, status })
		if (sheetStatus === 'ok' && status === 'Cancelado' && saleIsComplete)
			return await removeEventInCalendar({ atendimento })
		return sheetStatus
	}
	return 'dataError'
}

module.exports = editStatus