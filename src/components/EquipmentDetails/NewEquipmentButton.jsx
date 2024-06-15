import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EquipmentInput from './InputFields/EquipmentInput';
import AuthSnackbar from '../Snackbars/AuthSnackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipmentName } = props;
	const [newEquipmentId, setNewEquipmentId] = useState('');
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
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		const doc = {
			id: parseInt(newEquipmentId),
			availability: 'available',
			endTime: '/',
			profitDay: '0',
			profitMonth: '0',
			history: [],
		};

		if (newEquipmentId === '') {
			setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
			setSnackbarOpen(true);
		}
		try {
			const response = await axios.get(`${baseUrl}/equipment/${businessId}/${equipmentName}`);
			const addedEquipment = response.data[0].addedEquipment;
			for (const equipment of addedEquipment) {
				if (equipment.id === parseInt(newEquipmentId)) {
					throw new Error('Equipment already exists');
				}
			}
			try {
				const response = await axios.post(`${baseUrl}/equipment/${businessId}/${equipmentName}`, doc);
				console.log(response);
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Oprema uspješno dodana.');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.reload();
				}, 1200);
			} catch (error) {
				console.error(error);
			}
		} catch (error) {
			console.error(error);
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! ID opreme već postoji.');
			setSnackbarOpen(true);
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
			<div className="text-center px-4 pb-4">
				<EquipmentInput
					value="* ID opreme"
					setNewEquipmentId={setNewEquipmentId}
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

export default function NewEquipmentButton({ equipmentName }) {
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
				size="large"
				variant="contained"
				onClick={handleClickOpen}
				style={{
					textTransform: 'none',
					fontSize: '16px',
					backgroundColor: '#2463EB',
					fontFamily: 'nunito',
					marginTop: '10px',
				}}
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
