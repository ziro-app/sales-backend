const auth = require('../authentication/auth')

const addRowToSheet = data => {
	return new Promise ( async (resolve, reject) => {
		const { addRow } = await auth()
		if (addRow.message)
			reject(addRow.message)
		addRow(1, data, error => {
			if (error)
				reject({ message: 'Error in addRow', details: error })
			resolve('ok')
		})
	})
}

module.exports = addRowToSheet