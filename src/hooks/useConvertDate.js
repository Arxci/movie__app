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

	if (card.release_date === undefined) {
		inDate = card.first_air_date
	} else {
		inDate = card.release_date
	}

	const date = inDate.split('-')

	return monthNames[parseInt(date[1]) - 1] + ' ' + date[2] + ', ' + date[0]
}
