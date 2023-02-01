export default function useConvertDate(card) {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	var inDate = ''

	if (card.release_date !== '' && card.release_date !== undefined) {
		inDate = card.release_date
	} else if (
		(card.first_air_date !== undefined) &
		(card.first_air_date !== '')
	) {
		inDate = card.first_air_date
	} else {
		return ''
	}

	const date = inDate.split('-')

	return monthNames[parseInt(date[1]) - 1] + ' ' + date[2] + ', ' + date[0]
}
