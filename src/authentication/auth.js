const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./credentials')

const auth = () => {
	return new Promise( (resolve, reject) => {
		const spreadsheet = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
		spreadsheet.useServiceAccountAuth(credentials, error => {
			if (error)
				reject({ message: 'Error in useServiceAccountAuth', details: error })
			resolve(spreadsheet)
		})
	})
}

module.exports = auth