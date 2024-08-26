import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AuthSnackbar from '../../Snackbars/AuthSnackbar';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog(props) {
	const { onClose, selectedValue, openCeaseConfirm, equipment, equipmentId } = props;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleStopRent = async () => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		const equipmentName = equipment.name;
		const doc = { availability: 'available', endTime: '/' };

		try {
			let response = await axios.patch(
				`${BASE_URL}/equipment/${businessId}/${equipmentName}/${equipmentId}`,
				doc
			);
			if (response.status === 200) {
				console.log('Status 200 stopped rent');
				setSnackbarMessage('Najam opreme uspješno zaustavljen.');
				setBackgroundColor('forestGreen');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.reload();
				}, 1200);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Dialog
				onClose={handleClose}
				open={openCeaseConfirm}
			>
				<div className="text-center px-10 py-4">
					<p className="font-nunito text-lg ">Zaustaviti najam opreme?</p>
				</div>
				<div className="px-10 pb-4 flex gap-5 justify-center">
					<Button
						variant="contained"
						style={{
							textTransform: 'none',
							fontSize: '14px',
							backgroundColor: '#2F7D31',
							color: 'white',
							fontFamily: 'nunito',
						}}
						onClick={handleStopRent}
					>
						Da
					</Button>
					<Button
						variant="contained"
						style={{
							textTransform: 'none',
							fontSize: '14px',
							fontFamily: 'nunito',
							backgroundColor: '#D3302F',
						}}
						onClick={handleClose}
					>
						Odustani
					</Button>
				</div>
			</Dialog>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				handleClose={handleSnackbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	openCeaseConfirm: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function CeaseConfirm({ openCeaseConfirm, setOpenCeaseConfirm, equipment, equipmentId }) {
	const [selectedValue, setSelectedValue] = useState('');

	const handleCloseCeaseConfirm = (value) => {
		setOpenCeaseConfirm(false);
		setSelectedValue(value);
	};

	return (
		<>
			<SimpleDialog
				selectedValue={selectedValue}
				openCeaseConfirm={openCeaseConfirm}
				onClose={handleCloseCeaseConfirm}
				equipment={equipment}
				equipmentId={equipmentId}
			/>
		</>
	);
}
