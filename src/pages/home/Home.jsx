import React from 'react'
import HomePageBanner from '../../components/homePageBanner/HomePageBanner'
import HomePageTrending from '../../components/homePageTrending/HomePageTrending'

const Home = () => {
	return (
		<div className="home">
			<HomePageBanner />
			<HomePageTrending />
		</div>
	)
}

export default Home
