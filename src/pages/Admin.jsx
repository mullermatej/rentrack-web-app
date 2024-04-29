import { useState, useEffect } from 'react';
import axios from 'axios';
import WorkersTable from '../components/Admin/WorkersTable';
import PricingTable from '../components/Admin/PricingTable';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function Admin() {
	const [profiles, setProfiles] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const username = JSON.parse(localStorage.getItem('user')).username;
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
	}, [adminId]);

	return (
		<div>
			<h1>Profil vlasnika</h1>
			<p>Ulogiran kao: {username}</p>
			<p>Tvoj Admin ID: {adminId}</p>
			<p>Popis radnika</p>
			<WorkersTable profiles={profiles} />
			<p>Popis cijena</p>
			<PricingTable equipment={equipment} />
		</div>
	);
}
