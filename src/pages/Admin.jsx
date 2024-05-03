import { useState, useEffect } from 'react';
import axios from 'axios';
import WorkersTable from '../components/Admin/WorkersTable';
import PricingTable from '../components/Admin/PricingTable';
import { Container, Paper } from '@mui/material';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function Admin() {
	const [profiles, setProfiles] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const email = JSON.parse(localStorage.getItem('user')).email;
	const adminId = JSON.parse(localStorage.getItem('user')).adminId;

	useEffect(() => {
		const getProfiles = async () => {
			const response = await axios.get(`${BASE_URL}/users/${adminId}/profiles`);
			setProfiles(response.data);
		};
		const getEquipment = async () => {
			const response = await axios.get(`${BASE_URL}/equipment/${adminId}`);
			setEquipment(response.data);
		};
		getProfiles();
		getEquipment();
	}, [adminId, equipment]);

	return (
		<>
			<div className="flex justify-center my-6">
				<Paper className="p-4">
					<p className="font-nunito text-3xl">Profil vlasnika</p>
					<p className="font-nunito text-lg">Ulogiran kao: {email}</p>
					<p className="font-nunito text-lg">Tvoj Admin ID: {adminId}</p>
				</Paper>
			</div>
			<Container sx={{ marginBottom: '25px' }}>
				<WorkersTable profiles={profiles} />
			</Container>
			<Container>
				<PricingTable equipment={equipment} />
			</Container>
		</>
	);
}
