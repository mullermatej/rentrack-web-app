// import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserSelect from './pages/UserSelect';
import Equipment from './pages/Equipment';
import './App.css';

function App() {
	// const [backendData, setBackendData] = useState([{}]);

	// useEffect(() => {
	// 	fetch('/api')
	// 		.then((response) => response.json())
	// 		.then((data) => setBackendData(data))
	// 		.catch((err) => console.log(err));
	// }, []);

	return (
		<BrowserRouter>
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
			</Routes>
			{/* <div>
				{typeof backendData.users === 'undefined' ? (
					<p>Loading...</p>
				) : (
					backendData.users.map((user, i) => <p key={i}>{user}</p>)
				)}
			</div> */}
		</BrowserRouter>
	);
}

export default App;
