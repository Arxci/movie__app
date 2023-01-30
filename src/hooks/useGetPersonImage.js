export default function useGetPersonImage(person, width) {
	return 'https://image.tmdb.org/t/p/w' + width + '/' + person.profile_path
}
