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

export default function DenseTable({ equipment }) {
	const prices = equipment.prices;
	const rows = [];

	Object.keys(prices).forEach((hours) => {
		rows.push(createData(hours, prices[hours]));
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
						<TableCell>Broj sati za {equipment.name} </TableCell>
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
