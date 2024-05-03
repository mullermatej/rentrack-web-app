import { useState } from 'react';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthSnackbar from '../../Snackbars/AuthSnackbar';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function PriceOptions({ equipment, equipmentId }) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');
	const adminId = JSON.parse(localStorage.getItem('user')).adminId;
	const profileId = JSON.parse(localStorage.getItem('profile')).profileId;
	const equipmentName = equipment.name;
	const worker =
		JSON.parse(localStorage.getItem('profile')).name + ' ' + JSON.parse(localStorage.getItem('profile')).surname;
	const prices = equipment.prices;
	let choice = {};

	const handleChoice = (event) => {
		let date = new Date();
		date.setHours(date.getHours() + parseInt(event.target.value.split(',')[0]));

		choice = {
			equipmentId: equipmentId,
			availability: 'unavailable',
			endTime: date.toLocaleString(),
			historyDate: new Date().toLocaleString(),
			historyWorker: worker,
			hours: event.target.value.split(',')[0],
			price: event.target.value.split(',')[1],
		};
	};

	const handleConfirm = async () => {
		try {
			const response = await axios.patch(`${BASE_URL}/equipment/${adminId}/${equipmentName}`, choice);
			console.log(response);
			if (response.status === 200) {
				// Snackbar here
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Oprema uspješno iznajmljena.');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.reload();
				}, 1500);
				try {
					const income = parseInt(choice.price);
					const response = await axios.patch(`${BASE_URL}/users/${adminId}/profiles/${profileId}`, {
						income,
					});
					console.log(response);
					if (response.status === 200) {
						const equipment = response.data;
						localStorage.setItem('equipment', JSON.stringify(equipment));
					}
				} catch (error) {
					console.error(error);
				}
			}
		} catch (error) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Pokušaj ponovno.');
			setSnackbarOpen(true);
			console.error(error);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};
	return (
		<FormControl>
			<p className="font-nunito text-lg mb-2">Odaberi vrijeme najma</p>
			<RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				defaultValue="first"
				name="radio-buttons-group"
				onChange={handleChoice}
			>
				{Object.keys(prices).map((hours) => (
					<FormControlLabel
						key={hours}
						value={`${hours},${prices[hours]}`}
						control={<Radio />}
						label={
							<Typography
								variant="body1"
								style={{ fontFamily: 'nunito' }}
							>
								{`${hours} sata = ${prices[hours]}€`}
							</Typography>
						}
					/>
				))}
			</RadioGroup>
			<Button
				variant="contained"
				size="small"
				color="primary"
				onClick={handleConfirm}
				style={{
					backgroundColor: '#2463EB',
					color: 'white',
					fontFamily: 'nunito',
					textTransform: 'none',
					fontSize: '14px',
					marginTop: '10px',
				}}
			>
				Potvrdi
			</Button>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				handleClose={handleSnackbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</FormControl>
	);
}
