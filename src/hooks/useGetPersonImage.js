export default function useGetPersonImage(person, width) {
	if (person) {
		if (person.profile_path === null) {
			return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
		}
		return 'https://image.tmdb.org/t/p/w' + width + '/' + person.profile_path
	}
	return ''
}
