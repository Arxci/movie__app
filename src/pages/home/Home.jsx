import React from 'react'
import HomePageBanner from '../../components/homePageBanner/HomePageBanner'
import HomePageFree from '../../components/homePageFree/HomePageFree'
import HomePagePopular from '../../components/homePagePopular/HomePagePopular'
import HomePageTrending from '../../components/homePageTrending/HomePageTrending'

const Home = () => {
	window.scrollTo(0, 0)

	return (
		<div className="home">
			<HomePageBanner />
			<HomePageTrending />
			<HomePagePopular />
			<HomePageFree />
		</div>
	)
}

export default Home
