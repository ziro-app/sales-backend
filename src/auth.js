require('dotenv').config()
const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./credentials')

const auth = async () => {
	try {
		const spreadsheet = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
		return new Promise( (resolve, reject) => {
			spreadsheet.useServiceAccountAuth(credentials, error => {
				if (error)
					reject({ message: 'Error in useServiceAccountAuth', error: error })
				resolve(spreadsheet)
			})
		})
	}	catch (error) {
		return { message: 'Error in auth.js', error: error }
	}
}

module.exports = auth