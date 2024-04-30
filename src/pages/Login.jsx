import { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import Box from '@mui/material/Box';
import TextFieldLogin from '../components/Login/TextFieldLogin';
import '../App.css';

export default function Login() {
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');

	const navigateToRegister = () => {
		window.location.href = '/register';
	};

	const handleLogin = async () => {
		const doc = { email: userInfo.email, password: userInfo.password };
		console.log('doc', doc);

		try {
			if (userInfo.email === '' || userInfo.password === '') {
				setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
				setSnackbarOpen(true);
				return;
			} else {
				try {
					const response = await axios.post('api/auth', doc);
					const user = response.data;

					localStorage.setItem('user', JSON.stringify(user));

					setBackgroundColor('forestGreen');
					setSnackbarMessage('Uspješno si se logirao!');
					setSnackbarOpen(true);
					// use setTimeout to redirect to another page
					setTimeout(() => {
						window.location.href = '/userSelect';
					}, 1500);
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
		<div className="flex items-center justify-center h-screen">
			<Paper
				elevation={3}
				className="p-10"
			>
				<p className="text-4xl mb-5">Prijava </p>
				<TextFieldLogin
					label="* Email"
					setUserInfo={setUserInfo}
					field="email"
				/>
				<TextFieldLogin
					error={false}
					label="* Lozinka"
					type="password"
					setUserInfo={setUserInfo}
					field="password"
				/>
				<Box sx={{ '& > :not(style)': { width: '30ch' } }}>
					<Button
						variant="contained"
						onClick={handleLogin}
						style={{ textTransform: 'none', fontSize: '17.5px', backgroundColor: '#2463EB' }}
					>
						Prijavi se
					</Button>
				</Box>
				<p className="mt-2 text-sm">
					Nemaš kreiran račun?{' '}
					<span
						className="text-main-blue font-semibold cursor-pointer"
						onClick={navigateToRegister}
					>
						Registriraj se
					</span>
				</p>
			</Paper>

			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				handleClose={handleClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</div>
	);
}
