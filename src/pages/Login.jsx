import { useState } from 'react';
import Button from '@mui/material/Button';
import InputField from '../components/Login/InputField';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import axios from 'axios';
import '../App.css';
// import LoginDialog from '../components/LoginDialog';

export default function Login() {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleLogin = async () => {
		const username = document.querySelector('input[type="text"]').value;
		const password = document.querySelector('input[type="password"]').value;
		const doc = { username, password };

		try {
			if (!username || !password) {
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
			<InputField value="Korisnicko ime" />
			<InputField
				value="Lozinka"
				type="password"
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
