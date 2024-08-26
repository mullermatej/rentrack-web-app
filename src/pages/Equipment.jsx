import { useState, useEffect } from 'react';
import axios from 'axios';
import EquipmentDialog from '../components/Equipment/EquipmentDialog';
import EquipmentCard from '../components/Equipment/EquipmentCard';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import Divider from '@mui/material/Divider';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function Equipment() {
	const [equipment, setEquipment] = useState([]);
	const [exists, setExists] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		const getEquipment = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/equipment/${businessId}`);
				setEquipment(response.data);
				if (response.data.length > 0) {
					setExists(true);
					setImageLoaded(true);
				} else {
					setExists(false);
				}
			} catch (error) {
				console.error('Error getting equipment: ', error);
			}
		};

		getEquipment();
	}, []);

	return (
		<>
			{exists === true && (
				<div className="flex justify-center mt-6">
					<div className="py-4 px-8 flex-column justify-center">
						<p className="text-5xl font-light font-nunito pb-2 uppercase ">Popis Opreme</p>
					</div>
				</div>
			)}
			{exists === true && (
				<Container>
					<Divider
						color="black"
						sx={{ marginBottom: '15px' }}
					/>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{equipment.map((item) => (
							<div
								key={item._id}
								className="flex justify-center my-4"
							>
								<EquipmentCard
									equipment={item}
									imageLoaded={imageLoaded}
								/>
							</div>
						))}
						<EquipmentDialog />
					</div>
				</Container>
			)}
			{exists === false && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '80vh',
					}}
				>
					<Container>
						<div className="flex justify-center">
							<Paper
								className="flex-column justify-center p-6 max-w-sm"
								style={{ backgroundColor: '#FFD460' }}
							>
								<WavingHandOutlinedIcon
									style={{ fontSize: '6rem', marginBottom: '15px', marginTop: '15px' }}
								/>
								<p className="font-nunito text-3xl">Započni praćenje najma</p>
								<p className="font-nunito py-3">
									Čini se malo praznim ovdje. Započni praćenje najma dodavanjem svoje prve opreme.
								</p>
								<EquipmentDialog />
							</Paper>
						</div>
					</Container>
				</div>
			)}
		</>
	);
}
