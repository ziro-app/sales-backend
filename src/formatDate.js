const translateMonth = month => {
	switch (month) {
		case 'Jan': return 'Jan'
		case 'Feb': return 'Fev'
		case 'Mar': return 'Mar'
		case 'Apr': return 'Abr'
		case 'May': return 'Mai'
		case 'Jun': return 'Jun'
		case 'Jul': return 'Jul'
		case 'Aug': return 'Ago'
		case 'Sep': return 'Set'
		case 'Oct': return 'Out'
		case 'Nov': return 'Nov'
		case 'Dec': return 'Dez'
	}
}

module.exports = date => {
	const dateStr = new Date(date).toString()
	return `${dateStr.substr(8,2)}/${translateMonth(dateStr.substr(4,3))}/${dateStr.substr(11,4)}`
}