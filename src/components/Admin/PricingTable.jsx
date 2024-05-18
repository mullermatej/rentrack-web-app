import { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PriceListDialog from './PriceListDialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AuthSnackbar from '../Snackbars/AuthSnackbar';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function createData(equipmentName, equipmentPricing) {
	return { equipmentName, equipmentPricing };
}

export default function PricingTable({ equipment }) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');
	const [snackbarLink, setSnackbarLink] = useState('');
	const rows = [];

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const createSnackbarLink = (equipmentName) => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		return (
			<a
				href={`/equipment/${adminId}/${equipmentName}`}
				className="underline"
			>
				Vidi opremu
			</a>
		);
	};

	const handleDeleteEquipment = async (equipmentName) => {
		let deleteable = true;
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		const response = await axios.get(`${BASE_URL}/equipment/${adminId}/${equipmentName}`);
		const addedEquipment = response.data[0].addedEquipment;
		if (addedEquipment.length > 0) {
			for (let i = 0; i < addedEquipment.length; i++) {
				if (addedEquipment[i].availability === 'unavailable') {
					console.log('Equipment is in use and cannot be deleted');
					deleteable = false;
					setSnackbarMessage('Greška! Oprema je trenutno u najmu.');
					setSnackbarLink(createSnackbarLink(equipmentName));
					setSnackbarOpen(true);
					return;
				}
			}
		}
		if (deleteable) {
			let response = await axios.delete(`${BASE_URL}/equipment/${adminId}/${equipmentName}`);
			if (response.status === 200) {
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Oprema uspješno obrisana');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.reload();
				}, 1300);
			} else {
				setBackgroundColor('fireBrick');
				setSnackbarMessage('Greška! Pokušaj ponovno.');
				setSnackbarOpen(true);
			}
		}
	};

	equipment.forEach((object) => {
		rows.push(createData(object.name, 'Uredi'));
	});

	return (
		<>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 250 }}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontFamily: 'nunito', fontSize: '16px' }}>Naziv opreme</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.equipmentName}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									className="capitalize"
									sx={{ fontFamily: 'nunito' }}
								>
									<HighlightOffIcon
										className="cursor-pointer"
										fontSize="small"
										onClick={() => handleDeleteEquipment(row.equipmentName)}
									/>{' '}
									{row.equipmentName}
								</TableCell>
								<TableCell align="right">
									<PriceListDialog
										equipment={equipment}
										singleEquipmentName={row.equipmentName}
									></PriceListDialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				handleClose={handleClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
				link={snackbarLink}
			/>
		</>
	);
}
