import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

function createData(id, state, until, profitDay, profitMonth, history) {
	return {
		id,
		state,
		until,
		profitDay,
		profitMonth,
		history,
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);
	const [openPayment, setOpenPayment] = useState(false);

	const handlePayment = () => {
		console.log('Stisnuo si suncobran sa id-em: ', row.id);
		setOpenPayment(true);
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
					{row.state}
				</TableCell>
				<TableCell align="right">{row.until}</TableCell>
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
			/>
		</>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		id: PropTypes.number.isRequired,
		state: PropTypes.string.isRequired,
		until: PropTypes.string.isRequired,
		profitDay: PropTypes.string.isRequired,
		profitMonth: PropTypes.string.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				date: PropTypes.string.isRequired,
				worker: PropTypes.string.isRequired,
				hours: PropTypes.number.isRequired,
			})
		).isRequired,
	}).isRequired,
};

const rows = [];

export default function InfoTable({ equipment }) {
	const [addedEquipment, setAddedEquipment] = useState([]);

	useEffect(() => {
		setAddedEquipment(equipment.addedEquipment);

		if (addedEquipment && addedEquipment.length > 0) {
			Object.keys(addedEquipment).forEach((key) => {
				const newRow = createData(
					addedEquipment[key].id,
					addedEquipment[key].availability,
					addedEquipment[key].endTime,
					addedEquipment[key].profitDay,
					addedEquipment[key].profitMonth,
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
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
