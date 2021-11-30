import './styles/index.scss';
import { Toaster } from 'react-hot-toast';
import './styles/themeSwitch.scss';
import Home from './pages/Home';
import Create from './pages/Create';
import Game from './pages/Game';
import useLocalStorage from 'react-use-localstorage';
import Share from './pages/Share';

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';

const App = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')

    document.querySelector('html')?.setAttribute("data-theme", theme)

    return (
        <div className="app">
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route index element={<Home/>}/>
						<Route path='/create' element={<Create/>}/>
						<Route path='/share/:game' element={<Share/>}/>
						<Route path='/game/:id' element={<Game/>}/>
						<Route path='/edit/:id' element={<Edit/>}/>
						<Route path="*" element={<NotFound/>}/>
					</Route>
				</Routes>
			</BrowserRouter>

			<Toaster
				position="bottom-left"
			/>

			<div className="theme-switch-container">
                <p>Dark theme</p>
			    <div className="toggle-radio">
                    <input type="radio" name="rdo" id="yes" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                    <input type="radio" name="rdo" id="no" checked={theme === 'light'} onChange={() => setTheme('light')} />
                    <div className="switch">
                        <label htmlFor="yes">Yes</label>
                        <label htmlFor="no">No</label>
                        <span></span>
                    </div>
				</div>
			</div>
		</div>
    )
}

export default App;
