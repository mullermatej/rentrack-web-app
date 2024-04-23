import { useState, useEffect } from 'react';
import axios from 'axios';
import EquipmentChip from '../components/Equipment/EquipmentChip';
import EquipmentDialog from '../components/Equipment/EquipmentDialog';

export default function Equipment() {
	const [equipment, setEquipment] = useState([]);

	useEffect(() => {
		const getEquipment = async () => {
			try {
				const adminId = JSON.parse(localStorage.getItem('user')).adminId;
				const response = await axios.get(`api/equipment/${adminId}`);
				setEquipment(response.data);
			} catch (error) {
				console.error('Error getting equipment: ', error);
			}
		};
		getEquipment();
	}, []);

	return (
		<>
			<div className="flex space-x-4 justify-center mt-8">
				<p className="text-4xl uppercase">Oprema</p>
				<EquipmentDialog />
			</div>
			<div className="mt-6 flex space-x-4 justify-center">
				{equipment.map((item) => (
					<EquipmentChip
						key={item._id}
						value={item.name}
					/>
				))}
			</div>
		</>
	);
}
