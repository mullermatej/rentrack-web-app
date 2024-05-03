import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import NewPriceInput from './NewPriceInput';
import AuthSnackbar from '../Snackbars/AuthSnackbar';

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
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		priceInfo.price = parseInt(priceInfo.price);

		try {
			const response = await axios.post(`${BASE_URL}/equipment/${adminId}/${singleEquipmentName}/prices`, {
				hours: priceInfo.hours,
				price: priceInfo.price,
			});
			console.log(response);
			setBackgroundColor('forestGreen');
			setSnackbarMessage('Uspješno dodano.');
			setSnackbarOpen(true);
			setTimeout(() => {
				onClose(selectedValue);
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
			<div className="text-center m-4 p-4">
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
						variant="contained"
						size="small"
						onClick={handleAddNewPrice}
						sx={{
							fontFamily: 'nunito',
							backgroundColor: '#2463EB',
							fontSize: '14px',
							textTransform: 'none',
							width: '13ch',
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
				variant="contained"
				onClick={handleClickOpen}
				sx={{
					fontFamily: 'nunito',
					fontSize: '14px',
					backgroundColor: '#2463EB',
					textTransform: 'none',
					width: '15ch',
					marginTop: '10px',
				}}
			>
				Novo
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
