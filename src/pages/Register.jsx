import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import Paper from '@mui/material/Paper';
import PasswordField from '../components/Login/PasswordField';
import Logo from '../assets/LogoCropped.jpeg';
import '../App.css';

import TextFieldRegister from '../components/Register/TextFieldRegister';

export default function Register() {
	const [userInfo, setUserInfo] = useState({
		name: '',
		oib: '',
		password: '',
	});
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	const navigateToLogin = () => {
		window.location.href = '/login';
	};

	const handleClick = async () => {
		try {
			if (!userInfo.name || !userInfo.oib || !userInfo.password) {
				setBackgroundColor('fireBrick');
				setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
				setSnackbarOpen(true);
				return;
			} else {
				const response = await axios.post('api/users', userInfo);
				console.log('Success, response is: ', response);
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Registracija uspješna!');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.href = '/login';
				}, 1500);
			}
		} catch (error) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Došlo je do greške kod registracije!');
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
				<img
					src={Logo}
					alt="Logo"
					className="h-20 mx-auto mb-5"
				/>
				<p className="text-3xl mb-5 font-nunito">Registracija</p>
				<TextFieldRegister
					label="* Naziv obrta"
					field="name"
					setUserInfo={setUserInfo}
				/>
				<TextFieldRegister
					label="* OIB obrta"
					field="oib"
					setUserInfo={setUserInfo}
				/>
				<PasswordField
					label="* Lozinka"
					setUserInfo={setUserInfo}
					field="password"
				/>
				<Box sx={{ '& > :not(style)': { width: '30ch' } }}>
					<Button
						variant="contained"
						onClick={handleClick}
						style={{
							textTransform: 'none',
							fontSize: '17.5px',
							backgroundColor: '#2463EB',
							fontFamily: 'nunito',
						}}
					>
						Registriraj se
					</Button>
				</Box>
				<p className="mt-2 text-sm font-nunito">
					Već imaš račun?{' '}
					<span
						className="text-main-blue font-semibold cursor-pointer"
						onClick={navigateToLogin}
					>
						Prijavi se
					</span>
				</p>
			</Paper>

			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				handleClose={handleClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</div>
	);
}
