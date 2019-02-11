const generateId = require('./generateId')
const { formatDate, now } = require('../utils/formatDate')
const addRowToSheet = require('./addRowToSheet')

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
	const dataOk = atendimento
		&& start_date
		&& representative
		&& reseller
		&& category
		&& type
		&& end_date
		&& time
		&& shipping
		&& address
		&& packaging
		&& invoice
		&& comments
	if (dataOk) {
		const cadastro = now()
		const inicio = formatDate(start_date)
		const assessor = representative
		const lojista = reseller
		const categoria = category
		const tipo = type
		const despacho = formatDate(end_date)
		const status = 'Escolhendo'
		const horario = time
		const transporte = shipping
		const endereco = address
		const fardo = packaging
		const nota = invoice 
		const observacao = comments
		return await addRowToSheet({
			atendimento, cadastro, inicio, assessor, lojista, categoria, tipo, despacho, status,
			horario, transporte, endereco, fardo, nota, observacao
		})
	}
	return 'dataError'
}

module.exports = createRow