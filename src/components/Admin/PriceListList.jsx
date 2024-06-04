import { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AuthSnackbar from '../Snackbars/AuthSnackbar';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Demo = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

export default function PriceListList({ hour, price, singleEquipmentName }) {
	const businessId = JSON.parse(localStorage.getItem('user')).businessId;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleDeletePrice = async () => {
		try {
			let response = await axios.delete(`${BASE_URL}/equipment/${businessId}/${singleEquipmentName}/prices`, {
				data: {
					hours: hour,
				},
			});
			if (response.status === 200) {
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Cijena uspješno obrisana.');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.reload();
				}, 1300);
			}
		} catch (error) {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška. Pokušaj ponovno.');
			setSnackbarOpen(true);
			console.error(error);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, maxWidth: 752, marginLeft: 2, marginRight: 2 }}>
			<Grid
				item
				xs={12}
				md={6}
			>
				<Demo>
					<List dense={true}>
						<ListItem
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={handleDeletePrice}
								>
									<HighlightOffIcon />
								</IconButton>
							}
						>
							<p className="font-nunito">
								{hour === '1' ? `${hour} sat` : `${hour} sata`} - {price}€
							</p>
						</ListItem>
					</List>
				</Demo>
			</Grid>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				handleClose={handleSnackbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</Box>
	);
}
