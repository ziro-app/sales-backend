const { formatDate } = require('../utils/formatDate')
const editRowInSheet = require('./editRowInSheet')
const editEventInCalendar = require('./editEventInCalendar')

const editRow = async ({
	sale,
	start_date,
	representative,
	reseller,
	category,
	type,
	end_date,
	time,
	shipping,
	address,
	packaging,
	invoice,
	comments
}) => {
	const dataPartialOk = sale
		&& start_date
		&& representative
		&& reseller
		&& category
		&& type
		&& end_date
	const dataCompleteOk = dataPartialOk
		&& time
		&& shipping
		&& address
		&& packaging
		&& invoice
	if (dataPartialOk) {
		const atendimento = sale
			inicio = formatDate(start_date),
			assessor = representative,
			lojista = reseller,
			categoria = category,
			tipo = type,
			despacho = formatDate(end_date),
			horario = time,
			transporte = shipping,
			endereco = address,
			fardo = packaging,
			nota = invoice,
			observacoes = comments,
			retirada = dataCompleteOk ? `RL${atendimento}` : ''
		const sheetStatus = await editRowInSheet({
			atendimento, inicio, assessor, lojista, categoria, tipo, despacho,
			horario, transporte, endereco, fardo, nota, observacoes, retirada
		})
		if (sheetStatus === 'ok' && dataCompleteOk) {
			return await editEventInCalendar({
				atendimento, assessor, lojista, categoria, tipo, despacho, horario,
				transporte, endereco, fardo, nota, observacoes
			})
		}
		return 'ok'
	}
	return 'dataError'
}

module.exports = editRow