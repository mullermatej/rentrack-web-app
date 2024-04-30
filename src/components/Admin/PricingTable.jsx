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

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function createData(equipmentName, equipmentPricing) {
	return { equipmentName, equipmentPricing };
}

export default function PricingTable({ equipment }) {
	const rows = [];

	const handleDeleteEquipment = async (equipmentName) => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		try {
			const response = await axios.delete(`${BASE_URL}/equipment/${adminId}/${equipmentName}`);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	equipment.forEach((object) => {
		rows.push(createData(object.name, 'Uredi'));
	});

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 250 }}
				size="small"
				aria-label="a dense table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Ime opreme</TableCell>
						<TableCell align="left">Cjenik</TableCell>
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
							>
								<HighlightOffIcon
									className="cursor-pointer"
									fontSize="small"
									onClick={() => handleDeleteEquipment(row.equipmentName)}
								/>{' '}
								{row.equipmentName}
							</TableCell>
							<TableCell align="left">
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
	);
}
