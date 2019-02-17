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
		const cadastro = now(),
			inicio = formatDate(start_date),
			assessor = representative,
			lojista = reseller,
			categoria = category,
			tipo = type,
			despacho = formatDate(end_date),
			status = 'Escolhendo',
			horario = time,
			transporte = shipping,
			endereco = address,
			fardo = packaging,
			nota = invoice ,
			observacoes = comments
		const sheetStatus = await addRowToSheet({
			cadastro, atendimento, inicio, assessor, lojista, categoria, tipo, despacho, status,
			horario, transporte, endereco, fardo, nota, observacoes
		})
		if (sheetStatus === 'ok' && dataCompleteOk) {
			return await addEventToCalendar({
				atendimento, assessor, lojista, categoria, tipo, despacho, horario,
				transporte, endereco, fardo, nota, observacoes
			})
		}
	}
	return 'dataError'
}

module.exports = createRow