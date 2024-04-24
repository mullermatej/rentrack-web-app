import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserSelect from './pages/UserSelect';
import Equipment from './pages/Equipment';
import EquipmentDetails from './pages/EquipmentDetails';
import Navigation from './components/Layout/Navigation';
import Test from './pages/Test';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/userSelect"
					element={<UserSelect />}
				/>
				<Route
					path="/equipment"
					element={<Equipment />}
				/>
				<Route
					path="/equipment/:adminId/:equipmentName"
					element={<EquipmentDetails />}
				/>
				<Route
					path="/test"
					element={<Test />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
