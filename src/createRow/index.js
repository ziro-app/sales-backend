const auth = require('../authentication/auth')

const createRow = data => {
	try {
		return new Promise ( async (resolve, reject) => {
			const { addRow } = await auth()
			if (addRow.message)
				reject(addRow.message)
			addRow(1, data, error => {
				if (error)
					reject({ message: 'Error in addRow', error: error })
				resolve({ message: 'SUCCESS', error: '' })
			})
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = createRow