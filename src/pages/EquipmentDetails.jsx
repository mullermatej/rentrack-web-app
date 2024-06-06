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
import RefreshIcon from '@mui/icons-material/Refresh';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';

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
	const [features, setFeatures] = useState({});
	const [counter, setCounter] = useState(0);
	const [exists, setExists] = useState(null);

	useEffect(() => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;

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
							`${baseUrl}/equipment/${businessId}/${equipmentName}/${equipment.id}`,
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
				const response = await axios.get(`${baseUrl}/equipment/${businessId}/${equipmentName}`);
				const addedEquipment = response.data[0].addedEquipment;

				updateEquipment(addedEquipment);
				setEquipment(response.data[0]);
				checkAvailableEquipment(addedEquipment);
				if (response.data[0].addedEquipment.length > 0) setExists(true);
				else setExists(false);
			} catch (error) {
				console.error(error);
			}
		};

		const getFeatures = async () => {
			try {
				const response = await axios.get(`${baseUrl}/equipment/${businessId}/${equipmentName}/features`);
				setFeatures(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		getFeatures();
		getEquipment();
	}, [equipmentName]);

	return (
		<div className="mx-auto">
			{exists === true && (
				<div className="flex justify-center my-6">
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
						<div className="flex justify-center gap-4">
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
								<Button
									variant="outlined"
									size="small"
									color="primary"
									style={{
										textTransform: 'none',
										fontFamily: 'nunito',
									}}
									onClick={() => window.location.reload()}
								>
									<RefreshIcon fontSize="inherit" />
									Osvježi
								</Button>
							</ThemeProvider>
						</div>
					</Paper>
				</div>
			)}
			{exists === true && (
				<Container maxWidth="lg">
					<Paper>
						{(features.color ||
							features.dimensions ||
							features.material ||
							features.horsepower ||
							features.license ||
							features.wheels ||
							features.weight ||
							features.maximumPeople) && (
							<div className="md:flex lg:flex xl:flex gap-4 justify-center p-4 mb-6">
								{features.color && (
									<p className="text-lg font-nunito">
										Boja: <span className="text-main-blue">{features.color}</span>
									</p>
								)}
								{features.dimensions && (
									<p className="text-lg font-nunito">
										Dimenzije: <span className="text-main-blue">{features.dimensions}</span>
									</p>
								)}
								{features.material && (
									<p className="text-lg font-nunito">
										Materijal: <span className="text-main-blue">{features.material}</span>
									</p>
								)}
								{features.horsepower && (
									<p className="text-lg font-nunito">
										Konjska snaga: <span className="text-main-blue">{features.horsepower}</span>
									</p>
								)}
								{features.license && (
									<p className="text-lg font-nunito">
										Dozvola: <span className="text-main-blue">{features.license}</span>
									</p>
								)}
								{features.wheels && (
									<p className="text-lg font-nunito">
										Kotačići: <span className="text-main-blue">{features.wheels}</span>
									</p>
								)}
								{features.weight && (
									<p className="text-lg font-nunito">
										Težina: <span className="text-main-blue">{features.weight}</span>
									</p>
								)}
								{features.maximumPeople && (
									<p className="text-lg font-nunito">
										Maks. osoba: <span className="text-main-blue">{features.maximumPeople}</span>
									</p>
								)}
							</div>
						)}
					</Paper>
				</Container>
			)}
			<Container>{exists === true && <InfoTable equipment={equipment} />}</Container>
			{exists === false && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<Container>
						<div className="flex justify-center">
							<Paper className="flex-column justify-center p-6 max-w-sm">
								<CelebrationOutlinedIcon style={{ fontSize: '6rem', marginBottom: '15px' }} />
								<p className="font-nunito text-3xl">Kreiraj pojedinu opremu</p>
								<p className="font-nunito mb-4">
									Super! Uspješno si kreirao opremu. Sada možeš dodati pojedini komad te opreme.
								</p>
								<NewEquipment equipmentName={equipmentName} />
							</Paper>
						</div>
					</Container>
				</div>
			)}
		</div>
	);
}
