const auth = require('./auth')

const editStatus = ({ atendimento, status }) => {
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
					result.status = status
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

module.exports = editStatus