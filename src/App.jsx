// import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserSelect from './pages/UserSelect';
import Equipment from './pages/Equipment';
import EquipmentDetails from './pages/EquipmentDetails';
import Navigation from './components/Layout/Navigation';
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
					path="/oprema"
					element={<Equipment />}
				/>
				<Route
					path="/oprema/:adminId/:equipmentName"
					element={<EquipmentDetails />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
