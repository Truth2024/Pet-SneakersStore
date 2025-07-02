
import { Drawer } from "./components/Drawer/Drawer";
import { Header } from "./components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/HomePage';
import { Favorite } from './pages/FavoritePage';
import { CartPage } from './pages/CartPage';


function App() {


	return (
		<div className="wrapper clear">
			<Drawer />
			<Header />
			
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favorite" element={<Favorite />} />
				<Route path="/profile" element={<CartPage />} />
			</Routes>
		</div >
	);
}

export default App;