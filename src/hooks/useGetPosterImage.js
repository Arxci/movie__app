export default function useGetPosterImage(movie, width) {
	if (movie) {
		if (movie.poster_path === null)
			return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
		return 'https://image.tmdb.org/t/p/w' + width + '/' + movie.poster_path
	}
	return ''
}
