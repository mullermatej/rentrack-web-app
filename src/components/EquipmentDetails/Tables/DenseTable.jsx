import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(hours, price) {
	return { hours, price };
}

const rows = [createData(1, 10), createData(2, 20), createData(3, 30), createData(24, 60)];

export default function DenseTable({ equipmentName }) {
	const [equipment, setEquipment] = useState([]);

	useEffect(() => {
		const getEquipment = async () => {
			try {
				const adminId = JSON.parse(localStorage.getItem('user')).adminId;
				const response = await axios.get(`api/equipment/${adminId}/${equipmentName}`);
				console.log('Response: ', response);
			} catch (error) {
				console.error(error);
			}
		};
		getEquipment();
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 250 }}
				size="small"
				aria-label="a dense table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Broj sati</TableCell>
						<TableCell align="left">Cijena</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.hours}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component="th"
								scope="row"
							>
								{row.hours}h
							</TableCell>
							<TableCell align="left">{row.price}€</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
