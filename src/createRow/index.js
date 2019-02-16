const generateId = require('./generateId')
const { formatDate, now } = require('../utils/formatDate')
const addRowToSheet = require('./addRowToSheet')
const addEventToCalendar = require('./addEventToCalendar')

const createRow = async ({
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
	const atendimento = await generateId()
	const dataPartialOk = atendimento
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
		const cadastro = now()
		const inicio = formatDate(start_date)
		const assessor = representative
		const lojista = reseller
		const categoria = category
		const tipo = type
		const despacho = formatDate(end_date)
		const status = 'Escolhendo'
		let horario = transporte = endereco = fardo = nota = observacoes = ''
		if (dataCompleteOk) {
			horario = time
			transporte = shipping
			endereco = address
			fardo = packaging
			nota = invoice 
			observacoes = comments
		}
		const sheetStatus = await addRowToSheet({
			cadastro, atendimento, inicio, assessor, lojista, categoria, tipo, despacho, status,
			horario, transporte, endereco, fardo, nota, observacoes
		})
		if (sheetStatus === 'ok') {
			return await addEventToCalendar({
				atendimento, assessor, lojista, categoria, tipo, despacho, horario,
				transporte, endereco, fardo, nota, observacoes
			})
		}
	}
	return 'dataError'
}

module.exports = createRow