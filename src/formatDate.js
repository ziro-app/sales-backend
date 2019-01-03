const format = require('date-fns/format')
const locale = require('date-fns/locale/pt')
const { formatToTimeZone } = require('date-fns-timezone')

exports.formatDate = date => format(new Date(date), 'DD/MMM/YYYY', { locale: locale })

exports.now = () => formatToTimeZone(new Date('2019-02-02T20:00:00.000Z'), 'DD/MMM/YYYY HH:mm:ss', {
		locale: locale,
		timeZone: 'America/Sao_Paulo'
	})