import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import HandlePayment from './Dialogs/HandlePayment';
import CeaseConfirm from './Dialogs/CeaseConfirm';
import AuthSnackbar from '../Snackbars/AuthSnackbar';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function createData(id, availability, endTime, profitDay, profitMonth, history) {
	return {
		id,
		availability,
		endTime,
		profitDay,
		profitMonth,
		history,
	};
}

function Row(props) {
	const { row, equipment } = props;
	const [open, setOpen] = useState(false);
	const [openPayment, setOpenPayment] = useState(false);
	const [openCeaseConfirm, setOpenCeaseConfirm] = useState(false);
	const [equipmentId, setEquipmentId] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');

	const handlePayment = () => {
		if (row.availability === 'available') {
			setOpenPayment(true);
			setEquipmentId(row.id);
		} else {
			setEquipmentId(row.id);
			setOpenCeaseConfirm(true);
		}
	};

	const handleScanbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const deleteAddedEquipment = async (name, id) => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		// Check if the equipment is available
		if (row.availability === 'available') {
			try {
				const response = await axios.delete(`${BASE_URL}/equipment/${adminId}/${name}/${id}`);
				if (response.status === 200) {
					console.log('Status 200 deleted equipment');
					setBackgroundColor('forestGreen');
					setSnackbarMessage('Oprema uspješno izbrisana.');
					setSnackbarOpen(true);
					setTimeout(() => {
						window.location.reload();
					}, 1200);
				}
			} catch (error) {
				setBackgroundColor('fireBrick');
				setSnackbarMessage('Greška! Pokušaj ponovno.');
				setSnackbarOpen(true);
				console.error(error);
			}
		} else {
			setBackgroundColor('fireBrick');
			setSnackbarMessage('Greška! Oprema je još u najmu.');
			setSnackbarOpen(true);
		}
	};

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell
					component="th"
					scope="row"
					sx={{ fontFamily: 'nunito' }}
				>
					{row.id}
				</TableCell>
				<TableCell align="right">
					<Button
						variant={row.availability === 'available' ? 'outlined' : 'default'}
						size="small"
						onClick={handlePayment}
						style={{
							textTransform: 'none',
							fontSize: '14px',
							color: row.availability === 'available' ? '#2463EB' : '#D3302F',
							fontFamily: 'nunito',
						}}
					>
						{row.availability === 'available' ? 'Dostupno' : 'Zaustavi'}
					</Button>
				</TableCell>
				<TableCell
					align="right"
					sx={{ fontFamily: 'nunito' }}
				>
					{row.endTime}
				</TableCell>
				<TableCell
					align="right"
					sx={{ fontFamily: 'nunito' }}
				>
					{row.profitDay}€
				</TableCell>
				<TableCell
					align="right"
					sx={{ fontFamily: 'nunito' }}
				>
					{row.profitMonth}€
				</TableCell>
				<TableCell align="right">
					{' '}
					<Button
						onClick={() => deleteAddedEquipment(equipment.name, row.id)}
						style={{ textTransform: 'none', fontSize: '14px', color: '#2463EB', fontFamily: 'nunito' }}
					>
						Ukloni
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse
						in={open}
						timeout="auto"
						unmountOnExit
					>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
								sx={{ fontFamily: 'nunito' }}
							>
								Povijest
							</Typography>
							<Table
								size="small"
								aria-label="purchases"
							>
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontFamily: 'nunito' }}>Datum</TableCell>
										<TableCell sx={{ fontFamily: 'nunito' }}>Radnik</TableCell>
										<TableCell sx={{ fontFamily: 'nunito' }}>Sati izdano</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell
												component="th"
												scope="row"
												sx={{ fontFamily: 'nunito' }}
											>
												{historyRow.date}
											</TableCell>
											<TableCell sx={{ fontFamily: 'nunito' }}>{historyRow.worker}</TableCell>
											<TableCell sx={{ fontFamily: 'nunito' }}>{historyRow.hours}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<HandlePayment
				openPayment={openPayment}
				setOpenPayment={setOpenPayment}
				equipment={equipment}
				equipmentId={equipmentId}
			/>
			<CeaseConfirm
				openCeaseConfirm={openCeaseConfirm}
				setOpenCeaseConfirm={setOpenCeaseConfirm}
				equipment={equipment}
				equipmentId={equipmentId}
			/>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				handleClose={handleScanbarClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
			/>
		</>
	);
}

const rows = [];

export default function InfoTable({ equipment }) {
	const [addedEquipment, setAddedEquipment] = useState([]);

	const getTodaysProfit = (history) => {
		let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		month = '0' + month;
		let date = today.getDate();
		let formattedDate;
		if (date < 10) {
			formattedDate = '0' + date + '/' + month + '/' + year;
		} else {
			formattedDate = date + '/' + month + '/' + year;
		}

		let profit = 0;

		for (const historyObject of history) {
			const historyDate = historyObject.date.split(',')[0];
			if (historyDate === formattedDate) {
				profit += parseInt(historyObject.price);
			}
		}

		return profit;
	};

	const getMonthlyProfit = (history) => {
		let today = new Date();
		let month = today.getMonth() + 1;
		month = '0' + month;

		let profit = 0;

		for (const historyObject of history) {
			const historyMonth = historyObject.date.split('/')[1];
			if (historyMonth === month) {
				profit += parseInt(historyObject.price);
			}
		}

		return profit;
	};

	useEffect(() => {
		setAddedEquipment(equipment.addedEquipment);

		if (addedEquipment && addedEquipment.length > 0) {
			Object.keys(addedEquipment).forEach((key) => {
				const newRow = createData(
					addedEquipment[key].id,
					addedEquipment[key].availability,
					addedEquipment[key].endTime,
					getTodaysProfit(addedEquipment[key].history),
					getMonthlyProfit(addedEquipment[key].history),
					addedEquipment[key].history
				);

				if (!rows.find((row) => row.id === newRow.id)) {
					rows.push(newRow);
				}
			});
		}
	}, [equipment, addedEquipment]);

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell sx={{ fontFamily: 'nunito' }}>Identifikacijski broj</TableCell>
						<TableCell
							align="right"
							sx={{ fontFamily: 'nunito' }}
						>
							Stanje
						</TableCell>
						<TableCell
							align="right"
							sx={{ fontFamily: 'nunito' }}
						>
							Ističe
						</TableCell>
						<TableCell
							align="right"
							sx={{ fontFamily: 'nunito' }}
						>
							Današnji prihod
						</TableCell>
						<TableCell
							align="right"
							sx={{ fontFamily: 'nunito' }}
						>
							Mjesečni prihod
						</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row
							key={row.id}
							row={row}
							equipment={equipment}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
