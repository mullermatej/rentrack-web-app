import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EquipmentInput from '../InputFields/EquipmentInput';
import PasswordInput from '../InputFields/PasswordInput';
import AuthSnackbar from '../../Snackbars/AuthSnackbar';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipmentName } = props;
	const [newEquipmentId, setNewEquipmentId] = useState('');
	const [adminPassword, setAdminPassword] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleAddEquipment = async () => {
		const username = JSON.parse(localStorage.getItem('user')).username;
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		const doc = {
			id: parseInt(newEquipmentId),
			availability: 'available',
			endTime: '/',
			profitDay: '0',
			profitMonth: '0',
			history: [],
		};
		const user = {
			username,
			password: adminPassword,
		};

		if (newEquipmentId === '' || adminPassword === '') {
			setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
			setSnackbarOpen(true);
		}

		try {
			const authenticate = await axios.post('/api/auth/equipment', user);
			if (authenticate.status === 200) {
				try {
					const response = await axios.post(`${baseUrl}/equipment/${adminId}/${equipmentName}`, doc);
					console.log(response);
					setBackgroundColor('forestGreen');
					setSnackbarMessage('Oprema uspješno dodana.');
					setSnackbarOpen(true);
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} catch (error) {
					console.error(error);
				}
			}
		} catch (error) {
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setSnackbarOpen(true);
			console.error(error);
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="text-center p-4">
				<EquipmentInput
					value="* ID opreme"
					setNewEquipmentId={setNewEquipmentId}
				/>
				<PasswordInput
					value="* Admin lozinka"
					setAdminPassword={setAdminPassword}
					type="password"
				/>
				<Button
					variant="contained"
					onClick={handleAddEquipment}
					style={{
						backgroundColor: '#2463EB',
						color: 'white',
						fontFamily: 'nunito',
						width: '30ch',
						marginTop: '10px',
						textTransform: 'none',
					}}
				>
					Dodaj
				</Button>
			</div>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={3000}
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
	selectedValue: PropTypes.string.isRequired,
};

export default function NewEquipment({ equipmentName }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button
				size="small"
				variant="contained"
				onClick={handleClickOpen}
				style={{ textTransform: 'none', fontSize: '14px', backgroundColor: '#2463EB', fontFamily: 'nunito' }}
			>
				Novo
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipmentName={equipmentName}
			/>
		</>
	);
}
