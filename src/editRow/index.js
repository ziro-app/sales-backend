const { formatDate } = require('../utils/formatDate')
const editRowInSheet = require('./editRowInSheet')
const editEventInCalendar = require('./editEventInCalendar')

const editRow = async ({
	is_complete,
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
	is_complete = is_complete === "true" ? true : false
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
		const inicio = formatDate(start_date)
		const assessor = representative
		const lojista = reseller
		const categoria = category
		const tipo = type
		const despacho = formatDate(end_date)
		if (!is_complete) {
			return await editRowInSheet({
				is_complete, atendimento, inicio, assessor, lojista, categoria, tipo, despacho
			})
		}		
		if (dataCompleteOk) {
			const horario = time
			const transporte = shipping
			const endereco = address
			const fardo = packaging
			const nota = invoice 
			const observacoes = comments
			const sheetStatus = await editRowInSheet({
				is_complete, atendimento, inicio, assessor, lojista, categoria, tipo, despacho,
				horario, transporte, endereco, fardo, nota, observacoes
			})
			if (sheetStatus === 'ok') {
				return await editEventInCalendar({
					atendimento, assessor, lojista, categoria, tipo, despacho, horario,
					transporte, endereco, fardo, nota, observacoes
				})
			}
		}
	}
	return 'dataError'
}

module.exports = editRow