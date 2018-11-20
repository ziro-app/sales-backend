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

const numberToName = month => {
	switch (month) {
		case '01': return 'Jan'
		case '02': return 'Fev'
		case '03': return 'Mar'
		case '04': return 'Abr'
		case '05': return 'Mai'
		case '06': return 'Jun'
		case '07': return 'Jul'
		case '08': return 'Ago'
		case '09': return 'Set'
		case '10': return 'Out'
		case '11': return 'Nov'
		case '12': return 'Dez'
	}
}

exports.formatDate = date => {
	const dateStr = new Date(date).toString()
	return `${dateStr.substr(8,2)}/${translateMonth(dateStr.substr(4,3))}/${dateStr.substr(11,4)}`
}

exports.formatNow = () => {
	const now = new Date().toLocaleString('pt-br', { timeZone: 'America/Sao_Paulo' })
	return `${now.substr(0,3)}${numberToName(now.substr(3,3))}${now.substr(5,14)}`
}