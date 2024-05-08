import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AuthSnackbar from '../Snackbars/AuthSnackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeatureField from './FeatureField';

function SimpleDialog(props) {
	const { onClose, selectedValue, open, newEquipment } = props;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('forestGreen');

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
				return 'Broj kotača';
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
			<div className="items-center p-4">
				{/* Loop trough newEquipment.features and create a paragraph for each features whose value is true */}
				{Object.entries(newEquipment.features).map(([key, value]) => {
					if (value) {
						return (
							<FeatureField
								key={key}
								value={translateValue(key)}
								type="text"
							/>
						);
					}
				})}
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

export default function FeaturesDialog({ open, setOpen, newEquipment }) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<SimpleDialog
				open={open}
				onClose={handleClose}
				newEquipment={newEquipment}
			/>
		</>
	);
}
