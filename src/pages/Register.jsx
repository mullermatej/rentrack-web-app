import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import InputField from '../components/Register/InputField';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import '../App.css';

export default function Register() {
	const [inputValues, setInputValues] = useState({});
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleClick = async () => {
		const username = inputValues['korisnicko ime'];
		const password = inputValues['lozinka'];
		try {
			const doc = { username, password };

			if (!username || !password) {
				setSnackbarMessage('Potrebno je unijeti korisničko ime i lozinku!');
				setSnackbarOpen(true);
				return;
			} else {
				const response = await axios.post('api/users', doc);
				console.log('Success, response is: ', response);
				setSnackbarMessage('Uspješno si se registrirao!');
				setSnackbarOpen(true);
			}
		} catch (error) {
			setSnackbarMessage('Greška kod registracije!');
			setSnackbarOpen(true);
			if (error.response) {
				console.error('Error:', error.response.data, error.response.status);
			} else {
				console.error('Error:', error.message);
			}
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
			<h1>This is a Register page</h1>
			{/* <InputField value="Ime vlasnika" />
			<InputField value="Prezime vlasnika" />
			<InputField value="Naziv obrta" />
			<InputField value="OIB broj obrta" />
			<InputField value="Adresa obrta" />
			<InputField
				value="Email"
				type="email"
			/> */}
			<InputField
				value="Korisnicko ime"
				inputValues={inputValues}
				setInputValues={setInputValues}
			/>
			<InputField
				value="Lozinka"
				type="password"
				inputValues={inputValues}
				setInputValues={setInputValues}
			/>
			{/* <InputField
				value="Potvrdi lozinku"
				type="password"
			/> */}

			<Button
				variant="outlined"
				onClick={handleClick}
			>
				Registriraj se
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
