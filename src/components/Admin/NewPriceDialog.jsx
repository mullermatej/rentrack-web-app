import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import NewPriceInput from './NewPriceInput';
import AuthSnackbar from '../Snackbars/AuthSnackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog(props) {
	const { onClose, selectedValue, open, singleEquipmentName } = props;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');
	const [priceInfo, setPriceInfo] = useState({
		hours: '',
		price: 0,
	});

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleAddNewPrice = async () => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		priceInfo.price = parseInt(priceInfo.price);

		if (priceInfo.hours < 1 || priceInfo.hours > 24 || priceInfo.price < 1 || priceInfo.price > 5000) {
			setSnackbarMessage('Greška! Provjeri unesene vrijednosti.');
			setSnackbarOpen(true);
			return;
		}

		try {
			const response = await axios.post(`${BASE_URL}/equipment/${businessId}/${singleEquipmentName}/prices`, {
				hours: priceInfo.hours,
				price: priceInfo.price,
			});
			console.log(response);
			setBackgroundColor('forestGreen');
			setSnackbarMessage('Uspješno dodano.');
			setSnackbarOpen(true);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			setSnackbarMessage('Greška. Pokušaj ponovno.');
			setSnackbarOpen(true);
			console.error(error);
		}
	};

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="pt-2 px-2 bg-main-yellow">
				<ArrowBackIcon
					onClick={handleClose}
					sx={{ cursor: 'pointer' }}
				/>
			</div>
			<div className="text-center py-4 px-6 bg-main-yellow">
				<NewPriceInput
					setPriceInfo={setPriceInfo}
					label="* Sati"
				/>
				<NewPriceInput
					setPriceInfo={setPriceInfo}
					label="* Cijena"
				/>
				<div className="mt-4">
					<Button
						size="small"
						onClick={handleAddNewPrice}
						style={{
							fontFamily: 'nunito',
							backgroundColor: '#EA5455',
							fontSize: '14px',
							textTransform: 'none',
							width: '13ch',
							color: 'white',
						}}
					>
						Spremi
					</Button>
				</div>
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
	selectedValue: PropTypes.string.isRequired,
};

export default function Pricing({ singleEquipmentName }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = async () => {
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
				onClick={handleClickOpen}
				style={{
					fontFamily: 'nunito',
					fontSize: '14px',
					backgroundColor: '#EA5455',
					textTransform: 'none',
					width: '15ch',
					marginTop: '10px',
					color: 'white',
				}}
			>
				Kreiraj
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				singleEquipmentName={singleEquipmentName}
			/>
		</>
	);
}
