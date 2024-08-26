import { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';
import Box from '@mui/material/Box';
import TextFieldLogin from '../components/Login/TextFieldLogin';
import PasswordField from '../components/Login/PasswordField';
import Logo from '../assets/LogoUpdated.png';
import '../App.css';

export default function Login() {
	const [userInfo, setUserInfo] = useState({ oib: '', password: '' });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');

	const navigateToRegister = () => {
		window.location.href = '/register';
	};

	const handleLogin = async () => {
		const doc = { oib: userInfo.oib, password: userInfo.password };
		console.log('doc', doc);

		try {
			if (userInfo.oib === '' || userInfo.password === '') {
				setBackgroundColor('fireBrick');
				setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
				setSnackbarOpen(true);
				return;
			} else {
				try {
					const response = await axios.post('api/auth', doc);
					const user = response.data;

					localStorage.setItem('user', JSON.stringify(user));

					setBackgroundColor('forestGreen');
					setSnackbarMessage('Prijava uspješna!');
					setSnackbarOpen(true);
					setTimeout(() => {
						window.location.href = '/userSelect';
					}, 1500);
				} catch (error) {
					console.error('Error:', error.message);
					setBackgroundColor('fireBrick');
					setSnackbarMessage('Greška! Pokušaj ponovno.');
					setSnackbarOpen(true);
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
				sx={{ backgroundColor: '#FFD460' }}
			>
				<img
					src={Logo}
					alt="Logo"
					className="h-20 mb-5 mx-auto"
				/>
				<TextFieldLogin
					label="* OIB obrta"
					setUserInfo={setUserInfo}
					field="oib"
				/>
				<PasswordField
					setUserInfo={setUserInfo}
					label="* Lozinka"
					field="password"
				/>
				<Box sx={{ '& > :not(style)': { width: '29ch' } }}>
					<Button
						variant="contained"
						onClick={handleLogin}
						style={{
							textTransform: 'none',
							fontSize: '17.5px',
							backgroundColor: '#EA5455',
							fontFamily: 'nunito',
							marginTop: '10px',
						}}
					>
						Prijavi se
					</Button>
				</Box>
				<p className="mt-2 text-sm font-nunito">
					Nemaš kreiran račun?{' '}
					<span
						className="text-light-red cursor-pointer font-bold"
						onClick={navigateToRegister}
					>
						Registriraj se
					</span>
				</p>
			</Paper>

			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				handleClose={handleClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</div>
	);
}
