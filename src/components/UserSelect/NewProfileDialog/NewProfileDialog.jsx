import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import InputField from './InputField';
import Box from '@mui/material/Box';
import PasswordField from '../../Login/PasswordField';
import AuthSnackbar from '../../Snackbars/AuthSnackbar';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog({ onClose, open }) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');
	const [newUser, setNewUser] = useState({
		name: '',
		surname: '',
		password: '',
		repeatPassword: '',
	});

	const handleClose = () => {
		onClose();
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleCreateUser = async () => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		const doc = {
			adminId,
			name: newUser.name,
			surname: newUser.surname,
			password: newUser.password,
		};

		if (newUser.name === '' || newUser.surname === '') {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Polja sa * su obavezna.');
			setSnackbarOpen(true);
			return;
		} else if (newUser.password.length < 6) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Lozinka mora imati najmanje 6 znakova.');
			setSnackbarOpen(true);
			return;
		} else if (newUser.password !== newUser.repeatPassword) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Lozinke se ne podudaraju.');
			setSnackbarOpen(true);
			return;
		}
		try {
			const response = await axios.post(`${BASE_URL}/users/${adminId}/profiles`, doc);
			console.log('Success, response is: ', response);
			setBackgroundColor('forestGreen');
			setSnackbarMessage('Uspješno si napravio profil!');
			setSnackbarOpen(true);
			setTimeout(() => {
				window.location.href = '/userSelect';
			}, 1500);
		} catch (error) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setSnackbarOpen(true);
			console.error('Error:', error.message);
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="flex-column text-center pt-8 justify-center items-center p-10">
				<InputField
					value="* Ime"
					setNewUser={setNewUser}
					field="name"
				/>
				<InputField
					value="* Prezime"
					setNewUser={setNewUser}
					field="surname"
				/>
				<PasswordField
					label="* Lozinka"
					setUserInfo={setNewUser}
					field="password"
					widthRecieve="25ch"
				/>
				<PasswordField
					label="* Ponovi lozinku"
					setUserInfo={setNewUser}
					field="repeatPassword"
					widthRecieve="25ch"
				/>
				<Box
					sx={{
						'& > :not(style)': {
							m: 1,
							width: '25ch',
						},
					}}
				>
					<Button
						variant="contained"
						style={{
							textTransform: 'none',
							fontSize: '17.5px',
							backgroundColor: '#2463EB',
						}}
						onClick={handleCreateUser}
					>
						Kreiraj
					</Button>
				</Box>
			</div>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				handleClose={handleSnackbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default function NewProfileDialog({ open, handleClose }) {
	return (
		<SimpleDialog
			open={open}
			onClose={handleClose}
		/>
	);
}
