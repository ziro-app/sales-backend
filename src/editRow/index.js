const { formatDate } = require('../utils/formatDate')
const editRowInSheet = require('./editRowInSheet')

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
				return await addEventToCalendar({
					atendimento, assessor, lojista, categoria, tipo, despacho, horario,
					transporte, endereco, fardo, nota, observacoes
				})
			}
		}
	}
	return 'dataError'
}

module.exports = editRow




const auth = require('../authentication/auth')

const editRow = ({ atendimento, inicio, assessor, lojista, categoria, tipo, despacho }) => {
	try {
		return new Promise (async (resolve, reject) => {
			const { getRows } = await auth()
			if (getRows.message)
				reject(getRows.message)
			getRows(1, (error, rows) => {
				if (error)
					reject({ message: 'Error in getRows', error: error })
				const [ result ] = rows.filter(row => row.atendimento === atendimento)
				if (result) {
					result.inicio = inicio
					result.assessor = assessor
					result.lojista = lojista
					result.categoria = categoria
					result.tipo = tipo
					result.despacho = despacho
					result.save(error => {
						if (error)
							reject({ message: 'Error in row.save', error: error })
						resolve({ message: 'SUCCESS', error: '' })
					})
				} else
					reject({ message: 'Error in server getRows', error: 'Row id does not exist' })
			})
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = editRow