import { useState } from 'react';
import Button from '@mui/material/Button';
import InputField from '../components/Login/InputField';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import axios from 'axios';
import '../App.css';

export default function Login() {
	const [userInfo, setUserInfo] = useState({ username: '', password: '' });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleLogin = async () => {
		const doc = { username: userInfo.username, password: userInfo.password };
		console.log('doc', doc);

		try {
			if (userInfo.username === '' || userInfo.password === '') {
				setSnackbarMessage('Potrebno je unijeti korisničko ime i lozinku!');
				setSnackbarOpen(true);
				return;
			} else {
				try {
					const response = await axios.post('api/auth', doc);
					const user = response.data;

					localStorage.setItem('user', JSON.stringify(user));

					setSnackbarMessage('Uspješno si se logirao!');
					setSnackbarOpen(true);
				} catch (error) {
					console.error('Error:', error.message);
					// Ako ne vidis snackbar kod greske, onda ga ovdje treba dodat
				}
			}
		} catch (error) {
			console.error('Error:', error.message);
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setSnackbarOpen(true);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<div id="auth-container">
			<h1>This is a Login page </h1>
			<InputField
				value="Korisnicko ime"
				setUserInfo={setUserInfo}
				field="username"
			/>
			<InputField
				value="Lozinka"
				type="password"
				setUserInfo={setUserInfo}
				field="password"
			/>

			<Button
				variant="outlined"
				onClick={handleLogin}
			>
				Ulogiraj se
			</Button>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				handleClose={handleClose}
				message={snackbarMessage}
			/>
		</div>
	);
}
