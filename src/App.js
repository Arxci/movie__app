import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<div className="app__header">
					<Header />
				</div>

				<div className="app__pages">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
