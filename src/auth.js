require('dotenv').config()
const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./credentials')

const auth = () => {
	try {
		return new Promise( (resolve, reject) => {
			const spreadsheet = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
			spreadsheet.useServiceAccountAuth(credentials, error => {
				if (error)
					reject({ message: 'Error in useServiceAccountAuth', error: error })
				resolve(spreadsheet.addRow)
			})
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = auth