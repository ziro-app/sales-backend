const editStatusInSheet = require('./editStatusInSheet')
const removeEventInCalendar = require('./removeEventInCalendar')

const editStatus = async ({ atendimento, status, saleIsComplete }) => {
	if (atendimento && status && saleIsComplete) {
		const sheetStatus = await editStatusInSheet({ atendimento, status })
		if (sheetStatus === 'ok' && status === 'Cancelado' && saleIsComplete === 'true')
			return await removeEventInCalendar({ atendimento })
		return sheetStatus
	}
	return 'dataError'
}

module.exports = editStatus