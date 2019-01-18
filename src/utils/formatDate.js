const format = require('date-fns/format')
const locale = require('date-fns/locale/pt')
const { formatToTimeZone } = require('date-fns-timezone')

exports.formatDate = date => format(new Date(date), 'DD/MMM/YYYY', { locale: locale })

exports.now = () => formatToTimeZone(new Date(), 'DD/MMM/YYYY HH:mm:ss', {
		locale: locale,
		timeZone: 'America/Sao_Paulo'
	})