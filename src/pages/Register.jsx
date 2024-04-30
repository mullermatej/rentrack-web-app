import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import '../App.css';

import TextFieldRegister from '../components/Register/TextFieldRegister';

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
		<div className="flex items-center justify-center h-screen">
			<Paper
				elevation={3}
				className="p-10"
			>
				<p className="text-5xl mb-5">Registracija</p>
				<TextFieldRegister label="* Ime" />
				<TextFieldRegister label="* Prezime" />
				<TextFieldRegister label="* Email" />
				<TextFieldRegister label="* Lozinka" />
				<Box sx={{ '& > :not(style)': { width: '30ch' } }}>
					<Button
						variant="contained"
						onClick={handleClick}
						style={{ textTransform: 'none', fontSize: '17.5px' }}
					>
						Registriraj se
					</Button>
				</Box>
				<p className="mt-2 text-sm">Već imaš račun? Prijavi se</p>
			</Paper>
			{/* <InputField
				value="Korisnicko ime"
				inputValues={inputValues}
				setInputValues={setInputValues}
			/>
			<InputField
				value="Lozinka"
				type="password"
				inputValues={inputValues}
				setInputValues={setInputValues}
			/> */}

			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				handleClose={handleClose}
				message={snackbarMessage}
			/>
		</div>
	);
}
