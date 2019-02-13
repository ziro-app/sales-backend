const auth = require('../authentication/auth')

const editRowInSheet = ({
	is_complete,
	atendimento,
	inicio,
	assessor,
	lojista,
	categoria,
	tipo,
	despacho,
	horario,
	transporte,
	endereco,
	fardo,
	nota,
	observacoes
}) => {
	return new Promise( async (resolve, reject) => {
		const { getRows } = await auth()
		getRows(1, (error, rows) => {
			if (error)
				reject({ message: 'Error in getRows', details: error })
			const [ result ] = rows.filter(row => row.atendimento === atendimento)
			if (result) {
				result.inicio = inicio
				result.assessor = assessor
				result.lojista = lojista
				result.categoria = categoria
				result.tipo = tipo
				result.despacho = despacho
				if (!is_complete) {
					result.save(error => {
						if (error)
							reject({ message: 'Error in row.save', details: error })
						resolve('ok')
					})
				}
				result.horario = horario
				result.transporte = transporte
				result.endereco = endereco 
				result.fardo = fardo
				result.nota = nota
				result.observacoes = observacoes
				result.save(error => {
					if (error)
						reject({ message: 'Error in row.save', details: error })
					resolve('ok')
				})
			}
			reject({ message: 'Error in server getRows', details: 'Row id does not exist' })
		})
	})
}

module.exports = editRowInSheet