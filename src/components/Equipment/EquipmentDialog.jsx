import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EquipmentInputField from './EquipmentInputField';
import UserInputField from './UserInputField';
import HoursInputField from './HoursInputField';
import PricesInputField from './PricesInputField';
import AuthSnackbar from '../Snackbars/AuthSnackbar';

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('forestGreen');
	const [user, setUser] = useState({ username: '', password: '' });
	const [newEquipment, setNewEquipment] = useState({
		name: '',
		adminId: '',
		prices: {},
	});
	const [hours, setHours] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setUser({
				username: user.username,
				password: '',
			});
		}
		setNewEquipment((prevState) => ({
			...prevState,
			adminId: user.adminId,
		}));
	}, []);

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleAddPricing = () => {
		if (hours === 0 || price === 0) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
			setSnackbarOpen(true);
			return;
		} else {
			setNewEquipment((prevState) => ({
				...prevState,
				prices: {
					...prevState.prices,
					[hours]: parseInt(price),
				},
			}));
			console.log('Added pricing: ', hours, 'h = ', price, '€');
			setSnackbarMessage('Dodano: ' + hours + 'sati ' + price + '€');
			setSnackbarOpen(true);
			setHours(0);
			setPrice(0);
		}
	};

	const handleAddEquipment = async () => {
		console.log(newEquipment);
		if (newEquipment.name === '' || user.password === '') {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
			setSnackbarOpen(true);
		}
		try {
			const response = await axios.post('/api/auth/equipment', user);
			if (response.status === 200) {
				try {
					const response = await axios.post('/api/equipment', newEquipment);
					console.log(response);
					setSnackbarMessage('Uspješno dodana nova oprema!');
					setSnackbarOpen(true);
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				} catch (error) {
					console.error(error);
				}
			}
		} catch (error) {
			console.error(error);
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setSnackbarOpen(true);
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="text-center p-5">
				<EquipmentInputField
					value="* Naziv"
					field="name"
					setNewEquipment={setNewEquipment}
				/>
				<div className="flex justify-center">
					<HoursInputField
						value={hours}
						setHours={setHours}
					/>
					<PricesInputField
						value={price}
						setPrice={setPrice}
					/>
				</div>
				<Button
					size="small"
					variant="contained"
					onClick={handleAddPricing}
					style={{
						textTransform: 'none',
						fontSize: '14px',
						marginTop: '10px',
						marginBottom: '10px',
						backgroundColor: '#2463EB',
					}}
				>
					Dodaj u cjenik
				</Button>

				<UserInputField
					value="* Admin lozinka"
					field="password"
					setUser={setUser}
				/>
				<Button
					variant="contained"
					style={{
						textTransform: 'none',
						fontSize: '14px',
						marginTop: '10px',
						backgroundColor: '#2463EB',
					}}
					onClick={handleAddEquipment}
				>
					Kreiraj
				</Button>
			</div>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={4000}
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

export default function UserSelectDialog() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				size="small"
				variant="contained"
				onClick={handleClickOpen}
				style={{ textTransform: 'none', fontSize: '14px', backgroundColor: '#2463EB' }}
			>
				Dodaj novu opremu
			</Button>
			<SimpleDialog
				open={open}
				onClose={handleClose}
			/>
		</>
	);
}
