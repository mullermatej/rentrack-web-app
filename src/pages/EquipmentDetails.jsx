import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import InfoTable from '../components/EquipmentDetails/InfoTable';
import NewEquipment from '../components/EquipmentDetails/Dialogs/NewEquipment';
import Pricing from '../components/EquipmentDetails/Dialogs/Pricing';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export default function EquipmentDetails() {
	const { equipmentName } = useParams();
	const [equipment, setEquipment] = useState({});

	useEffect(() => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;

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
			} catch (error) {
				console.error(error);
			}
		};
		getEquipment();
	}, [equipmentName]);

	return (
		<div className="mx-auto">
			<div className="justify-center mt-8">
				<p className="text-4xl uppercase">{equipmentName}</p>
				<div className="my-4 space-x-4">
					<NewEquipment equipmentName={equipmentName} />
					<Pricing equipment={equipment} />
					<Button
						size="small"
						variant="contained"
					>
						Zarada
					</Button>
					<Button
						size="small"
						variant="outlined"
					>
						12 / 46
					</Button>
				</div>
			</div>
			<InfoTable equipment={equipment} />
		</div>
	);
}
