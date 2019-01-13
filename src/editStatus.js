const auth = require('./auth')

const editStatus = ({ status }) => {
	try {
		return new Promise ( async (resolve, reject) => {
			const { getRows } = await auth()
			if (getRows.message)
				reject(getRows.message)
			getRows(1, async (error, rows) => {
				if (error)
					reject({ message: 'Error in getRows', error: error })
				const [ result ] = rows.filter(row => row.atendimento === '10087')
				result.status = status
				await result.save( error => {
					if (error)
						reject({ message: 'Error in row.save', error: error })
				})
				resolve({ message: 'SUCCESS', error: '' })
			})
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = editStatus