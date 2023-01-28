export default function useGetPosterImage(movie, width) {
	if (movie) {
		return 'https://image.tmdb.org/t/p/w' + width + '/' + movie.poster_path
	}
}
