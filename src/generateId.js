const { get } = require('axios')

const generateId = async () => {
	const { data: { values } } = await get(`${process.env.SPREADSHEET_URL}`)
	const ids = values.map(row => row[0]).slice(1)
	return Math.max(...ids) + 1
}

module.exports = generateId