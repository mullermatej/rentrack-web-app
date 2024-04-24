import { useEffect } from 'react';
import axios from 'axios';

export default function Test() {
	useEffect(() => {
		const getEquipment = async () => {
			try {
				const adminId = JSON.parse(localStorage.getItem('user')).adminId;
				const response = await axios.get(`api/equipment/${adminId}/lezaljke`);
				console.log('Response: ', response);
				console.log('Pozivam ovaj API: ', `api/equipment/${adminId}/lezaljke`);
			} catch (error) {
				console.error(error);
			}
		};
		getEquipment();
	}, []);
	return (
		<div>
			<h1 className="text-4xl">Test</h1>
		</div>
	);
}
