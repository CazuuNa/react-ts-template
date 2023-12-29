import React from 'react'
import logo from './logo.svg'
import './App.css'
import Layout from '@/components/layout'
import { BrowserRouter } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<React.Suspense fallback={<>正在加载……</>}>
					<Layout />
				</React.Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App
