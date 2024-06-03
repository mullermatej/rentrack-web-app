import { useState, useEffect } from 'react';
import axios from 'axios';
import WorkersTable from '../components/Admin/WorkersTable';
import PricingTable from '../components/Admin/PricingTable';
import { Container, Paper } from '@mui/material';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function Admin() {
	const [profiles, setProfiles] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const businessName = JSON.parse(localStorage.getItem('user')).name;
	const businessId = JSON.parse(localStorage.getItem('user')).businessId;

	useEffect(() => {
		const getProfiles = async () => {
			const response = await axios.get(`${BASE_URL}/users/${businessId}/profiles`);
			setProfiles(response.data);
		};
		const getEquipment = async () => {
			const response = await axios.get(`${BASE_URL}/equipment/${businessId}`);
			setEquipment(response.data);
		};
		getProfiles();
		getEquipment();
	}, [businessId]);

	return (
		<>
			<div className="flex justify-center my-6">
				<Paper className="p-4">
					<p className="font-nunito text-3xl">Profil vlasnika</p>
					<p className="font-nunito text-lg">Ulogiran kao: {businessName}</p>
					<p className="font-nunito text-lg">Tvoj business ID: {businessId}</p>
				</Paper>
			</div>
			<Container
				sx={{ marginBottom: '25px' }}
				maxWidth="sm"
			>
				<WorkersTable profiles={profiles} />
			</Container>
			<Container maxWidth="sm">
				<PricingTable equipment={equipment} />
			</Container>
		</>
	);
}
