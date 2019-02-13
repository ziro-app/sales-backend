const { get } = require('axios')

const generateId = async () => {
	try {
		const { data: { values } } = await get(`${process.env.SPREADSHEET_URL}`)
		const ids = values.map(row => row[1]).slice(1)
		return Math.max(...ids) + 1
	} catch (error) {
		console.log(error)
		return null
	}
}

module.exports = generateId