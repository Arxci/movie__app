export default function useGetBackdropImage(movie, width) {
	if (movie) {
		return 'https://image.tmdb.org/t/p/w' + width + '/' + movie.backdrop_path
	}
}
