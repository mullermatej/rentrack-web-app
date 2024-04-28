import { useState, useEffect } from 'react';
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

import HandlePayment from './Dialogs/HandlePayment';

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
	const [equipmentId, setEquipmentId] = useState('');

	const handlePayment = () => {
		if (row.availability === 'available') {
			setOpenPayment(true);
			setEquipmentId(row.id);
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
				>
					{row.id}
				</TableCell>
				<TableCell
					align="right"
					onClick={handlePayment}
				>
					{row.availability}
				</TableCell>
				<TableCell align="right">{row.endTime}</TableCell>
				<TableCell align="right">{row.profitDay}€</TableCell>
				<TableCell align="right">{row.profitMonth}€</TableCell>
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
							>
								Povijest
							</Typography>
							<Table
								size="small"
								aria-label="purchases"
							>
								<TableHead>
									<TableRow>
										<TableCell>Datum</TableCell>
										<TableCell>Radnik</TableCell>
										<TableCell>Sati izdano</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell
												component="th"
												scope="row"
											>
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.worker}</TableCell>
											<TableCell>{historyRow.hours}</TableCell>
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
		let formattedDate = date + '/' + month + '/' + year;

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
					// addedEquipment[key].profitDay,
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
						<TableCell>key</TableCell>
						<TableCell align="right">Izdano</TableCell>
						<TableCell align="right">Istice</TableCell>
						<TableCell align="right">Danasnji prihod</TableCell>
						<TableCell align="right">Mjesecni prihod</TableCell>
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
