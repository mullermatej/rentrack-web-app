import { useState } from 'react';
import Button from '@mui/material/Button';
import InputField from '../components/Login/InputField';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
// import LoginDialog from '../components/LoginDialog';

export default function Login() {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleLogin = () => {
		const username = document.querySelector('input[type="text"]').value;
		const password = document.querySelector('input[type="password"]').value;

		try {
			if (!username || !password) {
				setSnackbarMessage('Potrebno je unijeti korisničko ime i lozinku!');
				setSnackbarOpen(true);
				console.log('Error: Username and password are required!');
				return;
			} else {
				setSnackbarMessage('Uspješno si se registrirao!');
				setSnackbarOpen(true);
				console.log('Success: Username and password entered!');
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
		<>
			<h1>This is a Login page</h1>
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
		</>
	);
}
