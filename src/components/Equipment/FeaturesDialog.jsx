import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AuthSnackbar from '../Snackbars/AuthSnackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeatureField from './FeatureField';

function SimpleDialog(props) {
	const { onClose, selectedValue, open, newEquipment, setNewEquipment } = props;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('forestGreen');

	const handleAddEquipment = async () => {
		try {
			const response = await axios.post('/api/equipment', newEquipment);
			console.log(response);
			setSnackbarMessage('Uspješno dodana nova oprema!');
			setSnackbarOpen(true);
			setTimeout(() => {
				window.location.reload();
			}, 1200);
		} catch (error) {
			console.error(error);
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setSnackbarOpen(true);
		}
	};

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const translateValue = (value) => {
		switch (value) {
			case 'color':
				return 'Boja';
			case 'dimensions':
				return 'Dimenzije';
			case 'material':
				return 'Materijal';
			case 'horsepower':
				return 'Konjske snage';
			case 'license':
				return 'Potrebna dozvola';
			case 'wheels':
				return 'Kotačići';
			case 'weight':
				return 'Težina';
			case 'maximumPeople':
				return 'Maksimalan broj osoba';
			default:
				return '';
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="pt-2 px-2">
				<ArrowBackIcon
					onClick={handleClose}
					sx={{ cursor: 'pointer' }}
				/>
			</div>
			<div className="items-center text-center p-4">
				{/* Loop trough newEquipment.features and create a paragraph for each features whose value is true */}
				{Object.entries(newEquipment.features).map(([key, value]) => {
					if (value) {
						return (
							<FeatureField
								key={key}
								value={translateValue(key)}
								type="text"
								setNewEquipment={setNewEquipment}
								field={key}
							/>
						);
					}
				})}
				<Button
					variant="contained"
					style={{
						textTransform: 'none',
						fontSize: '14px',
						marginTop: '10px',
						backgroundColor: '#2463EB',
						width: '32ch',
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

export default function FeaturesDialog({ open, setOpen, newEquipment, setNewEquipment }) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<SimpleDialog
				open={open}
				onClose={handleClose}
				newEquipment={newEquipment}
				setNewEquipment={setNewEquipment}
			/>
		</>
	);
}
