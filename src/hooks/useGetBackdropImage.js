export default function useGetBackdropImage(movie, width) {
	if (movie) {
		const image =
			'https://image.tmdb.org/t/p/w' + width + '/' + movie.backdrop_path

		if (movie.backdrop_path === null)
			return 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
		return image
	}
	return ''
}
