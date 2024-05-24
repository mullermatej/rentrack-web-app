import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import InputField from './InputField';
import Box from '@mui/material/Box';
import AuthSnackbar from '../../Snackbars/AuthSnackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog({ onClose, open }) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');
	const [newUser, setNewUser] = useState({
		name: '',
		surname: '',
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
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		const doc = {
			businessId,
			name: newUser.name,
			surname: newUser.surname,
		};

		if (newUser.name === '' || newUser.surname === '') {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Polja sa * su obavezna.');
			setSnackbarOpen(true);
			return;
		}
		try {
			const response = await axios.post(`${BASE_URL}/users/${businessId}/profiles`, doc);
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
			<div className="py-2 px-2">
				<ArrowBackIcon
					onClick={handleClose}
					sx={{ cursor: 'pointer' }}
				/>
			</div>
			<div className="flex-column text-center justify-center items-center px-5 pb-5">
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
							fontFamily: 'nunito',
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
