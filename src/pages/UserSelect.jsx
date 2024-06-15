import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dropdown from '../components/UserSelect/Dropdown';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import NewProfileDialog from '../components/UserSelect/NewProfileDialog/NewProfileDialog';
import AuthSnackbar from '../components/Snackbars/AuthSnackbar';

export default function UserSelect() {
	const [open, setOpen] = useState(false);
	const [profile, setProfile] = useState({ businessId: '', name: '', surname: '' });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleProfileLogin = async () => {
		try {
			console.log(profile);
			const response = await axios.post('/api/authProfile', profile);
			if (response.status === 200) {
				localStorage.setItem('profile', JSON.stringify(response.data));
				console.log('Logged in!');
				setSnackbarMessage('Uspješna prijava u profil!');
				setBackgroundColor('forestGreen');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.href = '/equipment';
				}, 1500);
			} else {
				console.log('Unable to log in!');
				setSnackbarMessage('Greška! Pokušaj ponovno.');
				setBackgroundColor('fireBrick');
				setSnackbarOpen(true);
			}
		} catch (error) {
			console.error(error);
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setBackgroundColor('fireBrick');
			setSnackbarOpen(true);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<Paper
				elevation={3}
				className="p-10"
			>
				<p className="text-3xl font-nunito">Odaberi svoj profil </p>
				<p className="text-sm mb-5 font-nunito">Preporučuje se da svaki djelatnik ima svoj profil</p>
				<Dropdown setProfile={setProfile} />
				<Box sx={{ '& > :not(style)': { width: '30ch' } }}>
					<Button
						variant="contained"
						onClick={handleProfileLogin}
						style={{
							textTransform: 'none',
							fontSize: '17.5px',
							backgroundColor: '#2463EB',
							fontFamily: 'nunito',
						}}
					>
						Prijavi se u profil
					</Button>
				</Box>
				<p className="mt-2 text-sm font-nunito">
					Ne vidiš se na popisu?{' '}
					<span
						className="text-main-blue font-semibold"
						style={{ cursor: 'pointer' }}
						onClick={handleClickOpen}
					>
						Napravi novi profil
					</span>
				</p>
				<NewProfileDialog
					open={open}
					handleClickOpen={handleClickOpen}
					handleClose={handleClose}
				/>
			</Paper>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				handleClose={handleSnackbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</div>
	);
}
