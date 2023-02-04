import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import React, { lazy, Suspense } from 'react'
import Footer from './components/footer/Footer'

const Home = lazy(() => import('./pages/home/Home'))
const PopularPeople = lazy(() => import('./pages/popularPeople/PopularPeople'))
const Search = lazy(() => import('./pages/search/Search'))
const Movie = lazy(() => import('./pages/movie/Movie'))
const Person = lazy(() => import('./pages/person/Person'))
const Discover = lazy(() => import('./pages/discover/Discover'))

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<div className="app__header">
					<Header />
				</div>

				<div className="app__pages">
					<Suspense>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/person" element={<PopularPeople />} />
							<Route
								path="/search/movies"
								element={
									<Search
										title={'Movies'}
										endpoint="//api.themoviedb.org/3/discover/movie?api_key="
										languageId={[
											{
												key: 0,
												id: '',
												name: 'None Selected',
											},
											{
												key: 1,
												id: 'en',
												name: 'English',
											},
											{
												key: 2,
												id: 'fr',
												name: 'French',
											},
											{
												key: 3,
												id: 'de',
												name: 'German',
											},
											{
												key: 4,
												id: 'es',
												name: 'Spanish',
											},
											{
												key: 5,
												id: 'ja',
												name: 'Japanese',
											},
											{
												key: 6,
												id: 'pt',
												name: 'Portuguese',
											},
										]}
										genreId={[
											{
												key: 0,
												id: '',
												name: 'None Selected',
											},
											{
												key: 1,
												id: 28,
												name: 'Action',
											},
											{
												key: 2,
												id: 12,
												name: 'Adventure',
											},
											{
												key: 3,
												id: 35,
												name: 'Comedy',
											},
											{
												key: 4,
												id: 27,
												name: 'Horror',
											},
											{
												key: 5,
												id: 53,
												name: 'Thriller',
											},
											{
												key: 6,
												id: 18,
												name: 'Drama',
											},
											{
												key: 7,
												id: 99,
												name: 'Documentary',
											},
											{
												key: 8,
												id: 14,
												name: 'Fantasy',
											},
										]}
										popularityID={[
											{
												key: 0,
												id: 'popularity.desc',
												name: 'Popularity Descending',
											},
											{
												key: 1,
												id: 'popularity.asc',
												name: 'Popularity Ascending',
											},
											{
												key: 2,
												id: 'vote_average.desc',
												name: 'Rating Descending',
											},
											{
												key: 3,
												id: 'vote_average.asc',
												name: 'Rating Ascending',
											},
											{
												key: 4,
												id: 'first_air_date.desc',
												name: 'Release Date Descending',
											},
											{
												key: 5,
												id: 'first_air_date.asc',
												name: 'Release Date Ascending',
											},
										]}
									/>
								}
							/>
							<Route
								path="/search/tv"
								element={
									<Search
										title={'TV Shows'}
										languageId={[
											{
												key: 0,
												id: '',
												name: 'None Selected',
											},
											{
												key: 1,
												id: 'en',
												name: 'English',
											},
											{
												key: 2,
												id: 'fr',
												name: 'French',
											},
											{
												key: 3,
												id: 'de',
												name: 'German',
											},
											{
												key: 4,
												id: 'es',
												name: 'Spanish',
											},
											{
												key: 5,
												id: 'ja',
												name: 'Japanese',
											},
											{
												key: 6,
												id: 'pt',
												name: 'Portuguese',
											},
										]}
										genreId={[
											{
												key: 0,
												id: '',
												name: 'None Selected',
											},
											{
												key: 1,
												id: 10759,
												name: 'Action',
											},
											{
												key: 2,
												id: 35,
												name: 'Comedy',
											},
											{
												key: 3,
												id: 18,
												name: 'Drama',
											},
											{
												key: 4,
												id: 99,
												name: 'Documentary',
											},
											{
												key: 5,
												id: 10765,
												name: 'Fantasy',
											},
											{
												key: 6,
												id: 10764,
												name: 'Reality',
											},
											{
												key: 7,
												id: 10762,
												name: 'Kids',
											},
										]}
										popularityID={[
											{
												key: 0,
												id: 'popularity.desc',
												name: 'Popularity Descending',
											},
											{
												key: 1,
												id: 'popularity.asc',
												name: 'Popularity Ascending',
											},
											{
												key: 2,
												id: 'vote_average.desc',
												name: 'Rating Descending',
											},
											{
												key: 3,
												id: 'vote_average.asc',
												name: 'Rating Ascending',
											},
											{
												key: 4,
												id: 'first_air_date.desc',
												name: 'Release Date Descending',
											},
											{
												key: 5,
												id: 'first_air_date.asc',
												name: 'Release Date Ascending',
											},
										]}
										endpoint="https://api.themoviedb.org/3/discover/tv?api_key="
									/>
								}
							/>
							<Route path="/movie">
								<Route
									path=":id"
									element={
										<Movie
											cardEndpoint={[
												'//api.themoviedb.org/3/movie/',
												'?api_key=',
											]}
											releaseDateEndpoint={[
												'//api.themoviedb.org/3/movie/',
												'/release_dates?api_key=',
											]}
											castEndpoint={[
												'//api.themoviedb.org/3/movie/',
												'/credits?api_key=',
											]}
										/>
									}
								/>
							</Route>
							<Route path="/tv">
								<Route
									path=":id"
									element={
										<Movie
											cardEndpoint={['//api.themoviedb.org/3/tv/', '?api_key=']}
											releaseDateEndpoint={[
												'//api.themoviedb.org/3/tv/',
												'/content_ratings?api_key=',
											]}
											castEndpoint={[
												'//api.themoviedb.org/3/tv/',
												'/aggregate_credits?api_key=',
											]}
										/>
									}
								/>
							</Route>
							<Route path="/person">
								<Route path=":id" element={<Person />} />
							</Route>
							<Route path="/discover">
								<Route path=":search" element={<Discover />} />
							</Route>
						</Routes>
					</Suspense>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
