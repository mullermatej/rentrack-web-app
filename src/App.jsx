import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserSelect from './pages/UserSelect';
import Equipment from './pages/Equipment';
import EquipmentDetails from './pages/EquipmentDetails';
import Navigation from './components/Layout/Navigation';
import Admin from './pages/Admin';
import './App.css';

function App() {
	const user = JSON.parse(localStorage.getItem('user'));
	const profile = JSON.parse(localStorage.getItem('profile'));

	const isLoggedIn = () => {
		return user !== null;
	};

	const profileExists = () => {
		return profile !== null;
	};

	return (
		<BrowserRouter>
			{isLoggedIn() && <Navigation />}
			<Routes>
				<Route
					path="/register"
					element={isLoggedIn() ? <Navigate to="/userSelect" /> : <Register />}
				/>
				<Route
					path="/login"
					element={isLoggedIn() ? <Navigate to="/userSelect" /> : <Login />}
				/>
				<Route
					path="/userSelect"
					element={isLoggedIn() ? <UserSelect /> : <Navigate to="/login" />}
				/>
				<Route
					path="/equipment"
					element={isLoggedIn() && profileExists() ? <Equipment /> : <Navigate to="/userSelect" />}
				/>
				<Route
					path="/equipment/:adminId/:equipmentName"
					element={isLoggedIn() && profileExists() ? <EquipmentDetails /> : <Navigate to="/userSelect" />}
				/>
				<Route
					path="/admin"
					element={isLoggedIn() ? <Admin /> : <Navigate to="/login" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
