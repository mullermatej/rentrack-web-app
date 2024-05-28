import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EquipmentInputField from './EquipmentInputField';
import HoursInputField from './HoursInputField';
import PricesInputField from './PricesInputField';
import AuthSnackbar from '../Snackbars/AuthSnackbar';
import CheckList from './CheckList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeaturesDialog from './FeaturesDialog';

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;
	const [featureDialogOpen, setFeatureDialogOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('forestGreen');
	const [newEquipment, setNewEquipment] = useState({
		name: '',
		businessId: '',
		prices: {},
		features: {
			color: false,
			dimensions: false,
			material: false,
			horsepower: false,
			license: false,
			wheels: false,
			weight: false,
			maximumPeople: false,
		},
	});
	const [hours, setHours] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		setNewEquipment((prevState) => ({
			...prevState,
			businessId: user.businessId,
		}));
	}, []);

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleFeatureDialogOpen = () => {
		setFeatureDialogOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const pricesIsEmpty = (prices) => {
		return Object.keys(prices).length === 0;
	};

	const checkSelectedFeatures = () => {
		for (const [, value] of Object.entries(newEquipment.features)) {
			if (value === true) {
				return true;
			}
		}
		return false;
	};

	const handleAddPricing = () => {
		if (hours < 1 || hours > 24 || price < 1 || price > 3000) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Provjeri unesene informacije.');
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
			setSnackbarMessage('Dodano: ' + hours + 'sati ' + price + '€');
			setSnackbarOpen(true);
			setHours(0);
			setPrice(0);
		}
	};

	const handleAddEquipment = async () => {
		if (newEquipment.name === '' || pricesIsEmpty(newEquipment.prices) === true) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Polja označena sa * su obavezna.');
			setSnackbarOpen(true);
			return;
		}
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
			<div className="text-center px-5 pb-5">
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
				<CheckList setNewEquipment={setNewEquipment} />
				{checkSelectedFeatures() === false ? (
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
				) : (
					<Button
						variant="outlined"
						style={{
							textTransform: 'none',
							fontSize: '14px',
							marginTop: '10px',
							width: '32ch',
							color: '#2463EB',
						}}
						onClick={handleFeatureDialogOpen}
					>
						Ispuni obilježja
					</Button>
				)}
			</div>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				handleClose={handleSnackbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
			<FeaturesDialog
				open={featureDialogOpen}
				setOpen={setFeatureDialogOpen}
				newEquipment={newEquipment}
				setNewEquipment={setNewEquipment}
				onClose={() => setFeatureDialogOpen(false)}
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
				variant="contained"
				onClick={handleClickOpen}
				sx={{
					fontFamily: 'nunito',
					fontSize: '16px',
					textTransform: 'none',
					backgroundColor: '#2463EB',
					color: 'white',
				}}
			>
				Dodaj opremu
			</Button>
			<SimpleDialog
				open={open}
				onClose={handleClose}
			/>
		</>
	);
}
