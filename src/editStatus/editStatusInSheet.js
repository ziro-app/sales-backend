const auth = require('../authentication/auth')

const editStatusInSheet = ({ atendimento, status }) => {
	return new Promise( async (resolve, reject) => {
		const { getRows } = await auth()
		getRows(1, (error, rows) => {
			if (error)
				reject({ message: 'Error in getRows (edit status)', details: error })
			const [ result ] = rows.filter(row => row.atendimento === atendimento)
			if (result) {
				result.status = status
				result.save(error => {
					if (error)
						reject({ message: 'Error in row.save (edit status)', details: error })
					resolve('ok')
				})
			} else
				reject({ message: 'Error in server getRows', details: 'Row id does not exist' })
		})
	})
}

module.exports = editStatusInSheet