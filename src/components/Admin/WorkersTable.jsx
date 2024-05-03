import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(workerName, workerSurname, workerIncome) {
	return { workerName, workerSurname, workerIncome };
}

export default function WorkersTable({ profiles }) {
	const rows = [];

	profiles.forEach((profile) => {
		rows.push(createData(profile.name, profile.surname, profile.income));
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
						<TableCell sx={{ fontFamily: 'nunito', fontSize: '16px' }}>Ime radnika</TableCell>
						<TableCell
							align="left"
							sx={{ fontFamily: 'nunito', fontSize: '16px' }}
						>
							Prezime radnika
						</TableCell>
						<TableCell
							align="right"
							sx={{ fontFamily: 'nunito', fontSize: '16px' }}
						>
							Ukupni prihod
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.workerName}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component="th"
								scope="row"
								sx={{ fontFamily: 'nunito' }}
							>
								{row.workerName}
							</TableCell>
							<TableCell
								align="left"
								sx={{ fontFamily: 'nunito' }}
							>
								{row.workerSurname}
							</TableCell>
							<TableCell
								align="right"
								sx={{ fontFamily: 'nunito' }}
							>
								{row.workerIncome}€
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
