import { useState, useEffect } from 'react';
import axios from 'axios';
import EquipmentDialog from '../components/Equipment/EquipmentDialog';
import EquipmentCard from '../components/Equipment/EquipmentCard';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function Equipment() {
	const [equipment, setEquipment] = useState([]);
	const adminId = JSON.parse(localStorage.getItem('user')).adminId;

	useEffect(() => {
		const getEquipment = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/equipment/${adminId}`);
				setEquipment(response.data);
			} catch (error) {
				console.error('Error getting equipment: ', error);
			}
		};

		getEquipment();
	}, [adminId]);

	return (
		<>
			<div className="flex justify-center my-8">
				<Paper className="py-4 px-8 flex-column justify-center">
					<p className="text-4xl mb-4 font-nunito">Popis Opreme</p>
					<EquipmentDialog />
				</Paper>
			</div>
			<Container>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{equipment.map((item) => (
						<div
							key={item._id}
							className="flex justify-center my-2"
						>
							<EquipmentCard equipment={item} />
						</div>
					))}
				</div>
				{equipment.length < 1 && (
					<div className="flex justify-center">
						<Paper className="flex-column justify-center p-6">
							<p className="font-nunito">Nema opreme za prikazati</p>
						</Paper>
					</div>
				)}
			</Container>
		</>
	);
}
