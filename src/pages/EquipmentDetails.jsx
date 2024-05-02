import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InfoTable from '../components/EquipmentDetails/InfoTable';
import NewEquipment from '../components/EquipmentDetails/Dialogs/NewEquipment';
import Pricing from '../components/EquipmentDetails/Dialogs/Pricing';
import Profit from '../components/EquipmentDetails/Dialogs/Profit';
import Container from '@mui/material/Container';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const theme = createTheme({
	palette: {
		primary: {
			main: '#2463EB',
		},
	},
});

export default function EquipmentDetails() {
	const { equipmentName } = useParams();
	const [equipment, setEquipment] = useState({});
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;

		const checkAvailableEquipment = (addedEquipment) => {
			for (const object of addedEquipment) {
				if (object.availability === 'unavailable') {
					setCounter((prevCounter) => prevCounter + 1);
				}
			}
		};

		const updateEquipment = async (addedEquipment) => {
			const doc = { availability: 'available', endTime: '/' };
			for (const equipment of addedEquipment) {
				const currentDate = new Date().toLocaleString();

				if (equipment.endTime < currentDate && equipment.endTime !== '/') {
					try {
						const response = await axios.patch(
							`${baseUrl}/equipment/${adminId}/${equipmentName}/${equipment.id}`,
							doc
						);
						console.log(response);
					} catch (error) {
						console.error(error);
					}
				}
			}
		};

		const getEquipment = async () => {
			try {
				const response = await axios.get(`${baseUrl}/equipment/${adminId}/${equipmentName}`);
				const addedEquipment = response.data[0].addedEquipment;

				updateEquipment(addedEquipment);
				setEquipment(response.data[0]);
				checkAvailableEquipment(addedEquipment);
			} catch (error) {
				console.error(error);
			}
		};
		getEquipment();
	}, [equipmentName]);

	return (
		<div className="mx-auto">
			<div className="flex justify-center my-10">
				<Paper className="justify-center p-4">
					<p className="text-4xl capitalize font-nunito">{equipmentName}</p>
					<div className="my-4 space-x-4">
						<NewEquipment equipmentName={equipmentName} />
						<Pricing equipment={equipment} />
						<Profit equipment={equipment} />
						<Button
							size="small"
							variant="outlined"
							style={{
								textTransform: 'none',
								fontSize: '14px',
								backgroundColor: '#2463EB',
								color: 'white',
								fontFamily: 'nunito',
							}}
						>
							{counter / 2 === 0.5 ? 1 : counter / 2} /{' '}
							{equipment.addedEquipment !== undefined && equipment.addedEquipment.length}
						</Button>
					</div>
					<ThemeProvider theme={theme}>
						<Button
							variant="outlined"
							size="small"
							color="primary"
							style={{
								textTransform: 'none',
								fontFamily: 'nunito',
							}}
							onClick={() => (window.location.href = '/equipment')}
						>
							<ArrowBackOutlinedIcon fontSize="inherit" /> Natrag
						</Button>
					</ThemeProvider>
				</Paper>
			</div>
			<Container>
				<InfoTable equipment={equipment} />
			</Container>
		</div>
	);
}
