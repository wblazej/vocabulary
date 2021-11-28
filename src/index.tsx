import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Create from './pages/Create';
import Game from './pages/Game';

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route index element={<Home/>}/>
						<Route path='/create' element={<Create/>}/>
						<Route path='/game/:id' element={<Game/>}/>
					</Route>
				</Routes>
			</BrowserRouter>

			<Toaster
				position="bottom-left"
			/>
		</div>		
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
